import React, { useState, useEffect } from "react";
import User from "./user";
import "bootstrap/dist/css/bootstrap.css";
import Pagination from "./pagination";
import paginate from "../utils/paginate";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import api from "../api";
import SearchStatus from "./searchStatus";

const Users = ({ users, ...rest }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();

  useEffect(() => {
    api.professions.fetchAll().then((data) => {
      setProfessions(data);
    });
  });

  const handleProfessionSelect = (item) => {
    setCurrentPage(1);
    setSelectedProf(item);
  };

  const pageSize = 2;

  const filteredUsers = users.filter((user) =>
    selectedProf
      ? JSON.stringify(selectedProf) === JSON.stringify(user.profession)
      : true
  );
  const userCrop = paginate(filteredUsers, currentPage, pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  userCrop.length ||
    (filteredUsers.length && handlePageChange(currentPage - 1));

  const count = filteredUsers.length;

  const clearFilter = () => {
    setSelectedProf();
  };

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
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Имя</th>
                <th scope="col">Качества</th>
                <th scope="col">Профессия</th>
                <th scope="col">Встретился, раз</th>
                <th scope="col">Оценка</th>
                <th scope="col">Избранное</th>
                <th />
              </tr>
            </thead>

            <tbody>
              {userCrop.map((user) => (
                <User key={user._id} {...user} {...rest} />
              ))}
            </tbody>
          </table>
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
};

Users.propTypes = {
  users: PropTypes.array.isRequired
};

export default Users;
