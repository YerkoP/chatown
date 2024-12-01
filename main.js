import { Chatroom } from './lib/chatroom'
import { View } from './lib/view'
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
  const addPeerDialogCloseButton = document.querySelector('#add-peer-dialog button.close')
  const incomingCallDialogCloseButton = document.querySelector('#incoming-call-dialog button.close')
  const addPeerButton = document.getElementById('add-peer-btn')
  const newPeerKey = document.getElementById('new-peer-key')
  const sendMessageButton = document.getElementById('send-msg-btn')
  const messageInput = document.getElementById('msg-input')
  const camera = document.getElementById('camera')
  const video = document.querySelector('#camera video')
  const endCallButton = document.getElementById('end-call-button')

  keyButton.addEventListener('click', View.showKey())
  keyButtonSm.addEventListener('click', View.showKey())

  addButtonSm.addEventListener('click', View.showAddPeerModal(addPeerDialog))
  addButton.addEventListener('click', View.showAddPeerModal(addPeerDialog))

  callButtonSm.addEventListener('click', View.startCall())
  callButton.addEventListener('click', View.startCall())

  addPeerDialogCloseButton.addEventListener('click', View.closeAddPeerModal(addPeerDialog))
  incomingCallDialogCloseButton.addEventListener('click', View.closeAddPeerModal(addPeerDialog))

  addPeerButton.addEventListener('click', View.addPeer(newPeerKey, addPeerDialog))

  sendMessageButton.addEventListener('click', View.sendMessage(messageInput))

  messageInput.addEventListener('keydown', View.sendMessageOnEnter(messageInput))

  endCallButton.addEventListener('click', View.endCall(video, camera))

  const peer = new Peer((Math.random() + 1).toString(32).slice(2, 10))
  window.chat = new Chatroom(peer)
})

