import React, { useState } from 'react';
import shortid from 'shortid';
import './App.scss';
import { Form } from './components/Form/Form';
import { TrackerList } from './components/TrackerList/TrackerList';

export const App = () => {
  const [trackers, setTtackers] = useState([]);

  const addTracker = (trackerName) => {
    setTtackers(currentTrackers => ([
      {
        id: shortid.generate(),
        name: trackerName,
        time: '00:00:00',
      },
      ...currentTrackers,
    ]));
  };

  return (
    <section className="tracker">
      <h1 className="tracker__title">tracker</h1>
      <Form onSubmit={addTracker} />
      <TrackerList trackers={trackers} />
    </section>
  );
};
