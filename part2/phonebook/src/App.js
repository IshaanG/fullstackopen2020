import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

  const url = "http://localhost:3001/persons";

  const alreadyExist = (p) => {
    return persons.filter((person) => person.name === p).length > 0;
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const personsToShow =
    newFilter === ""
      ? persons
      : persons.filter((person) =>
          person.name.toLowerCase().includes(newFilter.toLowerCase())
        );

  const addPerson = (event) => {
    event.preventDefault();
    if (alreadyExist(newName)) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      axios.post(url, personObject);
      setPersons(persons.concat(personObject));
    }
    setNewName(""); // clears form name input
    setNewNumber(""); //clears form number input
  };
  useEffect(() => {
    axios.get(url).then((response) => {
      setPersons(response.data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter text={newFilter} handleOnChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        handleOnSubmit={addPerson}
        handleHandleNameChange={handleNameChange}
        handleHandleNumberChange={handleNumberChange}
        handleNewName={newName}
        handleNewNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
