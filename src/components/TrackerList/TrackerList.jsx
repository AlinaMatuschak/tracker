import React from 'react';
import { Tracker } from '../Tracker-item';
import './TrackerList.scss';

export const TrackerList = React.memo(({
  trackers,
  updateTracker,
  deleteTracker,
}) => (
  <ul className="list">
    {trackers.map(tracker => (
      <li key={tracker.id} className="list__item">
        <Tracker
          tracker={tracker}
          updateTracker={updateTracker}
          deleteTracker={deleteTracker}
        />
      </li>
    ))}
  </ul>
));
