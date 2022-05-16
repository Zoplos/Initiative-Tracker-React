import "../app.css";

const Form = ({
  submitHandler,
  name,
  init,
  mod,
  hp,
  nameHandler,
  initHandler,
  modHandler,
  hpHandler,
  rollHandler,
}) => (
  <form className="grid--5-cols form" onSubmit={submitHandler}>
    <input placeholder="Name" value={name} onChange={nameHandler}></input>

    <input
      placeholder="Initiative"
      type="number"
      value={init}
      onChange={initHandler}
    ></input>
    <input
      type="number"
      value={mod}
      placeholder="Modifier"
      onChange={modHandler}
    ></input>

    <input
      type="number"
      value={hp}
      placeholder="Health"
      onChange={hpHandler}
    ></input>

    <button className="btn" type="submit">
      Add
    </button>
    <button className="btn roll-btn" onClick={rollHandler}>
      Roll
    </button>
  </form>
);

export default Form;
