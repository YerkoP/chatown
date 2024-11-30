import { showInfo, showMsg } from './messages'

export class Chatroom {
  members = new Map()
  calls = new Map()
  self = null
  debug = import.meta.env.DEV

  constructor(peer) {
    window.peer = peer
    this.self = peer
    peer.on('connection', conn => {
      this.log('on.connection', conn.peer)
      this.addMember(conn.peer, conn)
    })

    peer.on('call', call => {
      this.log('on.call', call.peer)
      this._handleIncomingCall(call)
    })
  }

  log() {
    if (this.debug) {
      console.log(`[${this.self.id}]`, ...arguments)
    }
  }

  addMember(id, conn = null) {
    this.log('addMember', id, conn)
    if (this.members.has(id)) {
      this.log(`member ${id} already exists, exiting`)
      return
    }
    if (this.self.id === id) {
      return
    }
    if (!conn)
      conn = this.self.connect(id)
    this.members.set(id, conn)

    showInfo(`${conn.peer} entered the chat`)
    this.broadcast(id, 'member')
    conn.on('data', this._handleMessage.bind(this))
    conn.on('close', () => showInfo(`${conn.peer} leave the chat`))
  }

  // addCall(id, stream, call = null) {
  //   this.log('addCall', id, conn)
  //   if (this.calls.has(id)) {
  //     this.log(`call ${id} already exists, exiting`)
  //     return
  //   }
  //   if (this.self.id === id) {
  //     return
  //   }
  //   if (!call)
  //     call = this.self.call(id, stream)
  //   this.calls.set(id, call)

  //   showInfo(`${call.peer} entered the call`)
  //   this.broadcast(id, 'call')
  //   call.on('stream', incomingStream => this.addCall(call.peer, incomingStream, call))
  //   call.on('close', () => showInfo(`${call.peer} leave the call`))
  // }

  broadcast(msg, type = 'message') {
    this.log('broadcast', msg, type)
    for(const conn of this.members.values()) {
      this.log('sending to', conn.peer)
      conn.send({
        id: this.self.id,
        msg,
        type
      })
    }
    if (type === 'message') {
      showMsg(msg, this.self.id)
    }
  }

  groupCall(stream) {
    this.log('starting group call')
    for(const conn of this.members.values()) {
      const call = this.self.call(conn.peer, stream)
      call.on('stream', callStream => this._addToCallGroup(call.peer, callStream))
    }
    showInfo('Group call started')
  }

  _handleMessage({ msg, id, type }) {
    this.log('_handleMessage', msg, id, type)
    if (type === 'message') {
      showMsg(msg, id)
    } else if (type === 'member') {
      this.addMember(msg)
      this.log('connected to', msg)
    }
  }

  _handleIncomingCall(call) {
    const dialog = document.getElementById('incoming-call-dialog')
    const acceptCallButton = document.getElementById('accept-call-btn')
    const declineCallButton = document.getElementById('decline-call-btn')
    dialog.showModal()

    acceptCallButton.addEventListener('click', async e => {
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
            call.close()
          })
          call.answer(stream)
          call.on('stream', callStream => this._addToCallGroup(call.peer, callStream))
          dialog.close()
        }
      } catch(err) {
        console.error(`An error occurred: ${err}`)
        dialog.close()
      }
    })

    declineCallButton.addEventListener('click', e => {
      e.preventDefault()
      call.close()
      dialog.close()
    })
  }

  _addToCallGroup(call, callStream) {
    this.log('_addToCallGroup', call.peer)
    if (this.calls.has(call.peer)) {
      this.log(`member ${call.peer} already exists, exiting`)
      return
    }
    if (this.self.id === call.peer) {
      return
    }
    this.calls.set(call.peer, call)
    const callGroup = document.getElementById('call-group')
    const video = document.createElement('video')
    video.srcObject = callStream
    video.onloadedmetadata = () => {
      video.play()
    }
    video.defaultMuted = true
    video.muted = true
    const memeberCount = callGroup.children.length
    if (memeberCount === 0) {
      callGroup.classList.add('z-20')
      video.classList.add('w-full', 'h-full', 'col-start-1', 'col-end-7', 'row-start-2', 'row-end-6')
    }
    callGroup.appendChild(video)
  }
}