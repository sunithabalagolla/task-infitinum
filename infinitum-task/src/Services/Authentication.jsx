import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Aunthentication = (props) => {
  const navigate = useNavigate();
  const routerlocation = useLocation();

  if (
    routerlocation.pathname == "/" ||
    routerlocation.pathname == "/login" ||
    routerlocation.pathname == "/register"
  ) {
    return props.children;
  } else if (
    document.cookie !== null &&
    document.cookie !== "" &&
    document.cookie.split("=")[1] !== "null"
  ) {
    return props.children;
  } else {
    window.location.pathname = "/login";
  }
};

export default Aunthentication;