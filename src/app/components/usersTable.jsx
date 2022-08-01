import React from "react";

import PropTypes from "prop-types";

import BookMark from "./bookmark";
import QualitiesList from "./qualitisList";
import Table from "./table";

const UsersTable = ({ users, onToggleBookMark, onDelete, ...rest }) => {
  const bookmarkBtn = (id, bookmark) => {
    return (
      <button
        className="btn p-0"
        style={{ boxShadow: "none" }}
        onClick={() => onToggleBookMark(id)}
      >
        <BookMark status={bookmark} />
      </button>
    );
  };

  const deleteBtn = (id) => {
    return (
      <button
        className="btn btn-danger"
        onClick={() => {
          onDelete(id);
        }}
      >
        Delete
      </button>
    );
  };

  const columns = {
    name: { path: "name", name: "Имя" },
    qualities: {
      name: "Качества",
      component: (user) => <QualitiesList qualities={user.qualities} />
    },
    profession: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: (user) => bookmarkBtn(user._id, user.bookmark)
    },
    delete: { component: (user) => deleteBtn(user._id) }
  };

  return <Table {...{ columns, data: users, ...rest }} />;
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default UsersTable;
