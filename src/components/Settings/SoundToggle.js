import Toggle from "components/Settings/Toggle";

function SoundToggle({ checked, onChange }) {
  return (
    <Toggle
      id="sound"
      name="sound"
      label="Sound"
      checked={checked}
      onChange={onChange}
    >
      "
      <a
        className="toggle__link"
        href="https://soundbible.com/2084-Glass-Ping.html"
        target="_blank"
        rel="noreferrer"
      >
        Glass Ping
      </a>
      " by Go445 (
      <a
        className="toggle__link"
        href="https://creativecommons.org/licenses/by-nc/3.0/"
        target="_blank"
        rel="noreferrer"
      >
        CC BY-NC 3.0
      </a>
      )
    </Toggle>
  );
}

export default SoundToggle;
