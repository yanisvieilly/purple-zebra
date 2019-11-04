import React from "react";
import { shallow } from "enzyme";

import SearchForm from "./search-form";
import CitySelector from "./city-selector";

const FROM_CITY = "Paris";
const TO_CITY = "Marseille";

describe("SearchForm test suite", () => {
  let component;

  beforeEach(() => {
    component = (
      <SearchForm
        fromCity={FROM_CITY}
        toCity={TO_CITY}
        handleFromCityChange={() => {}}
        handleToCityChange={() => {}}
      />
    );
  });

  it("renders without crashing", () => {
    shallow(component);
  });

  it("renders two CitySelector components", () => {
    const wrapper = shallow(component);
    const citySelectors = wrapper.find(CitySelector);

    expect(citySelectors.length).toEqual(2);
  });

  it("sets the from CitySelector value", () => {
    const wrapper = shallow(component);
    const fromCity = wrapper
      .find(CitySelector)
      .first()
      .prop("value");

    expect(fromCity).toEqual(FROM_CITY);
  });

  it("sets the from CitySelector value", () => {
    const wrapper = shallow(component);
    const toCity = wrapper
      .find(CitySelector)
      .last()
      .prop("value");

    expect(toCity).toEqual(TO_CITY);
  });
});
