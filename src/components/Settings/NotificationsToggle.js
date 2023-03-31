import Toggle from "components/Settings/Toggle";

function NotificationsToggle({ checked, onChange }) {
  function handleChange(e) {
    if (Notification.permission === "default") {
      if (isPromiseSupported()) {
        Notification.requestPermission().then(() => handlePermission(e));
      } else {
        Notification.requestPermission(() => handlePermission(e));
      }
    } else {
      onChange(e);
    }

    function handlePermission(e) {
      e.target.checked = Notification.permission === "granted";
      onChange(e);
    }
  }

  return (
    <Toggle
      id="notifications"
      name="notifications"
      label="Notifications"
      checked={checked}
      disabled={!isNotificationAvailable}
      onlyCheckboxDisabled={Notification.permission === "denied"}
      onChange={handleChange}
    >
      {isNotificationAvailable
        ? `Permission: ${
            Notification.permission === "default"
              ? "not set"
              : Notification.permission
          }`
        : "Not available for your browser/device"}
    </Toggle>
  );
}

const isNotificationAvailable = "Notification" in window;

function isPromiseSupported() {
  try {
    Notification.requestPermission().then();
  } catch (error) {
    return false;
  }

  return true;
}

export default NotificationsToggle;
