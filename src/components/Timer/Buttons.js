import { useRef, useEffect } from "react";
import Button from "components/common/Button";

function Buttons({
  timerState,
  isResetDisabled,
  onStartClick,
  onStopClick,
  onResetClick,
  onRemoveClick,
}) {
  const startButtonRef = useRef(null);
  const stopButtonRef = useRef(null);
  const resetButtonRef = useRef(null);

  useEffect(
    function setFocus() {
      // start -> focus stop button
      if (timerState.isStarted) {
        stopButtonRef.current.focus();
      }
      // finish -> focus reset button
      else if (timerState.isFinished) {
        resetButtonRef.current.focus();
      }
      // stop or reset -> focus start button
      else {
        startButtonRef.current.focus();
      }
    },
    [timerState]
  );

  return (
    <div className="button-container timer__button-container">
      {!timerState.isFinished && (
        <>
          <Button
            ref={startButtonRef}
            disabled={timerState.isStarted}
            variant="primary"
            className="timer__start"
            onClick={onStartClick}
          >
            Start
          </Button>

          <Button
            ref={stopButtonRef}
            disabled={!timerState.isStarted}
            variant="primary"
            className="timer__stop"
            onClick={onStopClick}
          >
            Stop
          </Button>
        </>
      )}

      <Button
        ref={resetButtonRef}
        disabled={isResetDisabled}
        variant="secondary"
        className="timer__reset"
        onClick={onResetClick}
      >
        Reset
      </Button>

      <Button
        variant="danger"
        className="timer__remove"
        onClick={onRemoveClick}
      >
        Remove
      </Button>
    </div>
  );
}

export default Buttons;
