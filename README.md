<p align="center">
  <a href="" rel="noopener">
 <img src="https://www.dialogshift.com/static/v3/figma/Macbook-Mockup.png" alt="Dialogshift Webchat SDK"></a>
</p>

# Dialogshift Webchat SDK

[![npm version](https://badge.fury.io/js/dialogshift-webchat-sdk.svg)](http://badge.fury.io/js/dialogshift-webchat-sdk)

A client library for embed [Dialogshift](https://www.dialogshift.com/) webchat to webpages. Written in TypeScript and published in `UMD` and `ES2015`.

[SDK Demo](https://dialogshift-demo.glitch.me/)

## Table of Contents

- [About](#about)
- [How it works](#how-it-works)
- [Getting started](#getting-started)
- [API methods](#api-methods)
- [Events](#events)
- [Getting help](#getting-help)
- [Resources](#resources)

## About <a name = "about"></a>

Dialogshift is a Conversational AI platform that helps businesses to improve the communication with their customers, enhance the customer experience and ultimately grow revenue through customer retention and automation.

Messaging is an intuitive communication tool and has the ability to bring brands much closer to their customers, increasing the engagement through more frequent 1:1 touchpoints.

This SDK allows to embedding Dialogshift webchat to webpages, customize and control chat widgets, change conversational flow as you need, communicate with Conversational AI platform. Webchat widgets are fully responsive for desktop, tablet or mobile pages. SDK has native JavaScript and TypeScript versions.

## How it works <a name = "how-it-works"></a>

SDK and chat workflow phases.

#### Loading scripts

Starts when js and css scripts are injected to a webpage.
After scripts are loaded SDK is waiting for initialization.

#### SDK initialization

Starts when user calls `Dialogshift.instance(...options)` for the first time.

1. SDK loads [Webconfig](https://support.dialogshift.com/sdk-quickstart/) with settings, custom css, custom options.
2. Renders toggle button and other widgets on webpage.
3. Fires event `init`. User can read chat config or work with widgets.

#### Chat loading

Starts when chat window is manually or programmatically opened for the first time.

1. SDK loads chat app inside iframe.
2. Chat establishes connection with a message layer.
3. Chat loads message history and trigger an initial message if needs.
4. Fires event `ready`.

#### Chat destroying

Starts when `Dialogshift.destroy()` is called.

1. SDK unbinds all events, removes chat iframe and widgtes from a webpage.
2. Fires event `destroy`.

## Getting started <a name = "getting-started"></a>

You can install SDK using `npm` or use CDN link directly. To obtain app `id` signup and copy `id` in [Member area](https://member.dialogshift.com/). Read [Quick Start Guide](https://support.dialogshift.com/tutorial-quickstart/) for details.

Replace `%id%` in snippets below with your app `id` and initialize Dialogshift chat instance. Your app will interact with the chat client through the instance `Dialogshift.instance()`, which will available in your scope.

#### Install from npm

Install package

```bash
npm i dialogshift-webchat-sdk --save
```

Import and initialize chat instance

```javascript
import * as Dialogshift from 'dialogshift-webchat-sdk'
import 'dialogshift-webchat-sdk/bundles/dialogshift-webchat-sdk.min.css'

const chat = Dialogshift.instance({
  id: '%id%',
})
```

#### Include from CDN

Add the following code towards the end of `<head>` section of your page.

```javascript
<script
  type="text/javascript"
  src="https://cdn.dialogshift.com/sdk/latest/dialogshift-webchat-sdk.umd.js"></script>

<link
  rel="stylesheet"
  type="text/css"
  href="https://cdn.dialogshift.com/sdk/latest/dialogshift-webchat-sdk.min.css"/>
```

Add the following code towards the end of `<body>` section of your page.

```html
<script type="text/javascript">
  var chat = Dialogshift.instance({
    id: '%id%',
  })
</script>
```

## API methods <a name = "api-methods"></a>

#### instance(chatConfig config): ChatInstance

Creates new one chat instance or returns previously created instance. Returns singleton instance.

##### `chatConfig`

| Property          | Type              | Description                                                                                                        |
| ----------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| id                | string            | Chat id obtained from the [application dashboard](https://www.dialogshift.com/).                                   |
| locale?           | string            | Chat locale. Defaults to `en`.                                                                                     |
| position?         | 'left' \| 'right' | Chat position on webpage. Defaults to `right`.                                                                     |
| isChatboxVisible? | boolean           | Show chat window expanded if `true`. Defaults to `false`.                                                          |
| isButtonVisible?  | boolean           | Show toggle button if `true`. Defaults to `true`.                                                                  |
| renderButton?     | boolean           | Render toggle button if `true`. If button is not rendered show or hide it later is impossible. Defaults to `true`. |
| isTeaserVisible?  | boolean           | Show attention grabber button if `true`. Defaults to `false`.                                                      |
| buttonText?       | string            | Text for toggle button. If text is setted icon and text render at same time. Defaults to no text.                  |
| teaserText?       | string            | Text for attention grabber.                                                                                        |
| initialElement?   | string            | Trigers initial message.                                                                                           |
| unreadCounter?    | number            | Amount of unread messages.                                                                                         |

First time initialization.

```javascript
const client = Dialogshift.instance({
  id: '%id%',
  locale: 'de',
  position: 'left',
  isTeaserVisible: true,
  buttonText: 'Help',
  teaserText: '👋🏻 Hi, can I help you?',
  initialElement: 'welcome-message'
  unreadCounter: 2,
})

// Returns the same instance

console.log(client === Dialogshift.instance()) // true
```

#### destroy()

Destroys current instance.

```javascript
Dialogshift.instance().destroy()
```

#### isDestroyed(): boolean

Returns `true` if chat is destroyed.

```javascript
Dialogshift.instance().isDestroyed()
```

#### on(string eventName, function handler)

Listen on a new event by type and handler. The handler will not be listened if it is a duplicate.

```javascript
Dialogshift.instance().on('ready', () => {
  console.log('Chat is ready to send messages')
})
```

#### once(string eventName, function handler)

Listen on a once event by type and handler. The handler will not be listened if it is a duplicate.

```javascript
Dialogshift.instance().once('chatbox.show', () => {
  console.log('Chat is opened for the first time')
})
```

#### off(string eventName?, function handler?)

Listen off an event by type and handler. Or listen off events by type, when if only type argument is passed. Or listen off all events, when if no arguments are passed.

```javascript
Dialogshift.instance().off('chatbox.show')

//OR

Dialogshift.instance().off()
```

#### offAll()

Listen off all events.

```javascript
Dialogshift.instance().offAll()
```

#### showChatbox(ShowChatboxOptions options?)

Show chatbox.

`ShowChatboxOptions`

| Name                   | Type    | Description                                                     |
| ---------------------- | ------- | --------------------------------------------------------------- |
| triggerInitialElement? | boolean | Trigger initial message after the first open. Default to `true` |

```javascript
Dialogshift.instance().showChatbox()

// OR

Dialogshift.instance().showChatbox({
  triggerInitialElement: false,
})
```

#### hideChatbox()

Hide chatbox window.

```javascript
Dialogshift.instance().hideChatbox()
```

#### showButton()

Show toggle button.

```javascript
Dialogshift.instance().showButton()
```

#### hideButton()

Hide toggle button.

```javascript
Dialogshift.instance().hideButton()
```

#### setButtonText(string text)

Change toggle button text. `text` could be an empty string.

```javascript
Dialogshift.instance().setButtonText('Help')

// OR to remove button text

Dialogshift.instance().setButtonText('')
```

#### showTeaser()

Show teaser.

```javascript
Dialogshift.instance().showTeaser()
```

#### hideTeaser()

Hide teaser.

```javascript
Dialogshift.instance().hideTeaser()
```

#### setTeaserText(string text)

Change teaser text.

```javascript
Dialogshift.instance().setTeaserText('👋🏻 Hi, can I help you?')
```

#### setPosition('left' \| 'right' position)

Change chat container position regarding left or right of the window.

```javascript
Dialogshift.instance().setPosition('left')
```

#### isChatboxVisible(): boolean

Returns `true` if chatbox window is opened.

```javascript
Dialogshift.instance().isChatboxVisible()
```

#### setContext(string key, string | object value): Promise

Set context variable for visitor. [Read more](https://support.dialogshift.com/cms-context/) about context.

```javascript
Dialogshift.instance()
  .setContext('currentUser', 'John Doe')
  .then(() => {
    console.log('Context is written')
  })

// OR rewrite previous variable

Dialogshift.instance()
  .setContext('currentUser', 'Jane Doe')
  .then(() => {
    console.log('Context is overwritten')
  })

// OR write object

Dialogshift.instance()
  .setContext('currentUser', {
    firstName: 'John',
    lastName: 'Doe',
  })
  .then(() => {
    console.log('Context is written')
  })
```

#### getContext(string key): Promise

Returns context variable.

```javascript
Dialogshift.instance().setContext('visitor', {
  firstName: 'John',
  lastName: 'Doe',
})

// ...

Dialogshift.instance()
  .getContext('visitor')
  .then(visitor => {
    console.log(visitor.firstName) // John
    console.log(visitor.lastName) // Doe
  })

// OR returns null if context is not setted

Dialogshift.instance()
  .getContext('user')
  .then(user => {
    console.log(user === null) // true
  })
```

#### getVisitor(): Visitor

Returns current visitor.

`Visitor`

| Name | Type   | Description                             |
| ---- | ------ | --------------------------------------- |
| id   | string | Autogenerated unique current visitor id |

```javascript
const visitor = Dialogshift.instance().getVisitor()
console.log(visitor.id) // 558fb68e593c4b5a98eca3af69785e0a
```

#### setUnreadCounter(number amout)

Set value to unread counter widget. If `amount = 0` widget will be hidden.

```javascript
Dialogshift.instance().setUnreadCounter(2)

// OR to hide counter

Dialogshift.instance().setUnreadCounter(0)
```

#### increaseUnreadCounter()

Increase unread counter widget value.

```javascript
Dialogshift.instance().increaseUnreadCounter()
```

#### getConfig(): Config

Returns chat config created in [Member Area](https://member.dialogshift.com/#/app/configuration).

```javascript
const visitor = Dialogshift.instance().getVisitor()
console.log(visitor.id) // 958fb68a593c4b5a98eca3af6178590a
```

#### triggerElement()

Triggers [conversational element](https://support.dialogshift.com/cms-introduction/) created in [Member Area](https://member.dialogshift.com/#/app/configuration).

```javascript
Dialogshift.instance().triggerElement({
  successor: 'welcome-message',
})
```

#### setInitialElement(initialElement: string)

Set initial element.

```javascript
Dialogshift.instance().setInitialElement('welcome-1')
```

#### getInitialElement(): string

Returns current initial element.

```javascript
Dialogshift.instance().getInitialElement()
```

#### removeInitialElement()

Removes current initial element. That's mean initial element will not triggered.

```javascript
Dialogshift.instance().removeInitialElement()
```

#### isReady(): boolean

Returns `true` if chat is fully loaded and ready to communicate.

```javascript
Dialogshift.instance().isReady()
```

## Events <a name = "events"></a>

You can subscribe to events to receive callbacks when events happen.
Bind and unbind methods described in section [API Methods](#api-methods).

| Name                | Payload        | Description                                                                                                                                                                                                  |
| ------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| init                |                | Fires once when the chat DOM is ready, widgets are rendered and chat config is loaded. You can call API methods but can't send messages because chat is not connected.                                       |
| ready               |                | Fires once when the chat DOM is ready, configuration is loaded and chat connected to conversational channel. You can send messages. Mind that chat connects to conversational channel only after first open. |
| chatbox.show.before |                | Fires before the chat window is shown.                                                                                                                                                                       |
| destroy             |                | Fires once when the chat is destroyed.                                                                                                                                                                       |
| chatbox.show        |                | Fires whenever the chat window is shown.                                                                                                                                                                     |
| chatbox.hide.before |                | Fires before the chat window is hidden.                                                                                                                                                                      |
| chatbox.hide        |                | Fires whenever the chat window is hidden.                                                                                                                                                                    |
| button.show.before  |                | Fires before the toggle button is shown.                                                                                                                                                                     |
| button.show         |                | Fires whenever the toggle button is shown.                                                                                                                                                                   |
| button.hide.before  |                | Fires before the toggle button is hidden.                                                                                                                                                                    |
| button.hide         |                | Fires whenever the toggle button is hidden.                                                                                                                                                                  |
| message.sent        | `RequestModel` | Fires whenever a visitor sent message.                                                                                                                                                                       |
| message.receive     | `MessageModel` | Fires whenever a visitor received message.                                                                                                                                                                   |
| command.receive     | `CommandModel` | Fires whenever a visitor received command.                                                                                                                                                                   |

Event `init` example.

```javascript
const client = Dialogshift.instance()

client.on('init', () => {
  console.log('Widgets are rendered and webconfig is loaded')

  client.showChatbox()
})
```

Event `ready` example.

```javascript
const client = Dialogshift.instance()

client.on('ready', () => {
  console.log('SDK connected to a channel')

  client.triggerElement({
    successor: 'welcome-message',
  })
})
```

Event `chatbox.show` example.

```javascript
const client = Dialogshift.instance()

client.on('chatbox.show.before', () => {
  console.log('Chat window is going to be shown')
})

client.on('chatbox.show', () => {
  console.log('Chat window shown')
})
```

Event `message.sent` example.

```javascript
const client = Dialogshift.instance()

client.on('message.sent', event => {
  const requestModel = event.data

  if (requestModel.requestType === 'text') {
    console.log('The visitor sent message: ' + requestModel.text)
  }
})
```

`RequestModel`

| Name        | Description                                                                                   |
| ----------- | --------------------------------------------------------------------------------------------- |
| requestType | Type of the sent message. Possible values `command`, `text`, `button`, `feedback`, `trigger`. |

RequestModel contains different fields correspond to requestType.

Event `message.receive` example.

```javascript
const client = Dialogshift.instance()

client.on('message.receive', event => {
  const messageModel = event.data
  console.log(messageModel)
  console.log('The visitor got message')
})
```

`MessageModel`

| Name        | Type     | Description                                                                                                                       |
| ----------- | -------- | --------------------------------------------------------------------------------------------------------------------------------- |
| datetime    | datetime | Time in a `datetime` format.                                                                                                      |
| fromHistory | boolean  | Source of the message.                                                                                                            |
| isLiveMode  | boolean  | `true` if user got the message from a operator.                                                                                   |
| elementType | string   | Type of element inside the message. Possible values `feedback`, `text`, `button`, `carousel`, `list`,`book`, `dateRange`,`image`. |

MessageModel contains different fields correspond to elementType type.

Event `command.receive` example.

```javascript
const client = Dialogshift.instance()

client.on('command.receive', event => {
  const commandModel = event.data

  if (commandModel.commandType === 'setLanguage') {
    console.log(
      'The visitor got command to change locale to ' + commandModel.lg
    )
  }
})
```

`CommandModel`

| Name        | Type   | Description                                                                                                                       |
| ----------- | ------ | --------------------------------------------------------------------------------------------------------------------------------- |
| commandType | string | Type of command. Possible values `url`, `setLanguage`, `typingIndicatorOn`,`typingIndicatorOff`, `livechat`,`log`, `actionBroker` |

CommandModel contains different fields correspond to commandType type.

## Getting help <a name = "getting-help"></a>

Please use our [Github issue tracker](https://github.com/dialogshift/dialogshift-webchat-sdk/issues) for questions, feature requests, suggestions, bug reports or any kind of feedback. Or email us to support@dialogshift.com

## Resources <a name = "resources"></a>

[SDK Demo](https://dialogshift-demo.glitch.me/)

[https://www.dialogshift.com](https://www.dialogshift.com)

[Member area](https://member.dialogshift.com)

[Examples](https://support.dialogshift.com/sdk-examples/)

[Introduction to Dialogshift conversational framework](https://support.dialogshift.com)

[Webchat config description](https://support.dialogshift.com)

[SDK NPM page](https://www.npmjs.com/package/dialogshift-webchat-sdk)
