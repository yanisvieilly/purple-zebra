import React, { useState } from "react";
import axios from "axios";

import SearchForm from "./search-form";

const fetchTrips = (fromCity, toCity) => {
  axios.get(
    `https://edge.blablacar.com/api/v2/trips?_format=json&locale=fr_FR&cur=EUR&fn=${fromCity}&tn=${toCity}`,
    {
      headers: {
        Accept: "application/json",
        "Accept-Language": "fr",
        "cache-control": "no-cache"
      }
    }
  );
};

const MainView = () => {
  const [state, setState] = useState({
    fromCity: "Paris",
    toCity: "Marseille"
  });

  const handleFromCityChange = fromCity => {
    setState(prevState => ({ ...prevState, fromCity }));
    fetchTrips(state.fromCity, state.toCity);
  };

  const handleToCityChange = toCity => {
    setState(prevState => ({ ...prevState, toCity }));
    fetchTrips(state.fromCity, state.toCity);
  };

  return (
    <div className="container">
      <SearchForm
        fromCity={state.fromCity}
        toCity={state.toCity}
        handleFromCityChange={handleFromCityChange}
        handleToCityChange={handleToCityChange}
      />
    </div>
  );
};

export default MainView;
