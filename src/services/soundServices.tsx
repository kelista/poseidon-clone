import { Audio } from "expo-av";

export class Backsound {
  private audio: Audio.Sound;

  private constructor( 
      public readonly name: string
    ) {
    this.audio = new Audio.Sound();
    this.name = name;
  }

  public async setLoop( loop: boolean =true) {
    await this.audio.setIsLoopingAsync(loop);
  }

  /**
   * start audio
   */
  public async start() {
    await this.audio.playAsync();
  }

  public async stop() {
    await this.audio.stopAsync();
  }

  public async pause() {
    await this.audio.pauseAsync();
  }

  /**
   * create and load sound
   */
  static async Factory( name: string,src: any) {
    const newSound = new Backsound(name);
    await newSound.audio.loadAsync(src);
    await newSound.setLoop();
    return newSound;
  }
}

async function contoh() {
  // nanti cara pake nya gini vin

  const bs = await Backsound.Factory("mainsound","file.mp3");

  await bs.start();
}