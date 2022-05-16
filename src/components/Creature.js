const Creature = ({ creature, deleteHandler }) => (
  <div className="test">
    <p className="creature">
      <span>{creature.name}</span>
      <span className="creature__initiative">{creature.init}</span>
      {/* <span contentEditable="true">{hp}</span> */}
      <span>{creature.hp}</span>
      <button
        className="btn dlt-btn"
        onClick={() => deleteHandler(creature.id)}
      >
        Delete
      </button>
    </p>
  </div>
);

export default Creature;
