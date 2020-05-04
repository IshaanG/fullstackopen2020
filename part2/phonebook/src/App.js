import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");

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

  const handleDeletePerson = (id) => {
    if (window.confirm(`Delete ${id}?`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
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
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setNewName(""); // clears form name input
          setNewNumber(""); //clears form number input
        })
        .catch((e) => {
          console.log("Could not add a new person.");
        });
    }
  };
  useEffect(() => {
    personService
      .getAll()
      .then((notes) => {
        setPersons(notes);
      })
      .catch((e) => {
        console.log("Could not fetch persons data");
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
      <Persons personsToShow={personsToShow} handleClick={handleDeletePerson} />
    </div>
  );
};

export default App;
