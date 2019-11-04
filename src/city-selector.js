import React from "react";
import PropTypes from "prop-types";

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

CitySelector.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleCityChange: PropTypes.func.isRequired
};

export default CitySelector;
