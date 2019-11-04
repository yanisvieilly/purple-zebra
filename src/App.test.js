import React from "react";
import { act } from "react-dom/test-utils";
import { shallow, mount } from "enzyme";
import moxios from "moxios";

import App from "./App";
import MainView from "./main-view";

describe("App test suite", () => {
  let component;

  beforeEach(() => {
    component = <App />;
  });

  it("renders without crashing", () => {
    shallow(component);
  });

  describe("authentication", () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    describe("when the request to /token is successful", () => {
      it("authenticates successfully", done => {
        const wrapper = mount(component);

        moxios.wait(async () => {
          const request = moxios.requests.mostRecent();

          await act(async () =>
            request.respondWith({
              status: 200,
              response: successResponse
            })
          );

          wrapper.update();

          const mainView = wrapper.find(MainView);
          expect(mainView.prop("authenticationError")).toBeFalsy();

          done();
        });
      });
    });

    describe("when the request to /token is unsuccessful", () => {
      it("doesn't authenticate", done => {
        const wrapper = mount(component);

        moxios.wait(async () => {
          const request = moxios.requests.mostRecent();

          await act(async () =>
            request.respondWith({
              status: 500,
              response: { message: "Internal server error" }
            })
          );

          wrapper.update();

          const mainView = wrapper.find(MainView);
          expect(mainView.prop("authenticationError")).toBeTruthy();

          done();
        });
      });
    });
  });
});

const successResponse = {
  access_token: "0123456789"
};
