import React, { useEffect, useState } from 'react';
import './clock.scss';

const Clock = ({hourDiff}) => {
  const [hour, setHour] = useState('00');
  const [min, setMin] = useState('00');
  const [sec, setSec] = useState('00');
  const [amPm, setAmPm] = useState('AM');
  let intervalID = null;

  useEffect(() => {
    if (intervalID) {
      clearInterval(intervalID);
    }

    const getHours = (h) => {
      h = h + hourDiff;

      if (h >= 12) {
        if (h < 24) {
          ampm = 'PM';
        } else {
          ampm = 'AM';
        }
        h = h % 12;
      } else {
        ampm = 'AM';
      }

      if (h === 0) {
        h = 12;
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

    intervalID = setInterval(() => {
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

    return () => clearInterval(intervalID);
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
