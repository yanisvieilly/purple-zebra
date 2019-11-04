import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import moxios from "moxios";

import MainView from "./main-view";
import SearchForm from "./search-form";
import CitySelector from "./city-selector";
import TripsList from "./trips-list";

describe("MainView test suite", () => {
  let component;

  describe("when there is no authentication error", () => {
    beforeEach(() => {
      component = <MainView authenticationError={false} />;
    });

    it("renders without crashing", () => {
      shallow(component);
    });

    it("renders the SearchForm component", () => {
      const searchForm = shallow(component).find(SearchForm);

      expect(searchForm.exists()).toBeTruthy();
    });

    describe("when the from city changes", () => {
      beforeEach(() => {
        moxios.install();
      });

      afterEach(() => {
        moxios.uninstall();
      });

      it("fetches the trips", done => {
        const wrapper = mount(component);

        wrapper
          .find(CitySelector)
          .first()
          .find("select")
          .simulate("change", { target: { value: "Bordeaux" } });

        moxios.wait(async () => {
          const request = moxios.requests.mostRecent();

          await act(async () =>
            request.respondWith({
              status: 200,
              response: successResponse
            })
          );

          wrapper.update();

          const trips = wrapper.find(TripsList).prop("trips");

          expect(trips).toEqual(successResponse.trips);

          done();
        });
      });
    });
  });

  describe("when there is an authentication error", () => {
    beforeEach(() => {
      component = <MainView authenticationError={true} />;
    });

    it("renders without crashing", () => {
      shallow(component);
    });

    it("doesn't render the SearchForm component", () => {
      const searchForm = shallow(component).find(SearchForm);

      expect(searchForm.exists()).toBeFalsy();
    });
  });
});

const successResponse = {
  trips: [
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
  ]
};
