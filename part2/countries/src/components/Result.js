import React from "react";

const TooMany = () => {
  return <div>Too many matches, specify another filter</div>;
};

const Many = ({ data }) => {
  return (
    <ul>
      {data.map((country) => {
        return <li key={country.name}>{country.name}</li>;
      })}
    </ul>
  );
};

const Single = ({ data }) => {
  const country = data[0];
  return (
    <div>
      <h1>{country.name}</h1>
      <div>
        capital {country.capital} <br />
        population {country.population}
      </div>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language) => {
          return <li key={language.name}>{language.name}</li>;
        })}
      </ul>
      <img src={country.flag} alt={country.name} style={{ height: "150px" }} />
    </div>
  );
};

const Result = ({ data }) => {
  if (data.length > 10) {
    return <TooMany />;
  } else if (data.length > 1) {
    return <Many data={data} />;
  } else if (data.length === 1) {
    return <Single data={data} />;
  } else {
    // jugad to avoid running single before the data is fetched from api
    return <div>Fetching Country Data</div>;
  }
};

export default Result;
