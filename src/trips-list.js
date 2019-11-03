import React from "react";

import "./trips-list.css";

const TripsList = ({ trips }) => {
  const formatRows = (trips || []).map(trip => (
    <tr key={trip.permanent_id}>
      <td>{trip.departure_place.city_name}</td>
      <td>{trip.arrival_place.city_name}</td>
      <td>{trip.user.display_name}</td>
      <td>
        <img class="user-picture" src={trip.user.picture} />
      </td>
      <td>{trip.price.string_value}</td>
    </tr>
  ));

  return (
    <div className="row">
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
};

export default TripsList;
