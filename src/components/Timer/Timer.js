import { useState, useReducer, useRef, useEffect } from "react";
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
  const [state, dispatch] = useReducer(reducer, {
    isStarted: false,
    isFinished: false,
  });

  const [remaining, setRemaining] = useState(initialRemaining);
  const wasFinished = usePrevious(state.isFinished);
  const intervalIdRef = useRef(null);
  const timeoutIdRef = useRef(null);
  const formattedRemaining = formatTime(remaining);
  let className = "box timer";

  if (isSelected) {
    className += " timer--selected";
  }

  if (state.isFinished) {
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
      if (state.isFinished && !wasFinished) {
        if (isSelected && inDocumentTitle) {
          // document title is sometimes off on finish, so set it manually
          document.title = "0:00";
        }

        onFinish(label);
      }
    },
    [
      state.isFinished,
      wasFinished,
      isSelected,
      inDocumentTitle,
      onFinish,
      label,
    ]
  );

  useEffect(
    function clearOnStop() {
      if (!state.isStarted) {
        clearInterval(intervalIdRef.current);
        clearTimeout(timeoutIdRef.current);
      }
    },
    [state.isStarted]
  );

  useEffect(function clearOnUnmount() {
    return () => {
      clearInterval(intervalIdRef.current);
      clearTimeout(timeoutIdRef.current);
    };
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
      dispatch({ type: "finish" });
    }, remaining * 1000);

    dispatch({ type: "start" });
  }

  function stop() {
    dispatch({ type: "stop" });
  }

  function reset() {
    dispatch({ type: "reset" });
    setRemaining(initialRemaining);
  }

  function remove() {
    appDispatch({ type: "remove_timer", payload: id });
  }

  function tick() {
    setRemaining((remaining) => remaining - 1);
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
        {state.isFinished ? "Finished" : formattedRemaining}
      </div>

      {!state.isFinished && (
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
          isResetDisabled={remaining === initialRemaining}
          onStartClick={start}
          onStopClick={stop}
          onResetClick={reset}
          onRemoveClick={remove}
        />
      )}
    </div>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "reset":
      return INITIAL_STATE;

    case "start":
      return {
        ...state,
        isStarted: true,
      };

    case "stop":
      return {
        ...state,
        isStarted: false,
      };

    case "finish":
      return {
        isStarted: false,
        isFinished: true,
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

const INITIAL_STATE = {
  isStarted: false,
  isFinished: false,
};

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

export default Timer;
