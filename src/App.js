import Nav from './components/Navbar';
import Navigation from './static/navigation';
import React from 'react';

import Clock from './components/Clock';

const { useState } = React;


const App = () => {
  const [hourDiff, setHourDiff] = useState(0);

  return (
    <>
      <nav role="navigation">
        <Nav
            items={Navigation.cities}
            onSelectedItem={(item) => {
              const localUTC = new Date().getHours() - new Date().getUTCHours();
              const targetUTC = Navigation.cities.filter((c) => c.section === item.section)[0].utc;
              setHourDiff(targetUTC - localUTC);
            }}
        />
      </nav>
      <Clock hourDiff={hourDiff}/>
    </>
  )
}

export default App
