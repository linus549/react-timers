function Toggle({
  id,
  name,
  label,
  checked,
  disabled,
  onlyCheckboxDisabled,
  onChange,
  children,
}) {
  return (
    <div className="toggle">
      <div className="toggle__text-wrapper">
        <label
          htmlFor={id}
          className={
            disabled ? "toggle__label toggle__label--disabled" : "toggle__label"
          }
        >
          {label}
        </label>

        <p className="toggle__text">{children}</p>
      </div>

      <input
        id={id}
        name={name}
        type="checkbox"
        className="toggle__checkbox"
        disabled={disabled || onlyCheckboxDisabled}
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
}

export default Toggle;
