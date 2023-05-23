import { useRef, useEffect } from "react";
import Button from "components/common/Button";
import { states } from "components/Timer/Timer";

function Buttons({
  timerState,
  onStartClick,
  onStopClick,
  onResetClick,
  onRemoveClick,
}) {
  const startButtonRef = useRef(null);
  const stopButtonRef = useRef(null);
  const resetButtonRef = useRef(null);

  // TODO: only focus reset button when:
  // - stop button has focus and timer finishes
  // - finished timer becomes selected
  useEffect(
    function setFocus() {
      if (timerState === states.STARTED) {
        stopButtonRef.current.focus();
      } else if (timerState === states.FINISHED) {
        resetButtonRef.current.focus();
      } else {
        startButtonRef.current.focus();
      }
    },
    [timerState]
  );

  return (
    <div className="button-container timer__button-container">
      {timerState !== states.FINISHED && (
        <>
          <Button
            ref={startButtonRef}
            disabled={timerState === states.STARTED}
            variant="primary"
            className="timer__start"
            onClick={onStartClick}
          >
            Start
          </Button>

          <Button
            ref={stopButtonRef}
            disabled={
              timerState === states.STOPPED || timerState === states.RESET
            }
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
        disabled={timerState === states.RESET}
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
