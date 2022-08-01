import React from "react";
import PropTypes from "prop-types";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ data, columns, ...rest }) => {
  return (
    <table className="table">
      <TableHeader {...{ columns, ...rest }} />

      <TableBody {...{ columns, data }} />
    </table>
  );
};

Table.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired
};

export default Table;
