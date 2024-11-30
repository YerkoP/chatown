import { showInfo } from './lib/messages'
import { Chatroom } from './lib/chatroom'
import { Peer } from 'peerjs'
import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const keyButton = document.getElementById('key-btn')
  const keyButtonSm = document.getElementById('key-btn-sm')
  const addButton = document.getElementById('add-btn')
  const addButtonSm = document.getElementById('add-btn-sm')
  const callButton = document.getElementById('call-btn')
  const callButtonSm = document.getElementById('call-btn-sm')
  const addPeerDialog = document.getElementById('add-peer-dialog')
  const incomingCallDialog = document.getElementById('incoming-call-dialog')
  const addPeerDialogCloseButton = document.querySelector('#add-peer-dialog button.close')
  const incomingCallDialogCloseButton = document.querySelector('#incoming-call-dialog button.close')
  const addPeerButton = document.getElementById('add-peer-btn')
  const newPeerKey = document.getElementById('new-peer-key')
  const sendMessageButton = document.getElementById('send-msg-btn')
  const messageInput = document.getElementById('msg-input')

  keyButton.addEventListener('click', e => {
    e.preventDefault()
    if (window.peer && window.peer.id)
    showInfo({ text: 'Your personal key is {cta}', cta: window.peer.id })
  })

  keyButtonSm.addEventListener('click', e => {
    e.preventDefault()
    if (window.peer && window.peer.id)
    showInfo({ text: 'Your personal key is {cta}', cta: window.peer.id })
  })

  addButtonSm.addEventListener('click', e => {
    e.preventDefault()
    addPeerDialog.showModal()
  })

  addButton.addEventListener('click', e => {
    e.preventDefault()
    addPeerDialog.showModal()
  })

  callButtonSm.addEventListener('click', async e => {
    e.preventDefault()
    let stream = null
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          facingMode: 'user'
        }
      })
      if (stream) {
        const camera = document.getElementById('camera')
        const video = document.querySelector('#camera video')
        const endCallButton = document.getElementById('end-call-button')
        camera.classList.remove('hidden')
        video.srcObject = stream
        video.onloadedmetadata = () => {
          video.play()
        }
        endCallButton.addEventListener('click', e => {
          e.preventDefault()
          stream.getTracks().forEach(track => {
            track.stop()
          })
          video.srcObject = null
          camera.classList.add('hidden')
        })
        window.chat.groupCall(stream)
      }
    } catch (err) {
      console.error(`An error occurred: ${err}`)
    }
  })

  callButton.addEventListener('click', async e => {
    e.preventDefault()
    let stream = null
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: {
          facingMode: 'user'
        }
      })
      if (stream) {
        const camera = document.getElementById('camera')
        const video = document.querySelector('#camera video')
        const endCallButton = document.getElementById('end-call-button')
        camera.classList.remove('hidden')
        video.srcObject = stream
        video.onloadedmetadata = () => {
          video.play()
        }
        endCallButton.addEventListener('click', e => {
          e.preventDefault()
          stream.getTracks().forEach(track => {
            track.stop()
          })
          video.srcObject = null
          camera.classList.add('hidden')
        })
        window.chat.groupCall(stream)
      }
    } catch (err) {
      console.error(`An error occurred: ${err}`)
    }
  })

  addPeerDialogCloseButton.addEventListener('click', e => {
    e.preventDefault()
    addPeerDialog.close()
  })

  incomingCallDialogCloseButton.addEventListener('click', e => {
    e.preventDefault()
    incomingCallDialog.close()
  })

  addPeerButton.addEventListener('click', e => {
    e.preventDefault()
    if (window.peer) {
      const peerId = newPeerKey.value
      window.chat.addMember(peerId)
      newPeerKey.value = ''
      addPeerDialog.close()
    }
  })

  sendMessageButton.addEventListener('click', e => {
    e.preventDefault()
    const msg = messageInput.value
    window.chat.broadcast(msg)
    messageInput.value = ''
  })

  messageInput.addEventListener('keydown', e => {
    if (e.altKey || e.ctrlKey) {
      return;
    }
    if (e.key === 'Enter') {
      const msg = messageInput.value
      window.chat.broadcast(msg)
      messageInput.value = ''
    }
  })

  const peer = new Peer((Math.random() + 1).toString(32).slice(2, 10))
  window.chat = new Chatroom(peer)
})

