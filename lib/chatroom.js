import { showInfo, showMsg } from './messages'

export class Chatroom {
  members = new Map()
  self = null
  debug = true

  constructor(peer) {
    window.peer = peer
    this.self = peer
    peer.on('connection', conn => {
      this.log('on.connection', conn.peer)
      this.addMember(conn.peer, conn)
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
    if (!conn)
      conn = this.self.connect(id)
    this.members.set(id, conn)

    showInfo(`${conn.peer} entered the chat`)
    this.broadcast(id, 'member')
    conn.on('data', this._handleMessage.bind(this))
  }

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

  _handleMessage({ msg, id, type }) {
    this.log('_handleMessage', msg, id, type)
    if (type === 'message') {
      showMsg(msg, id)
    } else if (type === 'member') {
      const conn = this.self.connect(msg)
      this.log('connected to', conn.peer)
      conn.on('data', this._handleMessage.bind(this))
    }
  }
}