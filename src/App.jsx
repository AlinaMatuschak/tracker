import React, { useCallback, useEffect, useState } from 'react';
import shortid from 'shortid';
import { useBeforeunload } from 'react-beforeunload';

import './App.scss';
import { Form } from './components/Form/Form';
import { TrackerList } from './components/TrackerList';
import { getSeconds } from './helpers/getSeconds';
import { parseTime } from './helpers/parseTime';
import { saveDataToLocalStorage } from './helpers/saveDataToLocalStorage';

export const App = React.memo(() => {
  const [trackers, setTackers] = useState([]);

  useEffect(() => {
    const trackersFromLocalStorage = localStorage.getItem('trackers');
    const parsedTrackers = trackersFromLocalStorage ? JSON.parse(trackersFromLocalStorage) : [];

    const updatedTrackers = parsedTrackers.map(tracker => (tracker.isTimerOn
      ? ({
        ...tracker,
        time: parseTime(getSeconds() - tracker.dataSeconds),
      })
      : tracker));

    setTackers(updatedTrackers);
  }, []);

  useBeforeunload((event) => {
    event.preventDefault();
    saveDataToLocalStorage('trackers', trackers);
  });

  const addTracker = useCallback((trackerName) => {
    setTackers(currentTrackers => ([
      {
        id: shortid.generate(),
        name: trackerName,
        time: {
          hours: '00',
          mins: '00',
          seconds: '00',
        },
        dataSeconds: getSeconds(),
        timeOutStart: null,
        isTimerOn: true,
      },
      ...currentTrackers,
    ]));
  }, [setTackers, shortid, getSeconds]);

  const updateTracker = useCallback((trackerId, renewal) => {
    setTackers(currentTrackers => currentTrackers
      .map(tracker => (tracker.id === trackerId
        ? {
          ...tracker,
          ...renewal,
        }
        : tracker)),
    [setTackers]);
  });

  const deleteTracker = useCallback((trackerId) => {
    setTackers(currentTrackers => currentTrackers
      .filter(tracker => tracker.id !== trackerId));
  }, [setTackers]);

  return (
    <section className="tracker">
      <h1 className="tracker__title">tracker</h1>
      <div className="tracker__content">
        <Form onSubmit={addTracker} />

        <TrackerList
          trackers={trackers}
          updateTracker={updateTracker}
          deleteTracker={deleteTracker}
        />
      </div>
    </section>
  );
});
