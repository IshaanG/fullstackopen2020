import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
    const personName = persons.filter((person) => person.id === id)[0].name;
    if (window.confirm(`Delete ${personName}?`)) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          setSuccessMessage(`Successfully deleted ${personName}`);
          setTimeout(() => {
            setSuccessMessage("");
          }, 5000);
        })
        .catch(() => {
          setErrorMessage(
            `Information of ${personName} has already been removed from server.`
          );
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
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
      //alert(`${newName} is already added to phonebook`);
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with new a one?`
        )
      ) {
        const personObject = persons.find((person) => person.name === newName);
        const changedPersonObject = { ...personObject, number: newNumber };
        personService
          .update(changedPersonObject.id, changedPersonObject)
          .then((returnedPersonObject) => {
            const newPersons = persons.map((person) =>
              person.name !== newName ? person : returnedPersonObject
            );
            setPersons(newPersons);
            setSuccessMessage(`Successfully updated number for ${newName}`);
            setTimeout(() => {
              setSuccessMessage("");
            }, 5000);
          })
          .catch(() => {
            setErrorMessage(`Could not add a new person.`);
            setTimeout(() => {
              setErrorMessage("");
            }, 5000);
          });
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(personObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setSuccessMessage(`Added ${newName}`);
          setTimeout(() => {
            setSuccessMessage("");
          }, 5000);
          setNewName(""); // clears form name input
          setNewNumber(""); //clears form number input
        })
        .catch(() => {
          setErrorMessage(`Could not add a new person.`);
          setTimeout(() => {
            setErrorMessage("");
          }, 5000);
        });
    }
  };
  useEffect(() => {
    personService
      .getAll()
      .then((notes) => {
        setPersons(notes);
      })
      .catch(() => {
        setErrorMessage(`Could not fetch persons data`);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
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
