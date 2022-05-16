import Creature from "./Creature";

const Creatures = ({ creatures, clearHandler, deleteHandler }) => {
  //   console.log(creatures);
  if (creatures.length === 0) {
    return (
      <div className="container-flex">
        <h4>Add creatures to battle</h4>
      </div>
    );
  }
  return (
    <div className="container-flex">
      <div>
        <p className="creature-header">
          <span>Name</span>
          <span>Initiative</span>
          <span>Hit Points</span>
        </p>
      </div>
      <div className="creatures">
        {creatures.map((token) => (
          <Creature
            key={token.id}
            creature={token}
            deleteHandler={deleteHandler}
          />
        ))}
      </div>
      <div className="clear-btn">
        <button className="btn clear-btn" onClick={clearHandler}>
          Clear All
        </button>
      </div>
    </div>
  );
};
export default Creatures;
