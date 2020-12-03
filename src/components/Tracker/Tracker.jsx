import React, { useCallback, useState } from 'react';
import './Tracker.scss';

export const Tracker = ({ tracker }) => {
  const [isTrackerOn, setIsTrackerOn] = useState(true);

  const trackerPlayToggel = useCallback(() => {
    setIsTrackerOn(curIsTrackerOn => !curIsTrackerOn);
  }, [setIsTrackerOn]);

  return (
    <div className="tracker-item">
      <p className="tracker-item__name">{tracker.name}</p>
      <div className="tracker-item__time-controlers">
        <span className="tracker-item__time">{tracker.time}</span>

        <button
          type="button"
          className="tracker-item__button"
          onClick={trackerPlayToggel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="tracker-item__svg"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            {isTrackerOn
              ? <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              : <path d="M8 5v14l11-7z" />}
          </svg>
        </button>

        <button
          type="button"
          className="tracker-item__button tracker-item__button--dangerous"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            viewBox="0 0 24 24"
            className="tracker-item__svg"
          >
            <g>
              <rect fill="none" fillRule="evenodd" height="24" width="24" />
              <rect fillRule="evenodd" height="3" width="16" x="4" y="11" />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};
