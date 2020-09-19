const animationFlow = {
  button: {
    entrance: 'scaleIn', // basic, fadeIn, fadeInBottom, scaleIn
    bounceBeforeTeaser: true,
    bounceTiming: 1,
  },
  unreadCounter: {
    entrance: 'scaleIn',
  },
  teaser: {
    entrance: 'fadeInBottom',
  },
}

const teaser = {
  showAfter: 1,
  hideAfter: 5000,
  showOnce: true,
  text: {
    en:
      'EN Lorem ipsum dolor sit amet, consectetur adipiscing elit en<br>last line',
    de:
      'DE Lorem ipsum dolor sit amet, consectetur adipiscing elit de<br>last line',
  },
  textShort: {
    en: 'EN short teaser',
    de: 'DE short teaser',
  },
  effects: {
    entrance: 'scaleIn',
  },
}
