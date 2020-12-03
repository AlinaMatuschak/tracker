import React from 'react';
import { Tracker } from '../Tracker';
import './TrackerList.scss';

export const TrackerList = ({ trackers }) => (
  <ul className="list">
    {trackers.map(tracker => (
      <li key={tracker.id} className="list__item">
        <Tracker tracker={tracker} />
      </li>
    ))}
  </ul>
);
