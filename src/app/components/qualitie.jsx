import React from "react";
import "bootstrap/dist/css/bootstrap.css";

const Qualitie = ({ color, name }) => {
  return <span className={"badge m-1 bg-" + color}>{name}</span>;
};

export default Qualitie;
