import React from 'react';
import { Tracker } from '../Tracker';
import './TrackerList.scss';

export const TrackerList = ({ trackers }) => (
  <ul>
    {trackers.map(tracker => (
      <li key={tracker.id}>
        <Tracker tracker={tracker} />
      </li>
    ))}
  </ul>
);
