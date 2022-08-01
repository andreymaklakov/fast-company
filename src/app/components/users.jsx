import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Pagination from "./pagination";
import paginate from "../utils/paginate";

import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";
import _ from "lodash";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ iter: "", order: "asc" });
  const [users, setUsers] = useState();

  useEffect(() => {
    api.users.fetchAll().then((data) => {
      setUsers(data);
    });
  }, []);

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== id));
  };

  const handleToggleBookMark = (id) => {
    setUsers(
      users.map((user) => {
        if (user._id === id) {
          return { ...user, bookmark: !user.bookmark };
        }

        return user;
      })
    );
  };

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
  });

  const handleProfessionSelect = (item) => {
    setCurrentPage(1);
    setSelectedProf(item);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const clearFilter = () => {
    setSelectedProf();
  };

  const pageSize = 2;

  if (users) {
    const filteredUsers = users.filter((user) =>
      selectedProf
        ? JSON.stringify(selectedProf) === JSON.stringify(user.profession)
        : true
    );

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);

    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    userCrop.length ||
      (filteredUsers.length && handlePageChange(currentPage - 1));

    const count = filteredUsers.length;

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <GroupList
              selectedItem={selectedProf}
              items={professions}
              onItemSelect={handleProfessionSelect}
            />

            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Сброс фильтров
            </button>
          </div>
        )}

        <div className="d-flex flex-column">
          <h2>
            <SearchStatus length={count} />
          </h2>

          {count > 0 && (
            <UsersTable
              users={userCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          )}

          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return "loading...";
};

export default Users;
