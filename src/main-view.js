import React, { useState } from "react";
import axios from "axios";

import SearchForm from "./search-form";
import TripsList from "./trips-list";
import AuthenticationErrorAlert from "./authentication-error-alert";

const MainView = ({ authenticationError }) => {
  const [fromCity, setFromCity] = useState("Paris");
  const [toCity, setToCity] = useState("Marseille");
  const [trips, setTrips] = useState([]);

  const fetchTrips = async (from, to) => {
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
          <TripsList trips={trips} />
        </>
      )}
    </div>
  );
};

export default MainView;
