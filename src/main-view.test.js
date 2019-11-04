import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import moxios from "moxios";

import MainView from "./main-view";
import SearchForm from "./search-form";
import CitySelector from "./city-selector";
import TripsList from "./trips-list";
import AuthenticationErrorAlert from "./authentication-error-alert";
import TripsListLoadingErrorAlert from "./trips-list-loading-error-alert";

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

    it("doesn't display an error message regarding authentication", () => {
      const authenticationErrorAlert = shallow(component).find(
        AuthenticationErrorAlert
      );

      expect(authenticationErrorAlert.exists()).toBeFalsy();
    });

    describe("when the from city changes", () => {
      beforeEach(() => {
        moxios.install();
      });

      afterEach(() => {
        moxios.uninstall();
      });

      describe("when the request to /trips is successful", () => {
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

            const tripsList = wrapper.find(TripsList);
            expect(tripsList.exists()).toBeTruthy();

            const trips = tripsList.prop("trips");
            expect(trips).toEqual(successResponse.trips);

            const tripsListLoadingErrorAlert = wrapper.find(
              TripsListLoadingErrorAlert
            );
            expect(tripsListLoadingErrorAlert.exists()).toBeFalsy();

            done();
          });
        });
      });

      describe("when the request to /trips is unsuccessful", () => {
        it("displays an error message", done => {
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
                status: 500,
                response: { message: "Internal server error" }
              })
            );

            wrapper.update();

            const tripsList = wrapper.find(TripsList);
            expect(tripsList.exists()).toBeFalsy();

            const tripsListLoadingErrorAlert = wrapper.find(
              TripsListLoadingErrorAlert
            );
            expect(tripsListLoadingErrorAlert.exists()).toBeTruthy();

            done();
          });
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

    it("displays an error message regarding authentication", () => {
      const authenticationErrorAlert = shallow(component).find(
        AuthenticationErrorAlert
      );

      expect(authenticationErrorAlert.exists()).toBeTruthy();
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
