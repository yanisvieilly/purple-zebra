import React from "react";
import { shallow } from "enzyme";

import SearchForm from "./search-form";

describe("SearchForm test suite", () => {
  it("renders without crashing", () => {
    shallow(
      <SearchForm
        fromCity="Paris"
        toCity="Marseille"
        handleFromCityChange={() => {}}
        handleToCityChange={() => {}}
      />
    );
  });
});
