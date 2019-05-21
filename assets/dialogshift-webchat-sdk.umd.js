// [AIV_SHORT]  Build version: 0.2.0 Environment: prod
;(function webpackUniversalModuleDefinition(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object')
    module.exports = factory()
  else if (typeof define === 'function' && define.amd)
    define('Dialogshift', [], factory)
  else if (typeof exports === 'object') exports['Dialogshift'] = factory()
  else root['Dialogshift'] = factory()
})(window, function() {
  return /******/ (function(modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {} // The require function
    /******/
    /******/ /******/ function __webpack_require__(moduleId) {
      /******/
      /******/ // Check if module is in cache
      /******/ if (installedModules[moduleId]) {
        /******/ return installedModules[moduleId].exports
        /******/
      } // Create a new module (and put it into the cache)
      /******/ /******/ var module = (installedModules[moduleId] = {
        /******/ i: moduleId,
        /******/ l: false,
        /******/ exports: {},
        /******/
      }) // Execute the module function
      /******/
      /******/ /******/ modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      ) // Flag the module as loaded
      /******/
      /******/ /******/ module.l = true // Return the exports of the module
      /******/
      /******/ /******/ return module.exports
      /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/ /******/ __webpack_require__.m = modules // expose the module cache
    /******/
    /******/ /******/ __webpack_require__.c = installedModules // define getter function for harmony exports
    /******/
    /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
      /******/ if (!__webpack_require__.o(exports, name)) {
        /******/ Object.defineProperty(exports, name, {
          enumerable: true,
          get: getter,
        })
        /******/
      }
      /******/
    } // define __esModule on exports
    /******/
    /******/ /******/ __webpack_require__.r = function(exports) {
      /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: 'Module',
        })
        /******/
      }
      /******/ Object.defineProperty(exports, '__esModule', { value: true })
      /******/
    } // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
    /******/
    /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
      value,
      mode
    ) {
      /******/ if (mode & 1) value = __webpack_require__(value)
      /******/ if (mode & 8) return value
      /******/ if (
        mode & 4 &&
        typeof value === 'object' &&
        value &&
        value.__esModule
      )
        return value
      /******/ var ns = Object.create(null)
      /******/ __webpack_require__.r(ns)
      /******/ Object.defineProperty(ns, 'default', {
        enumerable: true,
        value: value,
      })
      /******/ if (mode & 2 && typeof value != 'string')
        for (var key in value)
          __webpack_require__.d(
            ns,
            key,
            function(key) {
              return value[key]
            }.bind(null, key)
          )
      /******/ return ns
      /******/
    } // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/ /******/ __webpack_require__.n = function(module) {
      /******/ var getter =
        module && module.__esModule
          ? /******/ function getDefault() {
              return module['default']
            }
          : /******/ function getModuleExports() {
              return module
            }
      /******/ __webpack_require__.d(getter, 'a', getter)
      /******/ return getter
      /******/
    } // Object.prototype.hasOwnProperty.call
    /******/
    /******/ /******/ __webpack_require__.o = function(object, property) {
      return Object.prototype.hasOwnProperty.call(object, property)
    } // __webpack_public_path__
    /******/
    /******/ /******/ __webpack_require__.p = '' // Load entry module and return exports
    /******/
    /******/
    /******/ /******/ return __webpack_require__(
      (__webpack_require__.s = './src/scripts/index.ts')
    )
    /******/
  })(
    /************************************************************************/
    /******/ {
      /***/ './src/scripts/config/config.ts':
        /*!**************************************!*\
  !*** ./src/scripts/config/config.ts ***!
  \**************************************/
        /*! exports provided: config */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'config',
            function() {
              return config
            }
          )
          /* harmony import */ var _env__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            /*! ./env */ './src/scripts/config/env.js'
          )

          var config = {
            wrapperCls: 'ds-wrapper',
            wrapperNoButtonCls: 'ds-wrapper--no-button',
            wrapperPositionLeftCls: 'ds-wrapper--pl',
            wrapperPositionRightCls: 'ds-wrapper--pr',
            buttonCls: 'ds-button',
            buttonLogoCls: 'ds-button--logo',
            buttonWithTextCls: 'ds-button--with-text',
            buttonActiveCls: 'ds-button--active',
            chatCls: 'ds-chat',
            chatLoadingCls: 'ds-chat--loading',
            chatIsOpen: 'ds-chat--opened',
            iframeCls: 'ds-iframe',
            teaserCls: 'ds-teaser',
            teaserCrossCls: 'ds-teaser__cross',
            teaserTextCls: 'ds-teaser__text',
            unreadCls: 'ds-unread',
            env: _env__WEBPACK_IMPORTED_MODULE_0__['environment'],
          }

          /***/
        },

      /***/ './src/scripts/config/env.js':
        /*!***********************************!*\
  !*** ./src/scripts/config/env.js ***!
  \***********************************/
        /*! exports provided: environment */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony import */ var _env_prod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            /*! ./env.prod */ './src/scripts/config/env.prod.js'
          )
          /* harmony reexport (safe) */ __webpack_require__.d(
            __webpack_exports__,
            'environment',
            function() {
              return _env_prod__WEBPACK_IMPORTED_MODULE_0__['environment']
            }
          )

          /***/
        },

      /***/ './src/scripts/config/env.prod.js':
        /*!****************************************!*\
  !*** ./src/scripts/config/env.prod.js ***!
  \****************************************/
        /*! exports provided: environment */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'environment',
            function() {
              return environment
            }
          )
          const environment = {
            apiEndpoint: 'https://core.prod.co25.net:5001',
            iframeHost: 'https://webchat.dialogshift.com',
          }

          /***/
        },

      /***/ './src/scripts/core/app.ts':
        /*!*********************************!*\
  !*** ./src/scripts/core/app.ts ***!
  \*********************************/
        /*! exports provided: ChatPosition, ActionEventType, ActionEventName, App */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'ChatPosition',
            function() {
              return ChatPosition
            }
          )
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'ActionEventType',
            function() {
              return ActionEventType
            }
          )
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'ActionEventName',
            function() {
              return ActionEventName
            }
          )
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'App',
            function() {
              return App
            }
          )
          /* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            /*! ../config/config */ './src/scripts/config/config.ts'
          )
          /* harmony import */ var _event_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
            /*! ./event-emitter */ './src/scripts/core/event-emitter.ts'
          )
          /* harmony import */ var _widgets_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
            /*! ../widgets/index */ './src/scripts/widgets/index.ts'
          )
          /* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
            /*! ../services */ './src/scripts/services/index.ts'
          )
          /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
            /*! ./utils */ './src/scripts/core/utils.ts'
          )

          var ChatPosition
          ;(function(ChatPosition) {
            ChatPosition['left'] = 'left'
            ChatPosition['right'] = 'right'
          })(ChatPosition || (ChatPosition = {}))
          var appOptionsDefault = {
            locale: 'en',
            position: ChatPosition.right,
            isChatboxVisible: false,
            isButtonVisible: true,
            isTeaserVisible: false,
            renderButton: true,
            showFooter: true,
            initialElement: '',
          }
          var ActionEventType
          ;(function(ActionEventType) {
            ActionEventType['action'] = 'action'
            ActionEventType['message'] = 'message'
          })(ActionEventType || (ActionEventType = {}))
          var ActionEventName
          ;(function(ActionEventName) {
            ActionEventName['userReady'] = 'user.ready'
            ActionEventName['tabOpen'] = 'tab.open'
          })(ActionEventName || (ActionEventName = {}))
          var App = /** @class */ (function() {
            function App(options) {
              if (!options) {
                throw Error('Please provide Dialogshift chat configuration')
              }
              if (!options.id) {
                throw Error('Dialogshift chat id is undefined.')
              }
              this.apiService = new _services__WEBPACK_IMPORTED_MODULE_3__[
                'ApiService'
              ]()
              this.options = Object.assign(appOptionsDefault, options)
              this.broadcast = new _event_emitter__WEBPACK_IMPORTED_MODULE_1__[
                'EventEmitter'
              ]()
              this.init()
            }
            App.prototype.init = function() {
              var _this = this
              var openUrlParam = Object(
                _utils__WEBPACK_IMPORTED_MODULE_4__['getUrlParam']
              )('dschat')
              if (openUrlParam === 'open') {
                this.options.isChatboxVisible = true
              }
              this.loadConfig().then(function() {
                _this.render()
                _this.bindEvents()
              })
            }
            App.prototype.render = function() {
              this.renderWrapperWidget()
              if (this.options.renderButton) {
                this.renderButtonWidget()
              }
              this.createIframeWidget()
              this.renderTeaserWidget()
              this.renderChatboxWidget()
              // this.renderUnreadWidget()
            }
            App.prototype.bindEvents = function() {
              var _this = this
              window.addEventListener('message', function(event) {
                if (
                  event.origin ===
                  _config_config__WEBPACK_IMPORTED_MODULE_0__['config'].env
                    .iframeHost
                ) {
                  var message = event.data
                  if (message.type === ActionEventType.message) {
                    _this.broadcast.fire(message.name, message.payload)
                  }
                  if (message.type === ActionEventType.action) {
                    _this.proceedActionEvent(message)
                  }
                }
              })
            }
            App.prototype.proceedActionEvent = function(message) {
              if (message.name === ActionEventName.userReady) {
                this.visitor = { id: message.payload.id }
              }
              if (message.name === ActionEventName.tabOpen) {
                var url = message.payload.targetUrl
                if (message.payload.urlType === 'openSameTab') {
                  if (
                    !Object(
                      _utils__WEBPACK_IMPORTED_MODULE_4__['isExternalUrl']
                    )(url)
                  ) {
                    url += (url.split('?')[1] ? '&' : '?') + 'dschat=open'
                  }
                  window.open(url, '_self')
                }
                if (message.payload.urlType === 'openNewTab') {
                  window.open(url, '_blank')
                }
              }
            }
            App.prototype.renderChatboxWidget = function() {
              var _this = this
              this.chatboxWidget = new _widgets_index__WEBPACK_IMPORTED_MODULE_2__[
                'ChatboxWidget'
              ]({
                visible: this.options.isChatboxVisible,
                events: [
                  {
                    type: 'before:show',
                    callback: function() {
                      _this.broadcast.fire('chatbox.show.before')
                      _this.teaserWidget.hide()
                      if (_this.buttonWidget) {
                        _this.buttonWidget.setState('active')
                      }
                      if (!_this.iframeWidget.isRendered()) {
                        _this.iframeWidget.render(
                          _this.chatboxWidget.getBoxElem()
                        )
                      }
                      if (!_this.iframeWidget.isLoaded()) {
                        _this.iframeWidget.load()
                      }
                    },
                  },
                  {
                    type: 'show',
                    callback: function() {
                      return _this.broadcast.fire('chatbox.show')
                    },
                  },
                  {
                    type: 'before:hide',
                    callback: function() {
                      _this.broadcast.fire('chatbox.hide.before')
                      if (_this.options.isTeaserVisible) {
                        _this.teaserWidget.show()
                      }
                      _this.buttonWidget.setState('default')
                    },
                  },
                  {
                    type: 'hide',
                    callback: function() {
                      _this.broadcast.fire('chatbox.hide')
                    },
                  },
                ],
              })
              this.chatboxWidget.render(this.wrapperWidget.getBoxElem())
              this.broadcast.on('ready', function() {
                _this.chatboxWidget.setState('ready')
              })
            }
            App.prototype.renderButtonWidget = function() {
              var _this = this
              this.buttonWidget = new _widgets_index__WEBPACK_IMPORTED_MODULE_2__[
                'ButtonWidget'
              ]({
                content: this.options.buttonText,
                renderTo: this.wrapperWidget.getBoxElem(),
                visible: this.options.isButtonVisible,
                events: [
                  {
                    type: 'toggle',
                    callback: function(event) {
                      event.data.isPressed
                        ? _this.chatboxWidget.show()
                        : _this.chatboxWidget.hide()
                    },
                  },
                  {
                    type: 'before:show',
                    callback: function(event) {
                      return _this.broadcast.fire('button.show.before')
                    },
                  },
                  {
                    type: 'show',
                    callback: function(event) {
                      return _this.broadcast.fire('button.show')
                    },
                  },
                  {
                    type: 'before:hide',
                    callback: function(event) {
                      return _this.broadcast.fire('button.hide.before')
                    },
                  },
                  {
                    type: 'hide',
                    callback: function(event) {
                      return _this.broadcast.fire('button.hide')
                    },
                  },
                ],
              })
            }
            App.prototype.renderWrapperWidget = function() {
              this.wrapperWidget = new _widgets_index__WEBPACK_IMPORTED_MODULE_2__[
                'WrapperWidget'
              ]({
                renderTo: document.body,
                position: this.options.position,
              })
              if (!this.options.renderButton) {
                this.wrapperWidget.addCls(
                  _config_config__WEBPACK_IMPORTED_MODULE_0__['config']
                    .wrapperNoButtonCls
                )
              }
            }
            App.prototype.createIframeWidget = function() {
              this.iframeWidget = new _widgets_index__WEBPACK_IMPORTED_MODULE_2__[
                'IframeWidget'
              ]({
                host:
                  _config_config__WEBPACK_IMPORTED_MODULE_0__['config'].env
                    .iframeHost,
                id: this.options.id,
                initialElement: this.options.initialElement,
                locale: this.options.locale,
              })
            }
            App.prototype.renderTeaserWidget = function() {
              var _this = this
              this.teaserWidget = new _widgets_index__WEBPACK_IMPORTED_MODULE_2__[
                'TeaserWidget'
              ]({
                renderTo: this.wrapperWidget.getBoxElem(),
                content: this.options.teaserText,
                visible: this.options.isTeaserVisible,
                events: [
                  {
                    type: 'before:show',
                    callback: function(event) {
                      return _this.broadcast.fire('teaser.show.before')
                    },
                  },
                  {
                    type: 'show',
                    callback: function(event) {
                      return _this.broadcast.fire('teaser.show')
                    },
                  },
                  {
                    type: 'before:hide',
                    callback: function(event) {
                      return _this.broadcast.fire('teaser.hide.before')
                    },
                  },
                  {
                    type: 'hide',
                    callback: function(event) {
                      return _this.broadcast.fire('teaser.hide')
                    },
                  },
                ],
              })
            }
            // private renderUnreadWidget() {
            //   this.unreadWidget = new UnreadWidget({
            //     renderTo: this.wrapperWidget.getBoxElem(),
            //     content: 10,
            //     visible: true,
            //   })
            // }
            App.prototype.loadConfig = function() {
              var _this = this
              return this.apiService
                .getConfig(this.options.id)
                .then(function(data) {
                  _this.chatConfig = {
                    ga: data.ga,
                    showFooter: data.showFooter,
                    teaserText: data.teaserText,
                    websiteElementCss: data.websiteElementCss,
                  }
                  if (data.websiteElementCss) {
                    Object(_utils__WEBPACK_IMPORTED_MODULE_4__['injectCss'])(
                      data.websiteElementCss
                    )
                  }
                  if (
                    !_this.options.teaserText &&
                    data.teaserText &&
                    data.teaserText[_this.options.locale]
                  ) {
                    _this.options.teaserText =
                      data.teaserText[_this.options.locale]
                  }
                  _this.broadcast.fire('init')
                  return _this.chatConfig
                })
            }
            App.prototype.getBroadcast = function() {
              return this.broadcast
            }
            App.prototype.getWrapperWidget = function() {
              return this.wrapperWidget
            }
            App.prototype.getChatboxWidget = function() {
              return this.chatboxWidget
            }
            App.prototype.getButtonWidget = function() {
              return this.buttonWidget
            }
            App.prototype.getTeaserWidget = function() {
              return this.teaserWidget
            }
            App.prototype.getContext = function(key) {
              return this.apiService.getContext(this.getVisitor().id, key)
            }
            App.prototype.setContext = function(key, value) {
              return this.apiService.setContext(
                this.getVisitor().id,
                key,
                value
              )
            }
            App.prototype.getVisitor = function() {
              return this.visitor
            }
            App.prototype.getConfig = function() {
              return this.chatConfig
            }
            return App
          })()

          /***/
        },

      /***/ './src/scripts/core/base-widget.ts':
        /*!*****************************************!*\
  !*** ./src/scripts/core/base-widget.ts ***!
  \*****************************************/
        /*! exports provided: BaseWidget */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'BaseWidget',
            function() {
              return BaseWidget
            }
          )
          /* harmony import */ var _observable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            /*! ./observable */ './src/scripts/core/observable.ts'
          )
          var __extends =
            (undefined && undefined.__extends) ||
            (function() {
              var extendStatics = function(d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(d, b) {
                      d.__proto__ = b
                    }) ||
                  function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]
                  }
                return extendStatics(d, b)
              }
              return function(d, b) {
                extendStatics(d, b)
                function __() {
                  this.constructor = d
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __())
              }
            })()

          var BaseWidget = /** @class */ (function(_super) {
            __extends(BaseWidget, _super)
            function BaseWidget(options) {
              var _this = _super.call(this, { events: options.events }) || this
              _this.visible = true
              _this.baseCls = ''
              _this.animationDelay = 250
              Object.assign(_this, options)
              if (_this.renderTo) {
                _this.render()
              }
              return _this
            }
            BaseWidget.prototype.isVisible = function() {
              return this.visible
            }
            BaseWidget.prototype.getBaseCls = function() {
              return this.baseCls
            }
            BaseWidget.prototype.createNode = function() {
              return document.createElement('div')
            }
            BaseWidget.prototype.getBoxElem = function() {
              if (!this.boxElem) {
                this.boxElem = this.createNode()
                if (this.getBaseCls()) {
                  this.boxElem.classList.add(this.getBaseCls())
                }
              }
              return this.boxElem
            }
            BaseWidget.prototype.getContentElem = function() {
              if (!this.contentElem) {
                this.contentElem = this.createNode()
                if (this.getBaseCls()) {
                  this.contentElem.classList.add(
                    this.getBaseCls() + '__content'
                  )
                }
                this.getBoxElem().appendChild(this.contentElem)
              }
              return this.contentElem
            }
            BaseWidget.prototype.render = function(renderTo) {
              if (!renderTo && !this.renderTo) {
                throw Error('Please provide parent node to render widget')
              }
              if (this.isRendered()) {
                return
              }
              var renderToNode = this.renderTo
              if (renderTo) {
                renderToNode = renderTo
              }
              this.fire('before:render')
              var boxElem = this.getBoxElem()
              if (!this.visible) {
                boxElem.style.display = 'none'
                boxElem.style.opacity = '0'
              }
              if (this.content) {
                this.setContent(this.content)
              }
              renderToNode.appendChild(boxElem)
              this.fire('render')
              if (this.visible) {
                this.visible = false
                this.show()
              }
            }
            BaseWidget.prototype.isRendered = function() {
              return this.boxElem && document.body.contains(this.boxElem)
            }
            BaseWidget.prototype.show = function() {
              var _this = this
              if (this.isVisible()) {
                return
              }
              this.fire('before:show')
              this.visible = true
              var boxElem = this.getBoxElem()
              boxElem.style.display = 'block'
              setTimeout(function() {
                boxElem.style.opacity = '1'
              })
              setTimeout(function() {
                return _this.fire('show')
              }, this.animationDelay)
            }
            BaseWidget.prototype.hide = function() {
              var _this = this
              if (!this.isVisible()) {
                return
              }
              this.fire('before:hide')
              this.visible = false
              var boxElem = this.getBoxElem()
              boxElem.style.opacity = '0'
              setTimeout(function() {
                boxElem.style.display = 'none'
                _this.fire('hide')
              }, this.animationDelay)
            }
            BaseWidget.prototype.addCls = function(cls) {
              this.getBoxElem().classList.add(cls)
            }
            BaseWidget.prototype.removeCls = function(cls) {
              this.getBoxElem().classList.remove(cls)
            }
            BaseWidget.prototype.setContent = function(content, safe) {
              if (safe === void 0) {
                safe = false
              }
              this.content = content
              if (safe) {
                this.getContentElem().innerText = content
              } else {
                this.getContentElem().innerHTML = content
              }
            }
            return BaseWidget
          })(_observable__WEBPACK_IMPORTED_MODULE_0__['Observable'])

          /***/
        },

      /***/ './src/scripts/core/event-emitter.ts':
        /*!*******************************************!*\
  !*** ./src/scripts/core/event-emitter.ts ***!
  \*******************************************/
        /*! exports provided: EventEmitter */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'EventEmitter',
            function() {
              return EventEmitter
            }
          )
          /**
           * A simple and lightweight EventEmitter by TypeScript for Node.js or Browsers.
           *
           * @author billjs
           * @see https://github.com/billjs/event-emitter
           * @license MIT(https://opensource.org/licenses/MIT)
           */
          /**
           * It's a class for managing events.
           * It can be extended to provide event functionality for other classes or object.
           *
           * @export
           * @class EventEmitter
           */
          var EventEmitter = /** @class */ (function() {
            function EventEmitter() {
              /**
               * the all event handlers are added.
               * it's a Map data structure(key-value), the key is event type, and the value is event handler.
               *
               * @memberof EventEmitter
               */
              this.eventHandlers = {}
            }
            /**
             * event type validator.
             *
             * @param {string} type event type
             * @returns {boolean}
             * @memberof EventEmitter
             */
            EventEmitter.prototype.isValidType = function(type) {
              return typeof type === 'string'
            }
            /**
             * event handler validator.
             *
             * @param {EventHandler} handler event handler
             * @returns {boolean}
             * @memberof EventEmitter
             */
            EventEmitter.prototype.isValidHandler = function(handler) {
              return typeof handler === 'function'
            }
            /**
             * listen on a new event by type and handler.
             * if listen on, the true is returned, otherwise the false.
             * The handler will not be listen if it is a duplicate.
             *
             * @param {string} type event type, it must be a unique string.
             * @param {EventHandler} handler event handler, when if the same handler is passed,
             * listen it by only once.
             * @returns {boolean}
             * @memberof EventEmitter
             * @example
             *  const emitter = new EventEmitter();
             *  emitter.on('change:name', evt => {
             *    console.log(evt);
             *  });
             */
            EventEmitter.prototype.on = function(type, handler) {
              if (!type || !handler) return false
              if (!this.isValidType(type)) return false
              if (!this.isValidHandler(handler)) return false
              var handlers = this.eventHandlers[type]
              if (!handlers) handlers = this.eventHandlers[type] = []
              // when the same handler is passed, listen it by only once.
              if (handlers.indexOf(handler) >= 0) return false
              handler._once = false
              handlers.push(handler)
              return true
            }
            /**
             * listen on an once event by type and handler.
             * when the event is fired, that will be listen off immediately and automatically.
             * The handler will not be listen if it is a duplicate.
             *
             * @param {string} type event type, it must be a unique string.
             * @param {EventHandler} handler event handler,
             * when if the same handler is passed, listen it by only once.
             * @returns {boolean}
             * @memberof EventEmitter
             * @example
             *  const emitter = new EventEmitter();
             *  emitter.once('change:name', evt => {
             *    console.log(evt);
             *  });
             */
            EventEmitter.prototype.once = function(type, handler) {
              if (!type || !handler) return false
              if (!this.isValidType(type)) return false
              if (!this.isValidHandler(handler)) return false
              var ret = this.on(type, handler)
              if (ret) {
                // set `_once` private property after listened,
                // avoid to modify event handler that has been listened.
                handler._once = true
              }
              return ret
            }
            /**
             * listen off an event by type and handler.
             * or listen off events by type, when if only type argument is passed.
             * or listen off all events, when if no arguments are passed.
             *
             * @param {string} [type] event type
             * @param {EventHandler} [handler] event handler
             * @returns
             * @memberof EventEmitter
             * @example
             *  const emitter = new EventEmitter();
             *  // listen off the specified event
             *  emitter.off('change:name', evt => {
             *    console.log(evt);
             *  });
             *  // listen off events by type
             *  emitter.off('change:name');
             *  // listen off all events
             *  emitter.off();
             */
            EventEmitter.prototype.off = function(type, handler) {
              // listen off all events, when if no arguments are passed.
              // it does samething as `offAll` method.
              if (!type) return this.offAll()
              // listen off events by type, when if only type argument is passed.
              if (!handler) {
                this.eventHandlers[type] = []
                return
              }
              if (!this.isValidType(type)) return
              if (!this.isValidHandler(handler)) return
              var handlers = this.eventHandlers[type]
              if (!handlers || !handlers.length) return
              // otherwise, listen off the specified event.
              for (var i = 0; i < handlers.length; i++) {
                var fn = handlers[i]
                if (fn === handler) {
                  handlers.splice(i, 1)
                  break
                }
              }
            }
            /**
             * listen off all events, that means every event will be emptied.
             *
             * @memberof EventEmitter
             * @example
             *  const emitter = new EventEmitter();
             *  emitter.offAll();
             */
            EventEmitter.prototype.offAll = function() {
              this.eventHandlers = {}
            }
            /**
             * fire the specified event, and you can to pass a data.
             * When fired, every handler attached to that event will be executed.
             * But, if it's an once event, listen off it immediately after called handler.
             *
             * @param {string} type event type
             * @param {*} [data] event data
             * @returns
             * @memberof EventEmitter
             * @example
             *  const emitter = new EventEmitter();
             *  emitter.fire('change:name', 'new name');
             */
            EventEmitter.prototype.fire = function(type, data) {
              if (!type || !this.isValidType(type)) return
              var handlers = this.eventHandlers[type]
              if (!handlers || !handlers.length) return
              var event = this.createEvent(type, data)
              for (
                var _i = 0, handlers_1 = handlers;
                _i < handlers_1.length;
                _i++
              ) {
                var handler = handlers_1[_i]
                if (!this.isValidHandler(handler)) continue
                if (handler._once) event.once = true
                // call event handler, and pass the event argument.
                handler(event)
                // if it's an once event, listen off it immediately after called handler.
                if (event.once) this.off(type, handler)
              }
            }
            /**
             * check whether the specified event has been listen on.
             * or check whether the events by type has been listen on, when if only `type` argument is passed.
             *
             * @param {string} type event type
             * @param {EventHandler} [handler] event handler, optional
             * @returns {boolean}
             * @memberof EventEmitter
             * @example
             *  const emitter = new EventEmitter();
             *  const result = emitter.has('change:name');
             */
            EventEmitter.prototype.has = function(type, handler) {
              if (!type || !this.isValidType(type)) return false
              var handlers = this.eventHandlers[type]
              // if there are no any events, return false.
              if (!handlers || !handlers.length) return false
              // at lest one event, and no pass `handler` argument, then return true.
              if (!handler || !this.isValidHandler(handler)) return true
              // otherwise, need to traverse the handlers.
              return handlers.indexOf(handler) >= 0
            }
            /**
             * get the handlers for the specified event type.
             *
             * @param {string} type event type
             * @returns {EventHandler[]}
             * @memberof EventEmitter
             * @example
             *  const emitter = new EventEmitter();
             *  const handlers = emitter.getHandlers('change:name');
             *  console.log(handlers);
             */
            EventEmitter.prototype.getHandlers = function(type) {
              if (!type || !this.isValidType(type)) return []
              return this.eventHandlers[type] || []
            }
            /**
             * create event object.
             *
             * @param {string} type event type
             * @param {*} [data] event data
             * @param {boolean} [once=false] is it an once event?
             * @returns {Event}
             * @memberof EventEmitter
             */
            EventEmitter.prototype.createEvent = function(type, data, once) {
              if (once === void 0) {
                once = false
              }
              var event = {
                type: type,
                data: data,
                once: once,
                timestamp: Date.now(),
              }
              return event
            }
            return EventEmitter
          })()

          /***/
        },

      /***/ './src/scripts/core/facade.ts':
        /*!************************************!*\
  !*** ./src/scripts/core/facade.ts ***!
  \************************************/
        /*! exports provided: createFacade */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'createFacade',
            function() {
              return createFacade
            }
          )
          var createFacade = function(instance) {
            return {
              on: function(type, handler) {
                instance.getBroadcast().on(type, handler)
              },
              once: function(type, handler) {
                instance.getBroadcast().once(type, handler)
              },
              off: function(type, handler) {
                instance.getBroadcast().off(type, handler)
              },
              offAll: function() {
                instance.getBroadcast().offAll()
              },
              showChatbox: function() {
                instance.getChatboxWidget().show()
              },
              hideChatbox: function() {
                instance.getChatboxWidget().hide()
              },
              showButton: function() {
                instance.getButtonWidget().show()
              },
              hideButton: function() {
                instance.getButtonWidget().hide()
              },
              setButtonText: function(text) {
                instance.getButtonWidget().setContent(text)
              },
              showTeaser: function() {
                instance.getTeaserWidget().show()
              },
              hideTeaser: function() {
                instance.getTeaserWidget().hide()
              },
              setTeaserText: function(text) {
                instance.getTeaserWidget().setContent(text)
              },
              setPosition: function(position) {
                instance.getWrapperWidget().setPosition(position)
              },
              getContext: function(key) {
                return instance.getContext(key)
              },
              setContext: function(key, value) {
                return instance.setContext(key, value)
              },
              getVisitor: function() {
                return instance.getVisitor()
              },
              getConfig: function() {
                return instance.getConfig()
              },
            }
          }

          /***/
        },

      /***/ './src/scripts/core/observable.ts':
        /*!****************************************!*\
  !*** ./src/scripts/core/observable.ts ***!
  \****************************************/
        /*! exports provided: Observable */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'Observable',
            function() {
              return Observable
            }
          )
          /* harmony import */ var _event_emitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            /*! ./event-emitter */ './src/scripts/core/event-emitter.ts'
          )
          var __extends =
            (undefined && undefined.__extends) ||
            (function() {
              var extendStatics = function(d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(d, b) {
                      d.__proto__ = b
                    }) ||
                  function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]
                  }
                return extendStatics(d, b)
              }
              return function(d, b) {
                extendStatics(d, b)
                function __() {
                  this.constructor = d
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __())
              }
            })()

          var Observable = /** @class */ (function(_super) {
            __extends(Observable, _super)
            function Observable(options) {
              var _this = _super.call(this) || this
              var events = options.events || []
              events.forEach(function(item) {
                if (item.once) {
                  _this.once(item.type, item.callback)
                } else {
                  _this.on(item.type, item.callback)
                }
              })
              return _this
            }
            return Observable
          })(_event_emitter__WEBPACK_IMPORTED_MODULE_0__['EventEmitter'])

          /***/
        },

      /***/ './src/scripts/core/utils.ts':
        /*!***********************************!*\
  !*** ./src/scripts/core/utils.ts ***!
  \***********************************/
        /*! exports provided: getUrlParam, isExternalUrl, injectCss */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'getUrlParam',
            function() {
              return getUrlParam
            }
          )
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'isExternalUrl',
            function() {
              return isExternalUrl
            }
          )
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'injectCss',
            function() {
              return injectCss
            }
          )
          var getUrlParam = function(name, defaultReturn) {
            if (defaultReturn === void 0) {
              defaultReturn = null
            }
            var url = new URL(location.href)
            var param = url.searchParams.get(name)
            if (param && param.length >= 1) {
              return param
            }
            return defaultReturn
          }
          var isExternalUrl = function(url) {
            var match = url.match(
              /^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/
            )
            if (
              match != null &&
              typeof match[1] === 'string' &&
              match[1].length > 0 &&
              match[1].toLowerCase() !== location.protocol
            ) {
              return true
            }
            if (
              match != null &&
              typeof match[2] === 'string' &&
              match[2].length > 0 &&
              match[2].replace(
                new RegExp(
                  ":( + { 'http:': 80, 'https:': 443 }[" +
                    location.protocol +
                    '] + )?$'
                ),
                ''
              ) !== location.host
            ) {
              return true
            }
            return false
          }
          var injectCss = function(css) {
            var style = document.createElement('style')
            style.type = 'text/css'
            style.innerHTML = css
            document.querySelector('head').appendChild(style)
          }

          /***/
        },

      /***/ './src/scripts/index.ts':
        /*!******************************!*\
  !*** ./src/scripts/index.ts ***!
  \******************************/
        /*! exports provided: instance */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'instance',
            function() {
              return instance
            }
          )
          /* harmony import */ var _core_facade__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            /*! ./core/facade */ './src/scripts/core/facade.ts'
          )
          /* harmony import */ var _core_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
            /*! ./core/app */ './src/scripts/core/app.ts'
          )

          var facade = null
          var instance = function(options) {
            if (facade) {
              return facade
            }
            facade = Object(
              _core_facade__WEBPACK_IMPORTED_MODULE_0__['createFacade']
            )(new _core_app__WEBPACK_IMPORTED_MODULE_1__['App'](options))
            return facade
          }

          /***/
        },

      /***/ './src/scripts/services/api.service.ts':
        /*!*********************************************!*\
  !*** ./src/scripts/services/api.service.ts ***!
  \*********************************************/
        /*! exports provided: ApiService */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'ApiService',
            function() {
              return ApiService
            }
          )
          /* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            /*! ./ */ './src/scripts/services/index.ts'
          )
          /* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
            /*! ../config/config */ './src/scripts/config/config.ts'
          )

          var ApiService = /** @class */ (function() {
            function ApiService() {}
            ApiService.prototype.getTransport = function() {
              return ___WEBPACK_IMPORTED_MODULE_0__['HttpService']
            }
            ApiService.prototype.getEndpoint = function() {
              return _config_config__WEBPACK_IMPORTED_MODULE_1__['config'].env
                .apiEndpoint
            }
            ApiService.prototype.setContext = function(visitorId, key, value) {
              var context = {}
              context[key] = value
              var data = {
                custid: visitorId,
                context: JSON.stringify(context),
              }
              return this.getTransport().postRequest(
                this.getEndpoint() + '/config/context',
                data
              )
            }
            ApiService.prototype.getContext = function(visitorId, variable) {
              return this.getTransport().getRequest(
                this.getEndpoint() +
                  '/config/context/' +
                  visitorId +
                  '/' +
                  variable
              )
            }
            ApiService.prototype.getConfig = function(clientId) {
              return this.getTransport().getRequest(
                this.getEndpoint() + '/config/webapp/' + clientId
              )
            }
            return ApiService
          })()

          /***/
        },

      /***/ './src/scripts/services/http.service.ts':
        /*!**********************************************!*\
  !*** ./src/scripts/services/http.service.ts ***!
  \**********************************************/
        /*! exports provided: HttpService */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'HttpService',
            function() {
              return HttpService
            }
          )
          var HttpService = /** @class */ (function() {
            function HttpService() {}
            HttpService.processError = function(response) {
              if (response.status >= 200 && response.status < 300) {
                return Promise.resolve(response)
              }
              return Promise.reject(new Error(response.statusText))
            }
            HttpService.processJson = function(response) {
              return response.json()
            }
            HttpService.getRequest = function(url) {
              return fetch(url)
                .then(this.processError)
                .then(this.processJson)
            }
            HttpService.postRequest = function(url, data) {
              if (data === void 0) {
                data = {}
              }
              return fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                mode: 'cors',
                body: JSON.stringify(data),
              }).then(this.processError)
            }
            return HttpService
          })()

          /***/
        },

      /***/ './src/scripts/services/index.ts':
        /*!***************************************!*\
  !*** ./src/scripts/services/index.ts ***!
  \***************************************/
        /*! exports provided: ApiService, HttpService */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            /*! ./api.service */ './src/scripts/services/api.service.ts'
          )
          /* harmony reexport (safe) */ __webpack_require__.d(
            __webpack_exports__,
            'ApiService',
            function() {
              return _api_service__WEBPACK_IMPORTED_MODULE_0__['ApiService']
            }
          )

          /* harmony import */ var _http_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
            /*! ./http.service */ './src/scripts/services/http.service.ts'
          )
          /* harmony reexport (safe) */ __webpack_require__.d(
            __webpack_exports__,
            'HttpService',
            function() {
              return _http_service__WEBPACK_IMPORTED_MODULE_1__['HttpService']
            }
          )

          /***/
        },

      /***/ './src/scripts/widgets/button-widget.ts':
        /*!**********************************************!*\
  !*** ./src/scripts/widgets/button-widget.ts ***!
  \**********************************************/
        /*! exports provided: ButtonWidget */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'ButtonWidget',
            function() {
              return ButtonWidget
            }
          )
          /* harmony import */ var _core_base_widget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            /*! ../core/base-widget */ './src/scripts/core/base-widget.ts'
          )
          /* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
            /*! ../config/config */ './src/scripts/config/config.ts'
          )
          var __extends =
            (undefined && undefined.__extends) ||
            (function() {
              var extendStatics = function(d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(d, b) {
                      d.__proto__ = b
                    }) ||
                  function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]
                  }
                return extendStatics(d, b)
              }
              return function(d, b) {
                extendStatics(d, b)
                function __() {
                  this.constructor = d
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __())
              }
            })()

          var ButtonWidget = /** @class */ (function(_super) {
            __extends(ButtonWidget, _super)
            function ButtonWidget(options) {
              var _this = _super.call(this, options) || this
              _this.pressed = false
              return _this
            }
            ButtonWidget.prototype.getBaseCls = function() {
              return _config_config__WEBPACK_IMPORTED_MODULE_1__['config']
                .buttonCls
            }
            ButtonWidget.prototype.render = function() {
              var boxElem = this.getBoxElem()
              boxElem.classList.add(
                _config_config__WEBPACK_IMPORTED_MODULE_1__['config']
                  .buttonLogoCls
              )
              this.bindEvents()
              _super.prototype.render.call(this)
            }
            ButtonWidget.prototype.bindEvents = function() {
              var _this = this
              this.getBoxElem().addEventListener('click', function() {
                _this.pressed = !_this.pressed
                _this.fire('toggle', {
                  isPressed: _this.pressed,
                })
              })
            }
            ButtonWidget.prototype.setState = function(state) {
              if (state === 'active') {
                this.pressed = true
                this.getBoxElem().classList.add(
                  _config_config__WEBPACK_IMPORTED_MODULE_1__['config']
                    .buttonActiveCls
                )
              }
              if (state === 'default') {
                this.pressed = false
                this.getBoxElem().classList.remove(
                  _config_config__WEBPACK_IMPORTED_MODULE_1__['config']
                    .buttonActiveCls
                )
              }
            }
            ButtonWidget.prototype.setContent = function(text) {
              _super.prototype.setContent.call(this, text)
              if (text) {
                this.getBoxElem().classList.add(
                  _config_config__WEBPACK_IMPORTED_MODULE_1__['config']
                    .buttonWithTextCls
                )
              } else {
                this.getBoxElem().classList.remove(
                  _config_config__WEBPACK_IMPORTED_MODULE_1__['config']
                    .buttonWithTextCls
                )
              }
            }
            return ButtonWidget
          })(_core_base_widget__WEBPACK_IMPORTED_MODULE_0__['BaseWidget'])

          /***/
        },

      /***/ './src/scripts/widgets/chatbox-widget.ts':
        /*!***********************************************!*\
  !*** ./src/scripts/widgets/chatbox-widget.ts ***!
  \***********************************************/
        /*! exports provided: ChatboxWidget */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'ChatboxWidget',
            function() {
              return ChatboxWidget
            }
          )
          /* harmony import */ var _core_base_widget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            /*! ../core/base-widget */ './src/scripts/core/base-widget.ts'
          )
          /* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
            /*! ../config/config */ './src/scripts/config/config.ts'
          )
          var __extends =
            (undefined && undefined.__extends) ||
            (function() {
              var extendStatics = function(d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(d, b) {
                      d.__proto__ = b
                    }) ||
                  function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]
                  }
                return extendStatics(d, b)
              }
              return function(d, b) {
                extendStatics(d, b)
                function __() {
                  this.constructor = d
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __())
              }
            })()

          var ChatboxWidget = /** @class */ (function(_super) {
            __extends(ChatboxWidget, _super)
            function ChatboxWidget(options) {
              var _this = _super.call(this, options) || this
              _this.setState('loading')
              _this.on('before:show', function() {
                return document.body.classList.add(
                  _config_config__WEBPACK_IMPORTED_MODULE_1__['config']
                    .chatIsOpen
                )
              })
              _this.on('before:hide', function() {
                return document.body.classList.remove(
                  _config_config__WEBPACK_IMPORTED_MODULE_1__['config']
                    .chatIsOpen
                )
              })
              return _this
            }
            ChatboxWidget.prototype.getBaseCls = function() {
              return _config_config__WEBPACK_IMPORTED_MODULE_1__['config']
                .chatCls
            }
            ChatboxWidget.prototype.setState = function(state) {
              if (state === 'loading') {
                this.getBoxElem().classList.add(
                  _config_config__WEBPACK_IMPORTED_MODULE_1__['config']
                    .chatLoadingCls
                )
              }
              if (state === 'ready') {
                this.getBoxElem().classList.remove(
                  _config_config__WEBPACK_IMPORTED_MODULE_1__['config']
                    .chatLoadingCls
                )
              }
            }
            return ChatboxWidget
          })(_core_base_widget__WEBPACK_IMPORTED_MODULE_0__['BaseWidget'])

          /***/
        },

      /***/ './src/scripts/widgets/iframe-widget.ts':
        /*!**********************************************!*\
  !*** ./src/scripts/widgets/iframe-widget.ts ***!
  \**********************************************/
        /*! exports provided: IframeWidget */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'IframeWidget',
            function() {
              return IframeWidget
            }
          )
          /* harmony import */ var _core_base_widget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            /*! ../core/base-widget */ './src/scripts/core/base-widget.ts'
          )
          /* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
            /*! ../config/config */ './src/scripts/config/config.ts'
          )
          var __extends =
            (undefined && undefined.__extends) ||
            (function() {
              var extendStatics = function(d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(d, b) {
                      d.__proto__ = b
                    }) ||
                  function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]
                  }
                return extendStatics(d, b)
              }
              return function(d, b) {
                extendStatics(d, b)
                function __() {
                  this.constructor = d
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __())
              }
            })()

          var IframeWidget = /** @class */ (function(_super) {
            __extends(IframeWidget, _super)
            function IframeWidget(options) {
              var _this = _super.call(this, options) || this
              _this.loaded = false
              return _this
            }
            IframeWidget.prototype.getBaseCls = function() {
              return _config_config__WEBPACK_IMPORTED_MODULE_1__['config']
                .iframeCls
            }
            IframeWidget.prototype.getBoxElem = function() {
              return _super.prototype.getBoxElem.call(this)
            }
            IframeWidget.prototype.isLoaded = function() {
              return this.loaded
            }
            IframeWidget.prototype.createNode = function() {
              return document.createElement('iframe')
            }
            IframeWidget.prototype.buildUrl = function() {
              var iframeUrl = this.host + '?clid=' + this.id
              if (this.customerId) {
                iframeUrl += '&cid=' + this.customerId
              }
              if (this.initialElement) {
                iframeUrl += '&init=' + this.initialElement
              }
              if (this.locale) {
                iframeUrl += '&lg=' + this.locale
              }
              return iframeUrl
            }
            IframeWidget.prototype.load = function() {
              var _this = this
              if (this.isRendered() && !this.loaded) {
                this.loaded = true
                this.getBoxElem().src = this.buildUrl()
                this.getBoxElem().addEventListener('load', function() {
                  _this.getBoxElem().contentWindow.postMessage(
                    {
                      actionId: 'setConfig',
                      payload: {
                        theme: 'theme-embed',
                      },
                    },
                    '*'
                  )
                })
              }
            }
            return IframeWidget
          })(_core_base_widget__WEBPACK_IMPORTED_MODULE_0__['BaseWidget'])

          /***/
        },

      /***/ './src/scripts/widgets/index.ts':
        /*!**************************************!*\
  !*** ./src/scripts/widgets/index.ts ***!
  \**************************************/
        /*! exports provided: WrapperWidget, ChatboxWidget, ButtonWidget, IframeWidget, TeaserWidget, UnreadWidget */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony import */ var _wrapper_widget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            /*! ./wrapper-widget */ './src/scripts/widgets/wrapper-widget.ts'
          )
          /* harmony reexport (safe) */ __webpack_require__.d(
            __webpack_exports__,
            'WrapperWidget',
            function() {
              return _wrapper_widget__WEBPACK_IMPORTED_MODULE_0__[
                'WrapperWidget'
              ]
            }
          )

          /* harmony import */ var _chatbox_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
            /*! ./chatbox-widget */ './src/scripts/widgets/chatbox-widget.ts'
          )
          /* harmony reexport (safe) */ __webpack_require__.d(
            __webpack_exports__,
            'ChatboxWidget',
            function() {
              return _chatbox_widget__WEBPACK_IMPORTED_MODULE_1__[
                'ChatboxWidget'
              ]
            }
          )

          /* harmony import */ var _button_widget__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
            /*! ./button-widget */ './src/scripts/widgets/button-widget.ts'
          )
          /* harmony reexport (safe) */ __webpack_require__.d(
            __webpack_exports__,
            'ButtonWidget',
            function() {
              return _button_widget__WEBPACK_IMPORTED_MODULE_2__['ButtonWidget']
            }
          )

          /* harmony import */ var _iframe_widget__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
            /*! ./iframe-widget */ './src/scripts/widgets/iframe-widget.ts'
          )
          /* harmony reexport (safe) */ __webpack_require__.d(
            __webpack_exports__,
            'IframeWidget',
            function() {
              return _iframe_widget__WEBPACK_IMPORTED_MODULE_3__['IframeWidget']
            }
          )

          /* harmony import */ var _teaser_widget__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
            /*! ./teaser-widget */ './src/scripts/widgets/teaser-widget.ts'
          )
          /* harmony reexport (safe) */ __webpack_require__.d(
            __webpack_exports__,
            'TeaserWidget',
            function() {
              return _teaser_widget__WEBPACK_IMPORTED_MODULE_4__['TeaserWidget']
            }
          )

          /* harmony import */ var _unread_widget__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
            /*! ./unread-widget */ './src/scripts/widgets/unread-widget.ts'
          )
          /* harmony reexport (safe) */ __webpack_require__.d(
            __webpack_exports__,
            'UnreadWidget',
            function() {
              return _unread_widget__WEBPACK_IMPORTED_MODULE_5__['UnreadWidget']
            }
          )

          /***/
        },

      /***/ './src/scripts/widgets/teaser-widget.ts':
        /*!**********************************************!*\
  !*** ./src/scripts/widgets/teaser-widget.ts ***!
  \**********************************************/
        /*! exports provided: TeaserWidget */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'TeaserWidget',
            function() {
              return TeaserWidget
            }
          )
          /* harmony import */ var _core_base_widget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            /*! ../core/base-widget */ './src/scripts/core/base-widget.ts'
          )
          /* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
            /*! ../config/config */ './src/scripts/config/config.ts'
          )
          var __extends =
            (undefined && undefined.__extends) ||
            (function() {
              var extendStatics = function(d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(d, b) {
                      d.__proto__ = b
                    }) ||
                  function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]
                  }
                return extendStatics(d, b)
              }
              return function(d, b) {
                extendStatics(d, b)
                function __() {
                  this.constructor = d
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __())
              }
            })()

          var TeaserWidget = /** @class */ (function(_super) {
            __extends(TeaserWidget, _super)
            function TeaserWidget(options) {
              return _super.call(this, options) || this
            }
            TeaserWidget.prototype.getBaseCls = function() {
              return _config_config__WEBPACK_IMPORTED_MODULE_1__['config']
                .teaserCls
            }
            TeaserWidget.prototype.render = function() {
              this.crossElem = this.createNode()
              this.crossElem.classList.add(
                _config_config__WEBPACK_IMPORTED_MODULE_1__['config']
                  .teaserCrossCls
              )
              this.bindEvents()
              this.getBoxElem().appendChild(this.crossElem)
              _super.prototype.render.call(this)
            }
            TeaserWidget.prototype.bindEvents = function() {
              var _this = this
              this.crossElem.addEventListener('click', function() {
                return _this.hide()
              })
            }
            return TeaserWidget
          })(_core_base_widget__WEBPACK_IMPORTED_MODULE_0__['BaseWidget'])

          /***/
        },

      /***/ './src/scripts/widgets/unread-widget.ts':
        /*!**********************************************!*\
  !*** ./src/scripts/widgets/unread-widget.ts ***!
  \**********************************************/
        /*! exports provided: UnreadWidget */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'UnreadWidget',
            function() {
              return UnreadWidget
            }
          )
          /* harmony import */ var _core_base_widget__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            /*! ../core/base-widget */ './src/scripts/core/base-widget.ts'
          )
          /* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
            /*! ../config/config */ './src/scripts/config/config.ts'
          )
          var __extends =
            (undefined && undefined.__extends) ||
            (function() {
              var extendStatics = function(d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(d, b) {
                      d.__proto__ = b
                    }) ||
                  function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]
                  }
                return extendStatics(d, b)
              }
              return function(d, b) {
                extendStatics(d, b)
                function __() {
                  this.constructor = d
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __())
              }
            })()

          var UnreadWidget = /** @class */ (function(_super) {
            __extends(UnreadWidget, _super)
            function UnreadWidget(options) {
              return _super.call(this, options) || this
            }
            UnreadWidget.prototype.getBaseCls = function() {
              return _config_config__WEBPACK_IMPORTED_MODULE_1__['config']
                .unreadCls
            }
            return UnreadWidget
          })(_core_base_widget__WEBPACK_IMPORTED_MODULE_0__['BaseWidget'])

          /***/
        },

      /***/ './src/scripts/widgets/wrapper-widget.ts':
        /*!***********************************************!*\
  !*** ./src/scripts/widgets/wrapper-widget.ts ***!
  \***********************************************/
        /*! exports provided: WrapperWidget */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
          'use strict'
          __webpack_require__.r(__webpack_exports__)
          /* harmony export (binding) */ __webpack_require__.d(
            __webpack_exports__,
            'WrapperWidget',
            function() {
              return WrapperWidget
            }
          )
          /* harmony import */ var _core_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
            /*! ../core/app */ './src/scripts/core/app.ts'
          )
          /* harmony import */ var _core_base_widget__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
            /*! ../core/base-widget */ './src/scripts/core/base-widget.ts'
          )
          /* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
            /*! ../config/config */ './src/scripts/config/config.ts'
          )
          var __extends =
            (undefined && undefined.__extends) ||
            (function() {
              var extendStatics = function(d, b) {
                extendStatics =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function(d, b) {
                      d.__proto__ = b
                    }) ||
                  function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]
                  }
                return extendStatics(d, b)
              }
              return function(d, b) {
                extendStatics(d, b)
                function __() {
                  this.constructor = d
                }
                d.prototype =
                  b === null
                    ? Object.create(b)
                    : ((__.prototype = b.prototype), new __())
              }
            })()

          var WrapperWidget = /** @class */ (function(_super) {
            __extends(WrapperWidget, _super)
            function WrapperWidget(options) {
              return _super.call(this, options) || this
            }
            WrapperWidget.prototype.getBaseCls = function() {
              return _config_config__WEBPACK_IMPORTED_MODULE_2__['config']
                .wrapperCls
            }
            WrapperWidget.prototype.setPosition = function(position) {
              this.position = position
              var boxElem = this.getBoxElem()
              boxElem.classList.remove(
                _config_config__WEBPACK_IMPORTED_MODULE_2__['config']
                  .wrapperPositionLeftCls
              )
              boxElem.classList.remove(
                _config_config__WEBPACK_IMPORTED_MODULE_2__['config']
                  .wrapperPositionRightCls
              )
              boxElem.classList.add(
                position ===
                  _core_app__WEBPACK_IMPORTED_MODULE_0__['ChatPosition'].left
                  ? _config_config__WEBPACK_IMPORTED_MODULE_2__['config']
                      .wrapperPositionLeftCls
                  : _config_config__WEBPACK_IMPORTED_MODULE_2__['config']
                      .wrapperPositionRightCls
              )
            }
            WrapperWidget.prototype.render = function() {
              this.setPosition(this.position)
              _super.prototype.render.call(this)
            }
            return WrapperWidget
          })(_core_base_widget__WEBPACK_IMPORTED_MODULE_1__['BaseWidget'])

          /***/
        },

      /******/
    }
  )
})
//# sourceMappingURL=dialogshift-webchat-sdk.umd.js.map
