import React, { useState, useRef, useReducer } from "react";
import Execution from "./Execution";
import "./App.css";

export const ACTIONS = {
  ADD_EXECUTION: "add_execution",
  TOGGLE_EXECUTION: "toggle_execution",
  DELETE_EXECUTION: "delete_execution",
};

function reducer(executions, action) {
  switch (action.type) {
    case ACTIONS.ADD_EXECUTION:
      return [
        ...executions,
        newExecution(action.stack.enteredText, executions.length),
      ];
    case ACTIONS.TOGGLE_EXECUTION:
      return executions.map((execution) => {
        if (execution.id === action.stack.id) {
          return { ...execution, done: !execution.done };
        }
        return execution;
      });
    case ACTIONS.DELETE_EXECUTION:
      return executions.filter((execution) => execution.id !== action.stack.id);
    default:
      return { ...executions };
  }
}

function newExecution(enteredText, id) {
  return { id, enteredText: enteredText, done: false };
}

function App() {
  const [enteredText, setEnteredText] = useState("");
  const inputRef = useRef();
  const [executions, dispatch4] = useReducer(reducer, []);

  const [count1, dispatch1] = useReducer((stateMate, action) => {
    switch (action) {
      case "add":
        return stateMate + 1;
      case "add2":
        return stateMate + 2;
      case "subtract":
        return stateMate - 1;
      default:
        return stateMate;
    }
  }, 5);

  const [count2, dispatch2] = useReducer((state, action) => {
    switch (action) {
      case "multiply":
        return state * 2;
      case "divide":
        return state / 2;
      default:
        return state;
    }
  }, 17);

  const [tech, dispatch3] = useReducer((state, action) => {
    switch (action.type) {
      case "add":
        return [
          ...state,
          {
            id: state.length,
            technology: action.description,
          },
        ];
      case "remove":
        return state.filter((_, index) => index !== action.index);
      case "clear":
        return [];
      default:
        return state;
    }
  }, []);

  function handleSubmit1(e) {
    e.preventDefault();
    dispatch3({
      type: "add",
      description: inputRef.current.value,
    });
    inputRef.current.value = "";
  }

  function handleSubmit2(event) {
    event.preventDefault();
    dispatch4({
      type: ACTIONS.ADD_EXECUTION,
      stack: { enteredText: enteredText },
    });
    setEnteredText("");
  }

  return (
    <div className="App">
      <div className="reducer_one_two">
        <div className="first_reducer">
          Count1 is now : {count1}
          <br />
          <br />
          <button onClick={() => dispatch1("add")}>Increment</button>
          <br />
          <br />
          <button onClick={() => dispatch1("subtract")}>Decrement</button>
          <br />
          <br />
          Count2 is now : {count2}
          <br />
          <br />
          <button onClick={() => dispatch2("multiply")}>Multiply</button>
          <br />
          <br />
          <button onClick={() => dispatch2("divide")}>Divide</button>
        </div>
        <div className="second_reducer">
          <form onSubmit={handleSubmit1}>
            <label>
              Enter a Technology
              <input ref={inputRef} />
            </label>
          </form>
          <br />
          <button id="clear" onClick={() => dispatch3({ type: "clear" })}>
            Clear
          </button>
          <br />
          <br />
          <ul>
            {tech.map((tec, index) => (
              <li key={tec.id}>
                {tec.technology}
                <button
                  id="remove"
                  onClick={() => dispatch3({ type: "remove", index })}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="third_reducer">
        <form onSubmit={handleSubmit2}>
          <input
            type="text"
            value={enteredText}
            placeholder="Enter Text"
            onChange={(event) => setEnteredText(event.target.value)}
          />
        </form>
        <ul>
          {executions.map((execution) => {
            return (
              <Execution
                key={execution.id}
                execution={execution}
                dispatch4={dispatch4}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
