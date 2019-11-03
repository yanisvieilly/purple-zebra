import React from "react";

import CitySelector from "./city-selector";

const SearchForm = ({
  fromCity,
  toCity,
  handleFromCityChange,
  handleToCityChange
}) => (
  <div className="row mt-3">
    <div className="col">
      <form>
        <div className="form-row">
          <div className="form-group col-6">
            <CitySelector
              id="fromCity"
              label="From"
              value={fromCity}
              handleCityChange={handleFromCityChange}
            />
          </div>
          <div className="form-group col-6">
            <CitySelector
              id="toCity"
              label="To"
              value={toCity}
              handleCityChange={handleToCityChange}
            />
          </div>
        </div>
      </form>
    </div>
  </div>
);

export default SearchForm;
