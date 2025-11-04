//cause we might want to use it multiple times and use some os the logic of the project
import React from "react";
import { useState } from "react";
const useAlert = () => {
  const [alert, setAlert] = useState({ show: false, text: "", type: "danger" });

  //this is going to set the alert state
  const showAlert = ({ text, type = "danger" }) => {
    setAlert({ show: true, text, type });
  };

  //this is going to set the alert state
  const hideAlert = (text, type = "danger") => {
    setAlert({ show: false, text: "", type: "danger" });
  };

  // hooks never return jsx they often return an array or an object
  return { alert, showAlert, hideAlert };
};

export default useAlert;
