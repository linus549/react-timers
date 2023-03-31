import { useState, useRef, useEffect } from "react";
import uniqueId from "lodash/uniqueId";
import { view } from "components/App";
import View from "components/common/View";
import Button from "components/common/Button";
import NumberInput from "components/AddTimer/NumberInput";

function AddTimer({ appDispatch }) {
  const [inputValues, setInputValues] = useState({
    label: "",
    hours: "",
    minutes: "",
    seconds: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const formRef = useRef(null);

  useEffect(
    function validate() {
      const totalSeconds = getTotalSeconds(
        inputValues.hours,
        inputValues.minutes,
        inputValues.seconds
      );

      setIsFormValid(totalSeconds >= 1 && formRef.current.checkValidity());
    },
    [inputValues.hours, inputValues.minutes, inputValues.seconds]
  );

  function handleChange(e) {
    setInputValues((inputValues) => ({
      ...inputValues,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const seconds = getTotalSeconds(
      inputValues.hours,
      inputValues.minutes,
      inputValues.seconds
    );

    appDispatch({
      type: "add_timer",
      payload: {
        seconds,
        id: uniqueId(),
        label: inputValues.label.trim(),
      },
    });

    appDispatch({ type: "change_view", payload: view.TIMERS });
  }

  function handleCancelClick() {
    appDispatch({ type: "change_view", payload: view.TIMERS });
  }

  return (
    <View
      title="Add Timer"
      buttons={
        <>
          <Button
            form="add-timer"
            type="submit"
            variant="primary"
            disabled={!isFormValid}
          >
            Add
          </Button>

          <Button variant="secondary" onClick={handleCancelClick}>
            Cancel
          </Button>
        </>
      }
    >
      <form
        ref={formRef}
        id="add-timer"
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
      >
        <div className="input-field">
          <label htmlFor="label" className="input-field__label">
            Label (optional)
          </label>

          <input
            id="label"
            name="label"
            value={inputValues.label}
            className="input-field__input"
            onChange={handleChange}
          />
        </div>

        <NumberInput
          id="hours"
          name="hours"
          value={inputValues.hours}
          onChange={handleChange}
        />

        <NumberInput
          id="minutes"
          name="minutes"
          value={inputValues.minutes}
          onChange={handleChange}
        />

        <NumberInput
          id="seconds"
          name="seconds"
          value={inputValues.seconds}
          onChange={handleChange}
        />
      </form>
    </View>
  );
}

function getTotalSeconds(hours, minutes, seconds) {
  return Math.trunc(
    Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds)
  );
}

export default AddTimer;
