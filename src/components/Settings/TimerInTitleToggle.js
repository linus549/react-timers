import Toggle from "components/Settings/Toggle";

function TimerInTitleToggle({ checked, onChange }) {
  return (
    <Toggle
      id="timer-in-title"
      name="timerInTitle"
      label="Timer in tab title"
      checked={checked}
      onChange={onChange}
    >
      Show the currently selected timer in the tab title
    </Toggle>
  );
}

export default TimerInTitleToggle;
