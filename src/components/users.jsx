import React, { useState } from "react";
import api from "../api";
import "bootstrap/dist/css/bootstrap.css";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const peopleWordRender = () => {
    const userLength = String(users.length).split("");

    if (
      (Number(userLength[userLength.length - 1]) === 2 ||
        Number(userLength[userLength.length - 1]) === 3 ||
        Number(userLength[userLength.length - 1]) === 4) &&
      Number(userLength[userLength.length - 2]) !== 1
    ) {
      return "человека";
    } else {
      return "человек";
    }
  };

  const renderPhrase = () => {
    if (users.length === 0) {
      document.querySelector(".table").setAttribute("hidden", "");

      return <span className="badge bg-danger">Никто с тобой не тусанет</span>;
    } else {
      return (
        <span className="badge bg-primary">
          {users.length} {peopleWordRender()}{" "}
          {users.length === 1 ? "тусанет" : "тусанут"} с тобой сегодня
        </span>
      );
    }
  };

  const handleDelete = (pers) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== pers._id));
  };

  const renderQualities = (user) => {
    return user.qualities.map((quality) => {
      return (
        <span
          className={"badge bg-" + quality.color}
          style={{ marginRight: "5px" }}
          key={quality._id}
        >
          {quality.name}
        </span>
      );
    });
  };

  const renderTableRows = () => {
    return users.map((user) => {
      return (
        <tr key={user._id} id={user._id} className="user">
          <td>{user.name}</td>
          <td>{renderQualities(user)}</td>
          <td>{user.profession.name}</td>
          <td>{user.completedMeetings}</td>
          <td>{user.rate}/5</td>
          <td>
            <button
              className="btn btn-danger"
              onClick={() => handleDelete(user)}
            >
              delete
            </button>
          </td>
        </tr>
      );
    });
  };

  const renderTable = () => {
    return (
      <>
        <h2>{renderPhrase()}</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
            </tr>
          </thead>
          <tbody>{renderTableRows()}</tbody>
        </table>
      </>
    );
  };

  return renderTable();
};

export default Users;
