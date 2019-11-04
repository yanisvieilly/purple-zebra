import React, { memo, useMemo } from "react";
import PropTypes from "prop-types";

import "./trips-list.css";

const TripsList = memo(({ trips }) => {
  const formatRows = useMemo(
    () =>
      trips.map(trip => (
        <tr key={trip.permanent_id}>
          <td>{trip.departure_place.city_name}</td>
          <td>{trip.arrival_place.city_name}</td>
          <td>{trip.user.display_name}</td>
          <td>
            <img
              className="user-picture"
              src={trip.user.picture}
              alt="Driver"
            />
          </td>
          <td>{trip.price.string_value}</td>
        </tr>
      )),
    [trips]
  );

  return (
    <div className="row mt-3">
      <div className="col">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Driver name</th>
              <th>Driver picture</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{formatRows}</tbody>
        </table>
      </div>
    </div>
  );
});

TripsList.propTypes = {
  trips: PropTypes.arrayOf(PropTypes.object)
};

TripsList.defaultProps = {
  trips: []
};

export default TripsList;
