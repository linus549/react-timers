import { view } from "components/App";
import Button from "components/common/Button";

function Header({ appDispatch }) {
  function handleAddTimerClick() {
    appDispatch({ type: "change_view", payload: view.ADD_TIMER });
  }

  function handleSettingsClick() {
    appDispatch({ type: "change_view", payload: view.SETTINGS });
  }

  return (
    <header className="header button-container">
      <Button onClick={handleAddTimerClick}>Add Timer</Button>
      <Button onClick={handleSettingsClick}>Settings</Button>
    </header>
  );
}

export default Header;
