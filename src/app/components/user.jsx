import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import { useState } from "react";

const User = ({
  name,
  _id,
  qualities,
  profession,
  completedMeetings,
  rate,
  onDelete,
  bookmark,
  onBookMark,
}) => {
  const [bookmarkStatus, setBookmarkStatus] = useState(bookmark);

  const handleBookmarkClick = () => {
    setBookmarkStatus((prevstate) => !prevstate);
    onBookMark(_id);
  };

  return (
    <tr>
      <td>{name}</td>
      <td>
        {qualities.map((quality) => (
          <Qualitie key={quality._id} {...quality} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}/5</td>
      <td>
        <button
          className="btn p-0"
          style={{ boxShadow: "none" }}
          onClick={handleBookmarkClick}
        >
          <BookMark status={bookmark} />
        </button>
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => onDelete(_id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default User;
