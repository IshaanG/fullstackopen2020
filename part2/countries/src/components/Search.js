import React from "react";

const Search = ({ text, handler }) => {
  return (
    <div>
      find countries <input value={text} onChange={handler} />
    </div>
  );
};

export default Search;
