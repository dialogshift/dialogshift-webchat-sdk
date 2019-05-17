import { environment } from './env'

export const config = {
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

  env: environment,
}
