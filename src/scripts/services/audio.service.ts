export enum AudioSound {
  appear = 'appear',
}

const soundConfig = {
  appear: 'https://assets.dialogshift.com/sounds/appear.mp3',
}

export class AudioService {
  static playSound(name: AudioSound) {
    const url = soundConfig[name]
    const audio = new Audio(url)

    try {
      audio.play()
    } catch (e) {}
  }
}
