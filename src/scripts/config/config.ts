import { environment } from './env'

export const config = {
  widgetBase: 'ds-widget',
  widgetBaseFx: 'ds-widget--fx',
  widgetBaseVisible: 'ds-widget--visible',

  wrapperCls: 'ds-wrapper',
  wrapperNoButtonCls: 'ds-wrapper--no-button',
  wrapperTeaserIsOpenCls: 'ds-wrapper--teaser-opened',
  wrapperPositionLeftCls: 'ds-wrapper--pl',
  wrapperPositionRightCls: 'ds-wrapper--pr',
  wrapperDirectionRtlCls: 'ds-wrapper--rtl',

  contentWrapperCls: 'ds-content-wrapper',

  buttonCls: 'ds-button',
  buttonLogoCls: 'ds-button--logo',
  buttonIconContainerCls: 'ds-button--icon-container',
  buttonWithTextCls: 'ds-button--with-text',
  buttonActiveCls: 'ds-button--active',
  buttonHiddenCls: 'ds-button--hidden',

  chatCls: 'ds-chat',
  chatLoaderCls: 'ds-chat-loader',
  chatLoaderImageCls: 'ds-chat-loader-image',
  chatLoadingCls: 'ds-chat--loading',
  chatIsOpen: 'ds-chat--opened',
  chatHasExtendedWidth: 'ds-chat--extended-width',

  iframeCls: 'ds-iframe',

  teaserCls: 'ds-teaser',
  teaserCrossCls: 'ds-teaser__cross',
  teaserTextCls: 'ds-teaser__text',

  unreadCls: 'ds-unread',

  themeRound: 'ds-theme-round',
  themeTile: 'ds-theme-tile',

  actionButtonGroupCls: 'ds-action-button-group',

  actionButtonCls: 'ds-action-button',

  headerCls: 'ds-header',

  headerCloseButtonCls: 'ds-header-close-button',

  env: environment,
}
