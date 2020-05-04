import React from "react";

const Persons = ({ personsToShow, handleClick }) => {
  return (
    <ul>
      {personsToShow.map((person) => {
        return (
          <li key={person.name}>
            {person.name} {person.number}{" "}
            <button
              onClick={() => {
                handleClick(person.id);
              }}
            >
              delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
export default Persons;
