import React, { useEffect, useState, useRef } from 'react';
import './clock.scss';

const Clock = ({hourDiff}) => {
  const [hour, setHour] = useState('00');
  const [min, setMin] = useState('00');
  const [sec, setSec] = useState('00');
  const [amPm, setAmPm] = useState('AM');
  let intervalIDRef = useRef();

  useEffect(() => {
    if (intervalIDRef.current) {
      clearInterval(intervalIDRef.current);
    }

    const getHours = (h) => {
      h = h + hourDiff;

      // If time is over 24 hours, its a day ahead.
      // So minus 24 hours.
      if (h > 24) {
        h = h - 24;
      }

      //convert to 12 hour time base
      if (h >= 12) {
        h = h % 12;
        ampm = 'PM';
      } else {
        if (h === 0) {
          h = 12;
        }

        ampm = 'AM';
      }

      return h;
    }

    const printNumber = (num) => num < 10 ? `0${num}` : `${num}`;

    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = '';

    setHour(printNumber(getHours(h)));
    setMin(printNumber(m));
    setSec(printNumber(s));
    setAmPm(ampm);

    intervalIDRef.current = setInterval(() => {
      // Get date and update again per second
      date = new Date();
      h = date.getHours();
      m = date.getMinutes();
      s = date.getSeconds();

      setHour(printNumber(getHours(h)));
      setMin(printNumber(m));
      setSec(printNumber(s));
      setAmPm(ampm);
    }, 1000);

    return () => clearInterval(intervalIDRef.current);
  }, [hourDiff]);

  return (
    <ul className="clock">
      <li className="clock-hour">{`${hour}:`}</li>
      <li className="clock-minutes">{min}</li>
      <li className="clock-seconds">{sec}</li>
      <li className="clock-ampm">{amPm}</li>
    </ul>
  );
}

export default Clock;
