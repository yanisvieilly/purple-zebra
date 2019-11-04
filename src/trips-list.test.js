import React from "react";
import { shallow } from "enzyme";

import TripsList from "./trips-list";

describe("TripsList test suite", () => {
  let component;

  beforeEach(() => {
    component = <TripsList trips={TRIPS} />;
  });

  it("renders without crashing", () => {
    shallow(component);
  });

  it("renders as many rows as there are trips", () => {
    const wrapper = shallow(component);
    const rows = wrapper.find("tbody tr");

    expect(rows.length).toEqual(TRIPS.length);
  });

  it("shows the departure city name", () => {
    const wrapper = shallow(component);
    const firstRow = wrapper.find("tbody tr").first();
    const departureCityName = TRIPS[0].departure_place.city_name;

    expect(firstRow.contains(departureCityName)).toBeTruthy();
  });

  it("shows the arrival city name", () => {
    const wrapper = shallow(component);
    const firstRow = wrapper.find("tbody tr").first();
    const arrivalCityName = TRIPS[0].arrival_place.city_name;

    expect(firstRow.contains(arrivalCityName)).toBeTruthy();
  });

  it("shows the user display name", () => {
    const wrapper = shallow(component);
    const firstRow = wrapper.find("tbody tr").first();
    const userDisplayName = TRIPS[0].user.display_name;

    expect(firstRow.contains(userDisplayName)).toBeTruthy();
  });

  it("shows the user picture", () => {
    const wrapper = shallow(component);
    const firstRow = wrapper.find("tbody tr").first();
    const image = firstRow.find("img");
    const expectedPictureUrl = TRIPS[0].user.picture;

    expect(image.prop("src")).toEqual(expectedPictureUrl);
  });

  it("shows the trip price", () => {
    const wrapper = shallow(component);
    const firstRow = wrapper.find("tbody tr").first();
    const price = TRIPS[0].price.string_value;

    expect(firstRow.contains(price)).toBeTruthy();
  });
});

const TRIPS = [
  {
    permanent_id: 1234,
    departure_place: { city_name: "Paris" },
    arrival_place: { city_name: "Marseille" },
    user: {
      display_name: "Martin",
      picture: "https://random.com/foo.jpg"
    },
    price: {
      string_value: "50 €"
    }
  },
  {
    permanent_id: 4321,
    departure_place: { city_name: "Paris" },
    arrival_place: { city_name: "Marseille" },
    user: {
      display_name: "Marie",
      picture: "https://random.com/test.jpg"
    },
    price: {
      string_value: "50 €"
    }
  }
];
