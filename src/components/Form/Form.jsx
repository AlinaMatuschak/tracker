import React, { useCallback, useState } from 'react';
import './Form.scss';

export const Form = React.memo(({ onSubmit }) => {
  const [trackerName, setTrackerName] = useState('');

  const changeTrackerName = useCallback(({ target }) => {
    setTrackerName(target.value);
  }, [setTrackerName]);

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    trackerName.length
      ? onSubmit(trackerName)
      : onSubmit((new Date()).toLocaleDateString());

    setTrackerName('');
  }, [trackerName, onSubmit]);

  const handleKeyDown = useCallback((event) => {
    if (event.key !== 'Enter') {
      return;
    }

    handleSubmit(event);
  });

  return (
    <form
      className="form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="form__input"
        placeholder="Enter tracker name"
        value={trackerName}
        onChange={changeTrackerName}
        onKeyDown={handleKeyDown}
      />
      <button
        type="submit"
        className="form__button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="form__start-icon"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M8 5v14l11-7z" />
        </svg>
      </button>
    </form>
  );
});
