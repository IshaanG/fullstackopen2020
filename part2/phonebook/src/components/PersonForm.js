import React from "react";

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleOnSubmit}>
      <div>
        name:{" "}
        <input
          value={props.handleNewName}
          onChange={props.handleHandleNameChange}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={props.handleNewNumber}
          onChange={props.handleHandleNumberChange}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
