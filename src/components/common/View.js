function View({ title, buttons, children }) {
  return (
    <div className="box view">
      <h2 className="view__title">{title}</h2>
      {children}
      <div className="button-container view__button-container">{buttons}</div>
    </div>
  );
}

export default View;
