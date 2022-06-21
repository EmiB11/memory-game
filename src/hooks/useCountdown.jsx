import { useEffect, useState ,useContext} from 'react';
import { StoreContext } from '../store/storeProvider';
const calcTimeLeft = t => {
  if (!t) return 0;

  const left = t - new Date().getTime();

  if (left < 0) return 0;

  return left;
};

export default function useCountdown(endTime,remainingPairs) {
  const [end, setEndTime] = useState(endTime);
  const [timeLeft, setTimeLeft] = useState(() => calcTimeLeft(end));
  const [store , dispatch] = useContext(StoreContext)
  useEffect(() => {
    setTimeLeft(calcTimeLeft(end));

    const timer = setInterval(() => {
      const targetLeft = calcTimeLeft(end);
      setTimeLeft(targetLeft);
     
       dispatch({type: 'timer' , payload:targetLeft})
      if (targetLeft === 0 || remainingPairs === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [end ,remainingPairs]);

  return [timeLeft, setEndTime];
}