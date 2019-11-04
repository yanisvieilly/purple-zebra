import axios from "axios";
import moxios from "moxios";

import { authenticate } from "./authentication";

describe("Authentication test suite", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("sets up a request interceptor", done => {
    authenticate();

    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();

      await request.respondWith({
        status: 200,
        response: successResponse
      });

      expect(axios.interceptors.request.handlers[0].fulfilled).toBeDefined();

      const config = { headers: {} };
      const modifiedConfig = {
        headers: { Authorization: `Bearer ${successResponse.access_token}` }
      };

      expect(axios.interceptors.request.handlers[0].fulfilled(config)).toEqual(
        modifiedConfig
      );

      done();
    });
  });
});

const successResponse = {
  access_token: "0123456789"
};
