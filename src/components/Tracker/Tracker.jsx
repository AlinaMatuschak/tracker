import React, { useCallback, useState } from 'react';
import './Tracker.scss';

export const Tracker = ({ tracker }) => {
  const [isTrackerOn, setIsTrackerOn] = useState(true);

  const trackerPlayToggel = useCallback(() => {
    setIsTrackerOn(curIsTrackerOn => !curIsTrackerOn);
  }, [setIsTrackerOn]);

  return (
    <div>
      <p>{tracker.name}</p>
      <div>
        <span>{tracker.time}</span>

        <button
          type="button"
          onClick={trackerPlayToggel}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            {isTrackerOn
              ? <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              : <path d="M8 5v14l11-7z" />}
          </svg>
        </button>

        <button
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            enableBackground="new 0 0 24 24"
            height="24"
            viewBox="0 0 24 24"
            width="24"
          >
            <g>
              <rect fill="none" fillRule="evenodd" height="24" width="24" />
              <rect fillRule="evenodd" height="2" width="16" x="4" y="11" />
            </g>
          </svg>
        </button>
      </div>
    </div>
  );
};
