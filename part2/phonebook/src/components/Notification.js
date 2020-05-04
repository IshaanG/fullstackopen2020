import React from "react";
const Notification = ({ errorMessage, successMessage }) => {
  if (errorMessage === "" && successMessage === "") {
    return null;
  } else if (errorMessage === "") {
    return <div className="success">{successMessage}</div>;
  } else {
    return <div className="error">{errorMessage}</div>;
  }
};

export default Notification;
