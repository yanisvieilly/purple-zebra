import React from "react";

import CitySelector from "./city-selector";

const SearchForm = () => (
  <div className="row mt-3">
    <div className="col">
      <form>
        <div className="form-row">
          <div className="form-group col-6">
            <CitySelector id="fromCity" label="From" />
          </div>
          <div className="form-group col-6">
            <CitySelector id="toCity" label="To" />
          </div>
        </div>
      </form>
    </div>
  </div>
);

export default SearchForm;
