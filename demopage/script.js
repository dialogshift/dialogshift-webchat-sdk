const clientId = 'pro10ca'

let client = Dialogshift.instance({
  id: clientId,
  isChatboxVisible: false,
  initialElement: {
    successor: 'fix-welcome-1',
  },
  teaserText: '👋🏻 Hi, are you interested in a chat solution for your company?',
  locale: 'en',
  theme: 'round',
})
console.log(client.getInitialElement())


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

client.on('destroy', e => logEvent(e))
client.on('ready', e => logEvent(e))
client.on('init', e => logEvent(e))
client.on('error', e => logEvent(e))
client.on('message.sent', e => logEvent(e))
client.on('message.receive', e => logEvent(e))
client.on('history.receive', e => logEvent(e))
client.on('command.receive', e => logEvent(e))

document.querySelector('#init').addEventListener('click', () => {
  client = Dialogshift.instance({
    id: clientId,
  })
})

document.querySelector('#destroy').addEventListener('click', () => {
  client.destroy()
})

document
  .querySelector('#setposition-left')
  .addEventListener('click', () => {
    client.setPosition('left')
  })

document
  .querySelector('#setposition-right')
  .addEventListener('click', () => {
    client.setPosition('right')
  })

document.querySelector('#hide-chatbtn').addEventListener('click', () => {
  client.hideButton()
})

document.querySelector('#show-chatbtn').addEventListener('click', () => {
  client.showButton()
})

document
  .querySelector('#settext-chatbtn')
  .addEventListener('click', () => {
    client.setButtonText('Help')
  })

document
  .querySelector('#removetext-chatbtn')
  .addEventListener('click', () => {
    client.setButtonText('')
  })

document.querySelector('#settheme-round').addEventListener('click', () => {
  client.setTheme('round')
})

document.querySelector('#settheme-tile').addEventListener('click', () => {
  client.setTheme('tile')
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

document.querySelector('#hide-action-buttons').addEventListener('click', () => {
  client.hideActionButtons()
})

document.querySelector('#show-action-buttons').addEventListener('click', () => {
  client.showActionButtons()
})

document.querySelector('#set-action-buttons-a').addEventListener('click', () => {
  client.setActionButtons([{
    'type': 'quickreply',
    'successor': 'welcome-back',
    'de': {
      'title': 'Welcome back A De'
    },
    'en': {
      'title': 'Welcome back A En'
    }
  }])
})

document.querySelector('#set-action-buttons-b').addEventListener('click', () => {
  client.setActionButtons([{
    'type': 'quickreply',
    'successor': 'welcome-back',
    'de': {
      'title': 'Welcome back B De'
    },
    'en': {
      'title': 'Welcome back B En'
    }
  }, {
    'type': 'quickreply',
    'successor': 'welcome-back',
    'de': {
      'title': 'Welcome back C De'
    },
    'en': {
      'title': 'Welcome back C En'
    }
  }])
})

document.querySelector('#set-action-buttons-c').addEventListener('click', () => {
  client.setActionButtons([{
    'type': 'quickreply',
    'successor': 'welcome-back',
    'de': {
      'title': 'Welcome back B De'
    },
    'en': {
      'title': 'Welcome back B En'
    }
  }, {
    'type': 'quickreply',
    'successor': 'welcome-back',
    'de': {
      'title': 'Welcome back C De'
    },
    'en': {
      'title': 'Welcome back C En'
    }
  }, {
    'type': 'quickreply',
    'successor': 'welcome-back',
    'de': {
      'title': 'Welcome back D De'
    },
    'en': {
      'title': 'Welcome back D En'
    }
  }])
})

document
  .querySelector('#settext-teaser')
  .addEventListener('click', () => {
    client.setTeaserText('Can I help you?')
  })

document
  .querySelector('#changetext-teaser')
  .addEventListener('click', () => {
    client.setTeaserText('Hi, can I help you?')
  })

document.querySelector('#set-unread-1').addEventListener('click', () => {
  client.setUnreadCounter(1)
})

document.querySelector('#set-unread-10').addEventListener('click', () => {
  client.setUnreadCounter(10)
})

document.querySelector('#set-unread-0').addEventListener('click', () => {
  client.setUnreadCounter(0)
})

document
  .querySelector('#increase-unread-1')
  .addEventListener('click', () => {
    client.increaseUnreadCounter(1)
  })

document
  .querySelector('#increase-unread-2')
  .addEventListener('click', () => {
    client.increaseUnreadCounter(2)
  })

document
  .querySelector('#trigger-1')
  .addEventListener('click', () => {
    client.triggerElement({
      successor: 'demo',
    })
  })

document
  .querySelector('#trigger-2')
  .addEventListener('click', () => {
    client.triggerElement({
      successor: 'welcome-back',
      suppressInitialElement: false,
    })
  })

document
  .querySelector('#trigger-3')
  .addEventListener('click', () => {
    client.triggerElement({
      successor: 'welcome-back',
      showChatbox: false,
    })
  })
