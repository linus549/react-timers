import Toggle from "components/Settings/Toggle";

function DarkModeToggle({ checked, onChange }) {
  return (
    <Toggle
      id="dark-mode"
      name="darkMode"
      label="Dark mode"
      checked={checked}
      onChange={onChange}
    >
      Use darker colors
    </Toggle>
  );
}

export default DarkModeToggle;
