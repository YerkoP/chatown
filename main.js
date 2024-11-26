import { showInfo } from './lib/messages'
import { Chatroom } from './lib/chatroom'
import { Peer } from 'peerjs'
import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  const keyButton = document.getElementById('key-btn')
  const keyButtonSm = document.getElementById('key-btn-sm')
  const addButton = document.getElementById('add-btn')
  const addButtonSm = document.getElementById('add-btn-sm')
  const addPeerDialog = document.getElementById('add-peer-dialog')
  const addPeerDialogCloseButton = document.querySelector('#add-peer-dialog button.close')
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

  addPeerDialogCloseButton.addEventListener('click', e => {
    e.preventDefault()
    addPeerDialog.close()
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

