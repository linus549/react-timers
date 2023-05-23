import { useState, useRef, useEffect } from "react";
import usePrevious from "hooks/usePrevious";
import Buttons from "components/Timer/Buttons";

function Timer({
  id,
  label,
  seconds: initialRemaining,
  isSelected,
  isVisible,
  inDocumentTitle,
  onFinish,
  appDispatch,
}) {
  const [remaining, setRemaining] = useState(initialRemaining);
  const [state, setState] = useState(states.RESET);
  const isFinished = state === states.FINISHED;
  const wasFinished = usePrevious(isFinished);
  const intervalIdRef = useRef(null);
  const timeoutIdRef = useRef(null);
  const formattedRemaining = formatTime(remaining);
  let className = "box timer";

  if (isSelected) {
    className += " timer--selected";
  }

  if (isFinished) {
    className += " timer--finished";
  }

  useEffect(
    function updateDocumentTitle() {
      if (isSelected && inDocumentTitle) {
        document.title = formattedRemaining;
      }
    },
    [isSelected, inDocumentTitle, formattedRemaining]
  );

  useEffect(
    function finish() {
      if (isFinished && !wasFinished) {
        if (isSelected && inDocumentTitle) {
          // document title is sometimes off on finish, so set it manually
          document.title = "0:00";
        }

        onFinish(label);
      }
    },
    [isFinished, wasFinished, isSelected, inDocumentTitle, onFinish, label]
  );

  useEffect(function clearOnUnmount() {
    return clear;
  }, []);

  function handleTimerClick(e) {
    if (e.target.nodeName !== "BUTTON") {
      appDispatch({ type: "select_timer", payload: id });
    }
  }

  function handleKeyDown(e) {
    if (e.target === e.currentTarget) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleTimerClick(e);
      }
    }
  }

  function start() {
    intervalIdRef.current = setInterval(tick, 1000);

    timeoutIdRef.current = setTimeout(() => {
      tick();
      finish();
    }, remaining * 1000);

    setState(states.STARTED);
  }

  function stop() {
    clear();
    setState(states.STOPPED);
  }

  function finish() {
    clear();
    setState(states.FINISHED);
  }

  function reset() {
    clear();
    setRemaining(initialRemaining);
    setState(states.RESET);
  }

  function remove() {
    appDispatch({ type: "remove_timer", payload: id });
  }

  function tick() {
    setRemaining((remaining) => remaining - 1);
  }

  function clear() {
    clearInterval(intervalIdRef.current);
    clearTimeout(timeoutIdRef.current);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={className}
      tabIndex={isSelected ? undefined : "0"}
      onClick={handleTimerClick}
      onKeyDown={handleKeyDown}
    >
      <h2 className="timer__title">{label}</h2>

      <div className="timer__time">
        {isFinished ? "Finished" : formattedRemaining}
      </div>

      {!isFinished && (
        <meter
          min="0"
          max={initialRemaining}
          value={remaining}
          className="timer__meter"
        />
      )}

      {isSelected && (
        <Buttons
          timerState={state}
          onStartClick={start}
          onStopClick={stop}
          onResetClick={reset}
          onRemoveClick={remove}
        />
      )}
    </div>
  );
}

function formatTime(totalSeconds) {
  let { hours, minutes, seconds } = toHourMinSec(totalSeconds);
  let result = "";

  if (hours > 0) {
    result += hours + ":";
    minutes = String(minutes).padStart(2, "0");
  }

  result += minutes + ":";
  result += String(seconds).padStart(2, "0");

  return result;
}

function toHourMinSec(seconds) {
  let remainder = seconds;
  const hours = Math.trunc(remainder / 3600);
  remainder -= hours * 3600;
  const minutes = Math.trunc(remainder / 60);
  remainder -= minutes * 60;

  return {
    hours,
    minutes,
    seconds: remainder,
  };
}

export const states = {
  STARTED: "started",
  STOPPED: "stopped",
  FINISHED: "finished",
  RESET: "reset",
};

export default Timer;
