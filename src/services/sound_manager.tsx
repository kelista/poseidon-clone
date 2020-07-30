import { Audio } from 'expo-av'

const backsound = new Audio.Sound()

export const initBacksound = async () => {
  try {
    await backsound.loadAsync(require('../assets/guitar.mp3'))
  } catch (error) {
    console.log(error);
  }
}

export const playBacksound = async () => {
  try {
    await backsound.playAsync()
    console.log("bla")
  } catch (error) {
    console.log(error)
  }
}

export const stopBacksound = async () => {
  try {
    await backsound.stopAsync()
  } catch (error) {
    console.log(error)
  }
}