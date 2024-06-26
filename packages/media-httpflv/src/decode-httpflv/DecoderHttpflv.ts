import FlvJs from 'flv.js'

// 解码httpflv
export class DecoderHttpflv {
  public container: HTMLVideoElement | undefined = undefined
  public room: string | undefined = undefined
  public url: string | undefined = undefined
  public player: FlvJs.Player | null = null

  public static isSupported() {
    return FlvJs.isSupported()
  }

  constructor(room: string, container: HTMLVideoElement | undefined = undefined) {
    this.initPlayer(room, container)
    console.log('Decode url', this.url)
  }

  public initPlayer(room: string, container: HTMLVideoElement | undefined = undefined) {
    if (room) {
      this.room = room
      this.url = `http://localhost:8080/live/${room}.flv`
      this.player = FlvJs.createPlayer({
        type: 'flv',
        url: this.url
      })
    }
    if (container) {
      this.setContainer(container)
    }
  }

  public setContainer(container: HTMLVideoElement): void {
    this.container = container
  }

  public attachMediaElement() {
    if (this.container && this.player) {
      console.log('attachMediaElement DecoderHttpflv', JSON.stringify(this.container))
      this.player.attachMediaElement(this.container)
    }
  }

  public loadAndPlay() {
    this.attachMediaElement()
    this.player?.load()
    this.player?.play()
  }

  public detachMediaElement() {
    this.player?.detachMediaElement()
    this.player?.unload()
  }

  public destroy() {
    this.detachMediaElement()
    this.player?.destroy()
  }
}
