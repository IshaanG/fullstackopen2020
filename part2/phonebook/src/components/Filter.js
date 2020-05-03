import React from "react";

const Filter = ({ text, handleOnChange }) => {
  return (
    <div>
      filter shown with <input value={text} onChange={handleOnChange} />
    </div>
  );
};

export default Filter;
