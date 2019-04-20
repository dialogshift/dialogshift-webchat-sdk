# SDK Documentation (BETA version)

A client library for build integration with [Dialogshift](https://www.dialogshift.com/) on websites. Written in TypeScript and published in `UMD` and `ES2015`.

## Installation

You can install SDK using `npm` or you can use http link directly.

### Install from npm

```bash
npm i dialogshift-sdk --save
```

### Include from CDN

```javascript
<script
  type="text/javascript"
  src="https://cdn.jsdelivr.net/npm/dialogshift-sdk/bundles/dialog-shift-sdk.umd.min.js"
/>
```

## Quick start (TypeScript & ES2015)

```javascript
import * as Dialogshift from 'dialogsshift-sdk'
import 'dialogsshift-sdk/bundles/dialogsshift-sdk.min.css'

const chat = Dialogshift.instance({
  id: '%id%',
})
```

## Quick start (HTML & UMD)

Your app will interact with the Dialogshift Web Client through the WebClient instance, which now is available in your scope.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Dialogshift SDK</title>
    <script
      type="text/javascript"
      src="https://cdn.jsdelivr.net/npm/dialogshift-sdk/bundles/dialog-shift-sdk.umd.min.js"
    ></script>
  </head>
  <body>
    <script type="text/javascript">
      var chat = Dialogshift.instance({
        id: '%id%',
      })
    </script>
  </body>
</html>
```

## Configuration

| Property          | Type              | Description                                                  |
| ----------------- | ----------------- | ------------------------------------------------------------ |
| id                | string            | Chat id obtained from the [application dashboard](https://www.dialogshift.com/). |
| locale?           | string            | Chat locale. Defaults to `en`.                               |
| position?         | 'left' \| 'right' | Chat position on webpage. Defaults to `right`.               |
| isChatboxVisible? | boolean           | Show chat window expanded if `true`. Defaults to `false`.    |
| isButtonVisible?  | boolean           | Show toggle button if `true`. Defaults to `true`.            |
| renderButton?     | boolean           | Render toggle button if `true`. If button is not rendered show or hide it later is impossible. Defaults to `true`. |
| isTeaserVisible?  | boolean           | Show attention grabber button if `true`. Defaults to `false`. |
| buttonText?       | string            | Text for toggle button. If text is setted icon and text render at same time. Defaults to no text. |
| teaserText?       | string            | Text for attention grabber. Defaults to `👋🏻 Hi, can I help you?`. |



## Events

| Name | Payload |Description |
| ---- | ----------- |----------- |
| ready |         | Fires whenever the chat DOM is ready, configuration is loaded and chat connected to conversational channel. You can send messages. Mind that chat connects to conversational channel only after first open. |
| error |  `errorMessage`, `errorType`       | Fires whenever error happened. |
| chatbox.show.before || Fires before the chat window is shown. |
| chatbox.show || Fires whenever the chat window is shown. |
| chatbox.hide.before || Fires before the chat window is hidden. |
| chatbox.hide || Fires whenever the chat window is hidden. |
| button.show.before || Fires before the toggle button is shown. |
| button.show || Fires whenever the toggle button is shown. |
| button.hide.before || Fires before the toggle button is hidden. |
| button.hide || Fires whenever the toggle button is hidden. |
| message.sent |`message`| Fires whenever a visitor sent message. |
| message.received |`message`| Fires whenever a visitor recieved message. |
| history.received |[`message`]| Fires whenever a history is loaded. |

## API Methods

| Name          | Parameters                           | Description                                                                                                                                                             |
| ------------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| instance      | config chatConfig                    | Returns the chat singleton instance.                                                                                                                                    |
| on            | string eventName, function handler   | Listen on a new event by type and handler. The handler will not be listen if it is a duplicate.                                                                         |
| once          | string eventName, function handler   | Listen on an once event by type and handler. The handler will not be listen if it is a duplicate.                                                                       |
| off           | string eventName?, function handler? | Listen off an event by type and handler. Or listen off events by type, when if only type argument is passed. Or listen off all events, when if no arguments are passed. |
| offAll        |                                      | Listen off all events.                                                                                                                                                  |
| showChatbox   |                                      | Show chatbox.                                                                                                                                                           |
| hideChatbox   |                                      | Hide chatbox.                                                                                                                                                           |
| showButton    |                                      | Show toggle button.                                                                                                                                                     |
| hideButton    |                                      | Hide toggle button.                                                                                                                                                     |
| setButtonText | string text                          | Change toggle button text. `text` could be an empty string.                                                                                                             |
| showTeaser    |                                      | Show teaser.                                                                                                                                                     |
| hideTeaser    |                                      | Hide teaser.                                                                                                                                                     |
| setTeaserText | string text                          | Change teaser text.           |
| setPosition | 'left' \| 'right'                           | Change chat container position.           |

## Getting Help

Please use [Github issue tracker](https://github.com/dialogshift/dialogshift-webchat-sdk/issues) for questions, feature requests, bug reports or email us to support@dialogshift.com
