import React from 'react'
import useCountdown from '../hooks/useCountdown';
function Timer({remainingPairs}) {
  const endTime = new Date().getTime() + 60000 * 2; // 2 minutes
  const [timeLeft, setEndTime] = useCountdown(endTime,remainingPairs);

  const minutes = Math.floor(timeLeft / 60000) % 60;
  const seconds = Math.floor(timeLeft / 1000) % 60;
  
return (
    <div className="timer">You have{" "}{" "}{`${'0' + minutes }:${seconds <= 9 ? '0' + seconds : seconds}`} {minutes === 0 ? 'seconds' : 'minutes'}</div>
  )
}

export default Timer