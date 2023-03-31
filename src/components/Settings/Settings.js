import { view } from "components/App";
import View from "components/common/View";
import Button from "components/common/Button";
import DarkModeToggle from "components/Settings/DarkModeToggle";
import SoundToggle from "components/Settings/SoundToggle";
import NotificationsToggle from "components/Settings/NotificationsToggle";
import VibrationToggle from "components/Settings/VibrationToggle";
import TimerInTitleToggle from "components/Settings/TimerInTitleToggle";

function Settings({ settings, onSettingChange, appDispatch }) {
  function handleCloseClick() {
    appDispatch({ type: "change_view", payload: view.TIMERS });
  }

  return (
    <View
      title="Settings"
      buttons={
        <Button variant="secondary" onClick={handleCloseClick}>
          Close
        </Button>
      }
    >
      <div>
        <DarkModeToggle
          checked={settings.darkMode}
          onChange={onSettingChange}
        />

        <SoundToggle checked={settings.sound} onChange={onSettingChange} />

        <NotificationsToggle
          checked={settings.notifications}
          onChange={onSettingChange}
        />

        <VibrationToggle
          checked={settings.vibration}
          onChange={onSettingChange}
        />

        <TimerInTitleToggle
          checked={settings.timerInTitle}
          onChange={onSettingChange}
        />
      </div>
    </View>
  );
}

export default Settings;
