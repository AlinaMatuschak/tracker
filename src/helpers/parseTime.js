export const parseTime = (sec) => {
  let secondsToParse = sec;
  let hours = 0;
  let mins = 0;
  let seconds = 0;

  if (secondsToParse >= 3600) {
    hours = Math.floor(secondsToParse / 3600);
    secondsToParse -= hours * 3600;
  }

  if (secondsToParse >= 60) {
    mins = Math.floor(secondsToParse / 60);
    secondsToParse -= mins * 60;
  }

  seconds = secondsToParse % 60;

  seconds = seconds < 10 ? `0${seconds}` : seconds.toString();
  mins = mins < 10 ? `0${mins}` : mins.toString();
  hours = hours < 10 ? `0${hours}` : hours.toString();

  return {
    hours,
    mins,
    seconds,
  };
};
