import * as Dialogshift from 'dialogshift-webchat-sdk'

const client = Dialogshift.instance({
  id: '3E9',
})

const logEvent = event => {
  const item = document.createElement('div')
  item.className = 'event-item'
  item.innerHTML = `${event.type}`

  if (event.data) {
    item.innerHTML += ` - payload: ${JSON.stringify(event.data)}`
  }
  document.querySelector('#event-list').appendChild(item)
}

client.on('chatbox.show.before', e => logEvent(e))
client.on('chatbox.show', e => logEvent(e))
client.on('chatbox.hide.before', e => logEvent(e))
client.on('chatbox.hide', e => logEvent(e))

client.on('button.hide.before', e => logEvent(e))
client.on('button.hide', e => logEvent(e))
client.on('button.show.before', e => logEvent(e))
client.on('button.show', e => logEvent(e))

client.on('teaser.show.before', e => logEvent(e))
client.on('teaser.show', e => logEvent(e))
client.on('teaser.hide.before', e => logEvent(e))
client.on('teaser.hide', e => logEvent(e))

client.on('ready', e => logEvent(e))
client.on('error', e => logEvent(e))
client.on('message.sent', e => logEvent(e))
client.on('message.received', e => logEvent(e))
client.on('history.received', e => logEvent(e))

document.querySelector('#setposition-left').addEventListener('click', () => {
  client.setPosition('left')
})

document.querySelector('#setposition-right').addEventListener('click', () => {
  client.setPosition('right')
})

document.querySelector('#hide-chatbtn').addEventListener('click', () => {
  client.hideButton()
})

document.querySelector('#show-chatbtn').addEventListener('click', () => {
  client.showButton()
})

document.querySelector('#settext-chatbtn').addEventListener('click', () => {
  client.setButtonText('Help')
})

document.querySelector('#removetext-chatbtn').addEventListener('click', () => {
  client.setButtonText('')
})

document.querySelector('#hide-chatbox').addEventListener('click', () => {
  client.hideChatbox()
})

document.querySelector('#show-chatbox').addEventListener('click', () => {
  client.showChatbox()
})

document.querySelector('#hide-teaser').addEventListener('click', () => {
  client.hideTeaser()
})

document.querySelector('#show-teaser').addEventListener('click', () => {
  client.showTeaser()
})

document.querySelector('#settext-teaser').addEventListener('click', () => {
  client.setTeaserText('Can I help you?')
})

document.querySelector('#changetext-teaser').addEventListener('click', () => {
  client.setTeaserText('Hi, can I help you?')
})
