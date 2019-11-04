import React from "react";
import { shallow } from "enzyme";

import CitySelector from "./city-selector";
import { CITIES } from "./constants";

const SELECTED_CITY = "Paris";

describe("CitySelector test suite", () => {
  let component;

  beforeEach(() => {
    component = (
      <CitySelector
        id="fromCity"
        label="From"
        value={SELECTED_CITY}
        handleCityChange={() => {}}
      />
    );
  });

  it("renders without crashing", () => {
    shallow(component);
  });

  it("renders as many options as there are cities", () => {
    const wrapper = shallow(component);
    const options = wrapper.find("option");

    expect(options.length).toEqual(CITIES.length);
  });

  it("selects the city passed as a prop by default", () => {
    const wrapper = shallow(component);
    const selectValue = wrapper.find("select").prop("value");

    expect(selectValue).toEqual(SELECTED_CITY);
  });
});
