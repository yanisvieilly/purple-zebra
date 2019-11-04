import React from "react";

import { CITIES } from "./constants";

const CitySelector = ({ id, label, value, handleCityChange }) => {
  const formatOptions = () =>
    CITIES.map(city => (
      <option key={city} value={city}>
        {city}
      </option>
    ));

  const handleChange = event => handleCityChange(event.target.value);

  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        className="form-control"
        onChange={handleChange}
        value={value}
      >
        {formatOptions()}
      </select>
    </>
  );
};

export default CitySelector;
