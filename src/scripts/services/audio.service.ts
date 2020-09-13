export enum AudioSound {
  cartoon = 'cartoon',
}

const soundConfig = {
  cartoon:
    'https://audio-previews.elements.envatousercontent.com/files/82806506/preview.mp3',
  game:
    'https://audio-previews.elements.envatousercontent.com/files/149231951/preview.mp3',
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
