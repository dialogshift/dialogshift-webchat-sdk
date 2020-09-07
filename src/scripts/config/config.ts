import { environment } from './env'

export const config = {
  wrapperCls: 'ds-wrapper',
  wrapperNoButtonCls: 'ds-wrapper--no-button',
  wrapperTeaserIsOpenCls: 'ds-wrapper--teaser-opened',
  wrapperPositionLeftCls: 'ds-wrapper--pl',
  wrapperPositionRightCls: 'ds-wrapper--pr',
  wrapperDirectionRtlCls: 'ds-wrapper--rtl',

  buttonCls: 'ds-button',
  buttonLogoCls: 'ds-button--logo',
  buttonWithTextCls: 'ds-button--with-text',
  buttonActiveCls: 'ds-button--active',
  buttonFxCls: 'ds-button--fx',
  buttonVisibleCls: 'ds-button--visible',

  chatCls: 'ds-chat',
  chatLoadingCls: 'ds-chat--loading',
  chatIsOpen: 'ds-chat--opened',

  iframeCls: 'ds-iframe',

  teaserCls: 'ds-teaser',
  teaserCrossCls: 'ds-teaser__cross',
  teaserTextCls: 'ds-teaser__text',

  unreadCls: 'ds-unread',

  themeRound: 'ds-theme-round',
  themeTile: 'ds-theme-tile',

  actionButtonGroupCls: 'ds-action-button-group',

  actionButtonCls: 'ds-action-button',

  env: environment,
}
