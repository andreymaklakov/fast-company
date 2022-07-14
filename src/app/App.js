import React, { useState } from "react";
import api from "./api";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";

function App() {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((user) => user._id !== id));
  };

  const handleToggleBookMark = (id) => {
    const newUsers = users.map((user) => {
      if (user._id === id) {
        !user.bookmark ? (user.bookmark = true) : (user.bookmark = false);
      }

      return user;
    });

    setUsers(newUsers);
  };

  return (
    <div>
      <h2>
        <SearchStatus length={users.length} />
      </h2>
      <Users
        users={users}
        onDelete={handleDelete}
        onBookMark={handleToggleBookMark}
      />
    </div>
  );
}

export default App;
