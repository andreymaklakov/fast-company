import React from "react";
import "bootstrap/dist/css/bootstrap.css";

const BookMark = ({ status }) => {
  return status ? (
    <i className="bi bi-bookmark-star-fill" style={{ fontSize: "30px" }}></i>
  ) : (
    <i className="bi bi-bookmark-star" style={{ fontSize: "30px" }}></i>
  );
};

export default BookMark;
