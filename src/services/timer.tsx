import React, { useState, useCallback, useEffect } from "react";

class Timer {
  isCounting: boolean = false;
  time: number = 0;
  interval: any;

  start(time: number, onTick: (time: number, isCounting: boolean) => any) {
    if (this.isCounting) {
      clearInterval(this.interval);
    }
    this.isCounting = true;
    this.time = time;
    this.interval = setInterval(() => {
      if (this.time <= 0) {
        this.isCounting = false;
        console.log("stopped");
        clearInterval(this.interval);
      } else {
        this.time = this.time - 1;
      }
      onTick(this.time, this.isCounting);
    }, 1000);
    onTick(time, this.isCounting);
  }
}

export function useTimer(): [number, boolean, (v: number) => void] {
  const [time, setTime] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [timer, setTimer] = useState(new Timer());

  const onTick = useCallback((time: number, isCounting: boolean) => {
    setTime(time);
    setIsCounting(isCounting);
  }, []);

  return [time, isCounting, (time: number) => timer.start(time, onTick)];
}