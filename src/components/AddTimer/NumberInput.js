import { useState } from "react";

function NumberInput({ id, name, value, onChange }) {
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e) {
    validateInput(e);
    onChange(e);
  }

  function validateInput(e) {
    const isNegative = /^-[0-9]*\.?[0-9]+$/.test(e.target.value);
    const isFraction = /^[0-9]*\.[0-9]+$/.test(e.target.value);
    let message = "";

    if (isNegative) {
      message = "Please provide a positive integer.";
    } else if (isFraction) {
      message = "Please provide an integer.";
    } else if (!e.target.validity.valid) {
      message = "Please provide a number.";
    }

    setErrorMessage(message);
  }

  return (
    <div className="input-field">
      <label htmlFor={id} className="input-field__label">
        {capitalize(id)}
      </label>

      <input
        id={id}
        name={name}
        value={value}
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="0"
        className="input-field__input"
        aria-describedby={id + "-error"}
        onChange={handleChange}
      />

      {errorMessage && (
        <div className="input-field__error">
          <svg
            className="input-field__error-icon"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
          </svg>

          <span id={id + "-error"} role="alert">
            {errorMessage}
          </span>
        </div>
      )}
    </div>
  );
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
}

export default NumberInput;
