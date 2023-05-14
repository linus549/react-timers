import { useState } from "react";
import uniqueId from "lodash/uniqueId";
import Toggle from "components/Settings/Toggle";

function NotificationsToggle({ checked, onChange }) {
  const [key, setKey] = useState(uniqueId());

  function handleClick() {
    try {
      Notification.requestPermission().then(handlePermission);
    } catch (error) {
      // if Promise not supported
      Notification.requestPermission(handlePermission);
    }

    function handlePermission() {
      setKey(uniqueId());
    }
  }

  return (
    <Toggle
      key={key}
      id="notifications"
      name="notifications"
      label="Notifications"
      checked={checked}
      disabled={!isNotificationAvailable}
      onlyCheckboxDisabled={
        isNotificationAvailable && Notification.permission !== "granted"
      }
      onChange={onChange}
    >
      {isNotificationAvailable ? (
        <>
          {Notification.permission === "default" ? (
            <button
              type="button"
              className="toggle__permission-btn"
              onClick={handleClick}
            >
              Request permission
            </button>
          ) : (
            `Device permission: ${Notification.permission}`
          )}
        </>
      ) : (
        "Not available for your browser/device"
      )}
    </Toggle>
  );
}

const isNotificationAvailable = "Notification" in window;

export default NotificationsToggle;
