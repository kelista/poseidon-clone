import { Audio } from "expo-av";

export class Backsound {
  private audio: Audio.Sound;

  private constructor( 
      public readonly name: string,
      public status: string
    ) {
    this.audio = new Audio.Sound();
    this.status = status
    this.name = name;
  }

  public async setLoop( loop: boolean =true) {
    await this.audio.setIsLoopingAsync(loop);
  }

  /**
   * start audio
   */
  public async start() {
    this.setStatus("play")
    await this.audio.playAsync();
  }

  public async stop() {
    this.setStatus("stop")
    await this.audio.stopAsync();
  }

  public async pause() {
    this.setStatus("pause")
    await this.audio.pauseAsync();
  }

  public getStatus() {
    return this.status
  }

  public setStatus(stat: string) {
    this.status = stat
  }

  /**
   * create and load sound
   */
  static async Factory( name: string, src: any) {
    const newSound = new Backsound(name);
    await newSound.audio.loadAsync(src);
    await newSound.setLoop();
    return newSound;
  }
}