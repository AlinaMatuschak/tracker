import React, { useCallback, useEffect } from 'react';
import classNames from 'classnames';
import './Tracker-item.scss';
import { getSeconds } from '../../helpers/getSeconds';
import { parseTime } from '../../helpers/parseTime';

export const Tracker = React.memo(({
  tracker,
  updateTracker,
  deleteTracker,
}) => {
  const startTimer = useCallback(() => {
    updateTracker(tracker.id, {
      time: parseTime(getSeconds() - tracker.dataSeconds),
    });
  }, [tracker, updateTracker, parseTime, getSeconds]);

  useEffect(() => {
    const timex = setTimeout(() => {
      startTimer();
    }, 500);

    if (!tracker.isTimerOn) {
      clearInterval(timex);
    }
  }, [tracker.isTimerOn, setTimeout, clearInterval, startTimer]);

  const trackerPlayToggel = useCallback(() => {
    if (tracker.isTimerOn) {
      updateTracker(tracker.id, {
        isTimerOn: !tracker.isTimerOn,
        timeOutStart: getSeconds(),
      });
    } else {
      const timeOut = getSeconds() - tracker.timeOutStart;

      updateTracker(tracker.id, {
        isTimerOn: !tracker.isTimerOn,
        dataSeconds: tracker.dataSeconds + timeOut,
        timeOutStart: null,
      });
    }
  }, [updateTracker, tracker, getSeconds]);

  const handelDeleteTracker = useCallback(() => {
    deleteTracker(tracker.id);
  }, [deleteTracker, tracker]);

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
          onClick={handelDeleteTracker}
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
