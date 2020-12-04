import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import './Tracker.scss';

export const Tracker = React.memo(({
  tracker,
  updateTracker,
  deleteTracker,
}) => {
  const trackerPlayToggel = useCallback(() => {
    updateTracker(tracker.id, { isTimerOn: !tracker.isTimerOn });
  }, [updateTracker]);

  useEffect(() => {
    const timex = setTimeout(() => startTimer(), 1000);

    if (!tracker.isTimerOn) {
      clearInterval(timex);
    }
  }, [tracker, tracker.isTimerOn]);

  const startTimer = useCallback(() => {
    let {
      hours,
      mins,
      seconds,
    } = tracker.time;

    seconds = +seconds + 1;
    mins = +mins;
    hours = +hours;

    if (seconds > 59) {
      seconds = 0;
      mins += 1;
    }

    if (mins > 59) {
      mins = 0;
      hours += 1;
    }

    seconds = seconds < 10 ? `0${seconds}` : seconds.toString();
    mins = mins < 10 ? `0${mins}` : mins.toString();
    hours = hours < 10 ? `0${hours}` : hours.toString();

    updateTracker(tracker.id, {
      time: {
        hours,
        mins,
        seconds,
      },
    });
  }, [tracker, setTimeout, updateTracker]);

  return (
    <div className={classNames('tracker-item', {
      'tracker-item--active': tracker.isTimerOn,
    })}
    >
      <p className="tracker-item__name">{tracker.name}</p>
      <div className="tracker-item__time-controlers">
        <span className="tracker-item__time">
          {Object.values(tracker.time).join(':')}
        </span>

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
            {tracker.isTimerOn
              ? <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              : <path d="M8 5v14l11-7z" />
            }
          </svg>
        </button>

        <button
          type="button"
          className="tracker-item__button tracker-item__button--dangerous"
          onClick={useCallback(() => {
            deleteTracker(tracker.id);
          }, [deleteTracker, tracker])}
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
});
