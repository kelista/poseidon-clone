import React, { useState, useCallback, useEffect } from 'react';

export function useTimer(): [number, boolean, (v: number) => void] {
  const [time, setTime] = useState(0);

  const [isCounting, setIsCounting] = useState(false);
  const [theInterval, setTheInterval] = useState<any>(null);

  const startTimer = useCallback((time: number) => {
    if (isCounting) {
      clearInterval(theInterval);
      setTheInterval(null);
    }
    setTime(time);
    setIsCounting(true);
    setTheInterval(setInterval(() => {
      setTime(c => c - 1);
    }, 1000));
  }, [isCounting]);

  useEffect(() => {
    if (time === 0) {
      clearInterval(theInterval);
      setTheInterval(null);
      setIsCounting(false);
    }
  }, [time]);

  return [time, isCounting, startTimer];
}