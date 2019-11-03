import React from "react";

const CITIES = ["Paris", "Rennes", "Lyon", "Marseille", "Bordeaux", "Lille"];

const formatOptions = () =>
  CITIES.map(city => (
    <option key={city} value={city}>
      {city}
    </option>
  ));

const CitySelector = ({ id, label }) => (
  <>
    <label htmlFor={id}>{label}</label>
    <select id={id} className="form-control">
      {formatOptions()}
    </select>
  </>
);

export default CitySelector;
