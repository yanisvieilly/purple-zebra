import React from "react";

const CITIES = ["Paris", "Rennes", "Lyon", "Marseille", "Bordeaux", "Lille"];

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
