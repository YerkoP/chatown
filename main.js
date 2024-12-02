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
  const videoButton = document.getElementById('video-button')
  const videoOnIcon = document.getElementById('icon-video-on')
  const videoOffIcon = document.getElementById('icon-video-off')
  const micButton = document.getElementById('mic-button')
  const micOnIcon = document.getElementById('icon-mic-on')
  const micOffIcon = document.getElementById('icon-mic-off')
  const callGroup = document.getElementById('call-group')
  const chatOutput = document.getElementById('chat-output')
  const chatButton = document.getElementById('chat-btn')
  const chatButtonSm = document.getElementById('chat-btn')

  keyButton.addEventListener('click', View.showKey())
  keyButtonSm.addEventListener('click', View.showKey())

  addButtonSm.addEventListener('click', View.showAddPeerModal(addPeerDialog))
  addButton.addEventListener('click', View.showAddPeerModal(addPeerDialog))

  callButtonSm.addEventListener('click', View.startCall(chatOutput, callGroup))
  callButton.addEventListener('click', View.startCall(chatOutput, callGroup))

  addPeerDialogCloseButton.addEventListener('click', View.closeAddPeerModal(addPeerDialog))
  incomingCallDialogCloseButton.addEventListener('click', View.closeAddPeerModal(addPeerDialog))

  addPeerButton.addEventListener('click', View.addPeer(newPeerKey, addPeerDialog))

  sendMessageButton.addEventListener('click', View.sendMessage(messageInput))

  messageInput.addEventListener('keydown', View.sendMessageOnEnter(messageInput))

  endCallButton.addEventListener('click', View.endCall(video, camera))
  videoButton.addEventListener('click', View.toggleVideo(videoOnIcon, videoOffIcon))
  micButton.addEventListener('click', View.toggleMic(micOnIcon, micOffIcon))

  chatButton.addEventListener('click', View.showChat(chatOutput, callGroup))
  chatButtonSm.addEventListener('click', View.showChat(chatOutput, callGroup))

  const peer = new Peer((Math.random() + 1).toString(32).slice(2, 10))
  window.chat = new Chatroom(peer)
})

