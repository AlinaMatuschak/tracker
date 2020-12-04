import React, { useCallback, useEffect, useState } from 'react';
import shortid from 'shortid';
import './App.scss';
import { Form } from './components/Form/Form';
import { TrackerList } from './components/TrackerList/TrackerList';
import { getSeconds } from './helpers/getSeconds';
import { parseTime } from './helpers/parseTime';

export const App = React.memo(() => {
  const [trackers, setTackers] = useState([]);

  useEffect(() => {
    const trackersFromLocalStorage = localStorage.getItem('trackers');
    const secondsFromLocalStorage = localStorage.getItem('seconds');

    if (trackersFromLocalStorage && secondsFromLocalStorage) {
      const parsedTrackers = JSON.parse(trackersFromLocalStorage);
      const differenceSeconds = getSeconds() - +secondsFromLocalStorage;

      const updatedTrackers = parsedTrackers.map((tracker) => {
        const { hours, mins, seconds } = tracker.time;
        const timeInSeconds = (hours * 3600) + (mins * 60) + +seconds;

        return {
          ...tracker,
          time: parseTime(timeInSeconds + differenceSeconds),
        };
      });

      setTackers(updatedTrackers);
    }

    // return () => {
    //   localStorage.setItem('trackers', JSON.stringify(trackers));
    //   localStorage.setItem('seconds', getSeconds());
    // };
  }, []);

  useEffect(() => {
    localStorage.setItem('trackers', JSON.stringify(trackers));
    localStorage.setItem('seconds', getSeconds());
  }, [trackers]);

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
      },
      ...currentTrackers,
    ]));
  }, [setTackers, shortid]);

  const updateTracker = useCallback((trackerId, trackerTime) => {
    setTackers(currentTrackers => currentTrackers
      .map(tracker => (tracker.id === trackerId
        ? {
          ...tracker, time: trackerTime,
        }
        : tracker)),
    [setTackers, localStorage]);
  });

  const deleteTracker = useCallback((trackerId) => {
    setTackers(currentTrackers => currentTrackers
      .filter(tracker => tracker.id !== trackerId));
  }, [setTackers]);

  return (
    <section className="tracker">
      <h1 className="tracker__title">tracker</h1>
      <Form onSubmit={addTracker} />
      <TrackerList
        trackers={trackers}
        updateTracker={updateTracker}
        deleteTracker={deleteTracker}
      />
    </section>
  );
});
