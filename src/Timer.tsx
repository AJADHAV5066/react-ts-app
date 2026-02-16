import React, { useState, useEffect } from 'react';
import styles from './Timer.module.scss';

const Timer: React.FC = () => {
  const [time, setTime] = useState(100);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);

  const start = () => {
    setIsRunning(true);
    const id = setInterval(() => {
      setTime(prev => prev - 1);
    }, 1000);
    setIntervalId(id);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setTime(10);
    setIsRunning(false);
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    if (time === 0) {
      setIsRunning(false);
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }

      const timerDisplay = document.getElementById('timer-display');
      if (timerDisplay) {
        timerDisplay.style.color = 'green';
      }
    }
  }, [time, intervalId]);

  return (
    <div className={styles.timer}>
      <h2 id="timer-display" className={styles.display}>Timer: {time}</h2>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};

export default Timer;