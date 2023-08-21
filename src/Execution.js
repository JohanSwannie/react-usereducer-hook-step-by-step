import { ACTIONS } from "./App";

export default function Execution({ execution, dispatch4 }) {
  const divStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
  };

  const listStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "80vw",
    fontSize: "30px",
    fontWeight: "bold",
    color: execution.done ? "navy" : "crimson",
    fontFamily: execution.done ? "Sofia" : "Tangerine",
  };
  return (
    <div style={divStyle}>
      <button
        className="show"
        onClick={() =>
          dispatch4({
            type: ACTIONS.TOGGLE_EXECUTION,
            stack: { id: execution.id },
          })
        }
      >
        Toggle
      </button>
      <li style={listStyle}>{execution.enteredText}</li>
      <button
        className="show"
        onClick={() =>
          dispatch4({
            type: ACTIONS.DELETE_EXECUTION,
            stack: { id: execution.id },
          })
        }
      >
        Delete
      </button>
    </div>
  );
}
