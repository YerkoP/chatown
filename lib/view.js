import { showInfo } from "./messages"

export class View {
  static showKey(preventDefault = true) {
    return e => {
      if (preventDefault)
        e.preventDefault()
      if (window.peer && window.peer.id)
        showInfo({ text: 'Your personal key is {cta}', cta: window.peer.id })
    }
  }

  static showAddPeerModal(addPeerDialog, preventDefault = true) {
    return e => {
      if (preventDefault)
        e.preventDefault()
      addPeerDialog.showModal()
    }
  }

  static closeAddPeerModal(addPeerDialog, preventDefault = true) {
    return e => {
      if (preventDefault)
        e.preventDefault()
      addPeerDialog.close()
    }
  }

  static addPeer(newPeerKey, addPeerDialog, preventDefault = true) {
    return e => {
      if (preventDefault)
        e.preventDefault()
      if (window.peer) {
        const peerId = newPeerKey.value
        window.chat.addMember(peerId)
        newPeerKey.value = ''
        addPeerDialog.close()
      }
    }
  }

  static sendMessage(messageInput, preventDefault = true) {
    return e => {
      if (preventDefault)
        e.preventDefault()
      const msg = messageInput.value
      window.chat.broadcast(msg)
      messageInput.value = ''
    }
  }

  static sendMessageOnEnter(messageInput) {
    return e => {
      if (e.altKey || e.ctrlKey) {
        return;
      }
      if (e.key === 'Enter') {
        const msg = messageInput.value
        window.chat.broadcast(msg)
        messageInput.value = ''
      }
    }
  }

  static startCall(preventDefault = true) {
    return async e => {
      if (preventDefault)
        e.preventDefault()
      await View.handleCall()
    }
  }

  static acceptCall(call, dialog, preventDefault = true) {
    return async e => {
      if (preventDefault)
        e.preventDefault()
      await View.handleCall(call, dialog)
    }
  }

  static async handleCall(call = null, dialog = null) {
    try {
      window.stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          facingMode: 'user'
        }
      })
      if (window.stream) {
        const camera = document.getElementById('camera')
        const video = document.querySelector('#camera video')
        camera.classList.remove('hidden')
        video.srcObject = window.stream
        video.onloadedmetadata = () => {
          video.play()
        }
        if (call && dialog) {
          call.answer(window.stream)
          call.on('stream', callStream => window.chat._addToCallGroup(call, callStream))
          dialog.close()
        } else {
          window.chat.groupCall(window.stream)
        }
      }
    } catch (err) {
      console.error(`An error occurred: ${err}`)
    }
  }

  static endCall(video, camera, preventDefault = true) {
    return e => {
      if (preventDefault)
        e.preventDefault()
      window.stream.getTracks().forEach(track => {
        track.stop()
      })
      video.srcObject = null
      camera.classList.add('hidden')
      window.chat.endCall()
    }
  }
}