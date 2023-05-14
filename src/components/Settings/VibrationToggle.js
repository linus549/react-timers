import Toggle from "components/Settings/Toggle";

function VibrationToggle({ checked, onChange }) {
  return (
    <Toggle
      id="vibration"
      name="vibration"
      label="Vibration"
      checked={checked}
      disabled={!isVibrationAvailable}
      onChange={onChange}
    >
      {!isVibrationAvailable && "Not available for your browser/device"}
    </Toggle>
  );
}

const isVibrationAvailable = "vibrate" in navigator;

export default VibrationToggle;
