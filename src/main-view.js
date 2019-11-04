import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import SearchForm from "./search-form";
import TripsList from "./trips-list";
import AuthenticationErrorAlert from "./authentication-error-alert";
import TripsListLoadingErrorAlert from "./trips-list-loading-error-alert";

const MainView = ({ authenticationError }) => {
  const [fromCity, setFromCity] = useState("Paris");
  const [toCity, setToCity] = useState("Marseille");
  const [trips, setTrips] = useState([]);
  const [fetchTripsError, setFetchTripsError] = useState(false);

  const fetchTrips = async (from, to) => {
    try {
      const { data } = await axios.get(
        `https://edge.blablacar.com/api/v2/trips?_format=json&locale=fr_FR&cur=EUR&fn=${from}&tn=${to}`,
        {
          headers: {
            Accept: "application/json",
            "Accept-Language": "fr",
            "cache-control": "no-cache"
          }
        }
      );

      setTrips(data.trips);
    } catch (error) {
      console.error(error);
      setFetchTripsError(true);
    }
  };

  const handleFromCityChange = city => {
    setFromCity(city);
    fetchTrips(city, toCity);
  };

  const handleToCityChange = city => {
    setToCity(city);
    fetchTrips(fromCity, city);
  };

  return (
    <div className="container">
      {authenticationError ? (
        <AuthenticationErrorAlert />
      ) : (
        <>
          <SearchForm
            fromCity={fromCity}
            toCity={toCity}
            handleFromCityChange={handleFromCityChange}
            handleToCityChange={handleToCityChange}
          />
          {fetchTripsError ? (
            <TripsListLoadingErrorAlert />
          ) : (
            <TripsList trips={trips} />
          )}
        </>
      )}
    </div>
  );
};

MainView.propTypes = {
  authenticationError: PropTypes.bool.isRequired
};

export default MainView;
