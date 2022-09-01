import React, { useEffect, useState } from 'react';
import './clock.scss';

const Clock = ({hourDiff}) => {
  const [hour, setHour] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');
  const [amPm, setAmPm] = useState('');

  useEffect(() => {
    setInterval(() => {
      const date = new Date();
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();
      let ampm = '';

      if (h >= 12) {
        h = h - 12;
        ampm = 'PM';
      } else {
        ampm = 'AM';
      }

      if (h === 0) {
        h = 12;
      }

      const printNumber = (num) => {
        return num < 10 ? `0${num}` : `${num}`;
      };

      setHour(printNumber(h));
      setMin(printNumber(m));
      setSec(printNumber(s));
      setAmPm(ampm);
    }, 1000);
  }, []);

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