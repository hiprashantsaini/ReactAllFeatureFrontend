import moment from "moment";
import { useEffect, useState } from "react";

const CountdownTimer = ({ startTime, duration = 10 * 60 * 1000 }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!startTime) return;

    const updateTimer = () => {
      const endTime = moment(startTime).valueOf() + duration;
      const remaining = Math.max(0, endTime - Date.now());

      setTimeLeft(remaining);
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [startTime, duration]);

  if (!startTime) return null;

  const minutes = Math.floor(timeLeft / 1000 / 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  if (timeLeft <= 0) {
    return <span>Expired</span>;
  }

  return (
    <span className="font-mono text-sm font-semibold ml-2">
      {String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </span>
  );
};

export default CountdownTimer;