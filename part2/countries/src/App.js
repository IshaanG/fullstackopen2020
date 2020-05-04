import React, { useState, useEffect } from "react";
import Search from "./components/Search";
import Result from "./components/Result";
import axios from "axios";
const App = () => {
  const [newFilter, setNewFilter] = useState("");
  const [countries, setCountries] = useState([]);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const countriesToShow = countries.filter((country) => {
    return country.name.toLowerCase().includes(newFilter.toLowerCase());
  });

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
      //here console.log(countries) will be empty as useState will re render with the new value of countries. here the previous value is used.
    });
  }, []);

  return (
    <div>
      <Search text={newFilter} handler={handleFilterChange} />
      <Result data={countriesToShow} />
    </div>
  );
};

export default App;
