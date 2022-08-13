import { useState, useEffect } from 'react';

export function useTimer(initialValue, stopValue) {
  const [seconds, setSeconds] = useState(initialValue);

  useEffect(() => {
    let timerId = null;
    if (!stopValue) {
      timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    }

    return () => clearInterval(timerId);
  }, [stopValue]);
  return seconds;
}
