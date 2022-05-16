import { useState, useEffect } from "react";
import Select from "react-select";
import "./app.css";

// Library inputs
import axios from "axios";

// Component imports
import Creatures from "./components/Creatures";
import Form from "./components/Form";

const App = () => {
  const [tokens, setTokens] = useState([]);
  const [newName, setNewName] = useState("");
  const [newInitiative, setNewInitiative] = useState("");
  const [newInitMod, setNewInitMod] = useState("");
  const [newHitPoints, setNewHitPoints] = useState("");
  const [allMonsters, setAllMonsters] = useState([]);

  const APIhook = () => {
    axios.get("https://www.dnd5eapi.co/api/monsters").then((res) => {
      const monsters = res.data.results.map((monster) => ({
        label: monster.name,
        value: monster,
      }));
      // console.log(monsters);
      setAllMonsters(monsters);
      // console.log(res.data);
    });
  };

  console.log(tokens);

  useEffect(APIhook, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const mod = newInitMod ? Number(newInitMod) : 0;
    const submission = {
      name: newName,
      init: Number(newInitiative) + mod,
      hp: newHitPoints,
      id: Math.trunc(Math.random() * 1000),
    };
    const sortedTokens = [...tokens, submission].sort((a, b) => {
      return Number(a.init) > Number(b.init) ? -1 : 1;
    });
    // setTokens(tokens.concat(submission));
    setTokens(sortedTokens);
    setNewName("");
    setNewInitiative("");
    setNewHitPoints("");
    setNewInitMod("");
  };

  const nameChangeHandler = (e) => {
    setNewName(e.target.value);
    // console.log(e.target.value);
  };

  const modChangeHandler = (e) => {
    setNewInitMod(e.target.value);
    // console.log(e.target.value);
  };

  const hpChangeHandler = (e) => {
    setNewHitPoints(e.target.value);
    // console.log(e.target.value);
  };

  const initChangeHandler = (e) => {
    setNewInitiative(e.target.value);
    // console.log(e.target.value);
  };

  const clearHandler = (e) => {
    e.preventDefault();
    setTokens([]);
  };

  const rollHandler = (e) => {
    e.preventDefault();
    const randomRoll = Math.trunc(Math.random() * 20) + 1;
    setNewInitiative(randomRoll);
  };

  const deleteHandler = (id) => {
    setTokens(tokens.filter((token) => token.id !== id));
  };

  const modifierCalculator = (mod) => Math.trunc(mod / 2 - 5);

  const selectHandler = (opt) => {
    // console.log(opt.value.url);
    axios.get(`https://www.dnd5eapi.co${opt.value.url}`).then((res) => {
      console.log(res.data);
      setNewName(res.data.name);
      setNewHitPoints(res.data.hit_points);
      setNewInitMod(modifierCalculator(res.data.dexterity));
    });
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      color: "red",
      backgroundColor: "#212529",
    }),
    menu: (provided, state) => ({
      ...provided,
      color: "#dee2e6",
      // color: "blue",
      backgroundColor: "#212529",
      // boxShadow: "0px 0px 1px 1px #e03131",
      // borderBottom: "1px dotted blue",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "#dee2e6",
    }),
    input: (provided, state) => ({
      ...provided,
      color: "#dee2e6",
    }),
    option: (provided, state) => ({
      ...provided,
      // color: "red",
      backgroundColor: state.isFocused ? "#343a40" : "#212529",
    }),
  };

  return (
    <div className="container container-flex ">
      <div className="header">
        <h1>TEST DEMO: Initiative Tracker with React</h1>
      </div>

      <Select
        styles={customStyles}
        options={allMonsters}
        onChange={selectHandler}
      />

      <Form
        submitHandler={submitHandler}
        name={newName}
        init={newInitiative}
        mod={newInitMod}
        hp={newHitPoints}
        nameHandler={nameChangeHandler}
        initHandler={initChangeHandler}
        modHandler={modChangeHandler}
        hpHandler={hpChangeHandler}
        rollHandler={rollHandler}
      />

      <Creatures
        creatures={tokens}
        clearHandler={clearHandler}
        deleteHandler={deleteHandler}
      />
    </div>
  );
};

export default App;
