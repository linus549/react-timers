import { useReducer, useEffect } from "react";
import useLocalStorage from "hooks/useLocalStorage";
import Header from "components/Header";
import AddTimer from "components/AddTimer/AddTimer";
import Settings from "components/Settings/Settings";
import Timer from "components/Timer/Timer";
import soundFile from "assets/sound/glass-ping-Attr-Noncommercial-3-0.mp3";

function App() {
  const [state, appDispatch] = useReducer(reducer, {
    timers: [],
    currentView: view.ADD_TIMER,
  });

  const [settings, setSettings] = useLocalStorage("settings", {
    darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
    sound: true,
    notifications: false,
    vibration: false,
    timerInTitle: true,
  });

  useEffect(
    function toggleDarkMode() {
      if (settings.darkMode) {
        htmlElement.classList.add("dark");
      } else {
        htmlElement.classList.remove("dark");
      }
    },
    [settings.darkMode]
  );

  useEffect(
    function resetDocumentTitle() {
      if (state.timers.length === 0 || settings.timerInTitle === false) {
        document.title = "Timers";
      }
    },
    [state.timers.length, settings.timerInTitle]
  );

  function handleSettingChange(e) {
    setSettings((settings) => ({
      ...settings,
      [e.target.name]: e.target.checked,
    }));
  }

  function handleTimerFinish(label) {
    if (settings.sound) {
      audio.play().catch((error) => {
        console.error(error);
      });
    }

    if (settings.notifications) {
      const text = label === "" ? DEFAULT_NOTIFICATION_TEXT : label;
      new Notification(text);
    }

    if (settings.vibration) {
      navigator.vibrate(VIBRATION_DURATION);
    }
  }

  return (
    <div className="app">
      <Header appDispatch={appDispatch} />

      <main>
        {state.currentView === view.ADD_TIMER && (
          <AddTimer appDispatch={appDispatch} />
        )}

        {state.currentView === view.SETTINGS && (
          <Settings
            settings={settings}
            onSettingChange={handleSettingChange}
            appDispatch={appDispatch}
          />
        )}

        <ul>
          {state.timers.map((timer) => (
            <li key={timer.id} className="timer-item">
              <Timer
                {...timer}
                isVisible={state.currentView === view.TIMERS}
                inDocumentTitle={settings.timerInTitle}
                onFinish={handleTimerFinish}
                appDispatch={appDispatch}
              />
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

function reducer(state, action) {
  switch (action.type) {
    case "add_timer":
      const deselectedTimers = state.timers.map((timer) => ({
        ...timer,
        isSelected: false,
      }));

      const newTimer = {
        ...action.payload,
        isSelected: true,
      };

      deselectedTimers.push(newTimer);

      return {
        ...state,
        timers: deselectedTimers,
      };

    case "select_timer":
      const updatedTimers = state.timers.map((timer) => ({
        ...timer,
        isSelected: timer.id === action.payload,
      }));

      return {
        ...state,
        timers: updatedTimers,
      };

    case "remove_timer":
      const remainingTimers = state.timers.filter(
        (timer) => timer.id !== action.payload
      );

      if (remainingTimers.length !== 0) {
        remainingTimers[remainingTimers.length - 1].isSelected = true;
      }

      return {
        ...state,
        timers: remainingTimers,
      };

    case "change_view":
      return {
        ...state,
        currentView: action.payload,
      };

    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

const DEFAULT_NOTIFICATION_TEXT = "Timer finished";
const VIBRATION_DURATION = 1000;
const htmlElement = document.querySelector("html");
const audio = new Audio(soundFile);

export const view = {
  ADD_TIMER: "Add Timer",
  SETTINGS: "Settings",
  TIMERS: "Timers",
};

export default App;
