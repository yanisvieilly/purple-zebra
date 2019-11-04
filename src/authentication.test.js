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

      const successfulRequestInterceptor =
        axios.interceptors.request.handlers[0].fulfilled;

      expect(successfulRequestInterceptor).toBeDefined();

      const config = { headers: {} };
      const modifiedConfig = {
        headers: { Authorization: `Bearer ${successResponse.access_token}` }
      };

      expect(successfulRequestInterceptor(config)).toEqual(modifiedConfig);

      done();
    });
  });

  it("sets up a response interceptor", done => {
    authenticate();

    moxios.wait(async () => {
      const request = moxios.requests.mostRecent();

      await request.respondWith({
        status: 200,
        response: successResponse
      });

      const failedResponseInterceptor =
        axios.interceptors.response.handlers[0].rejected;

      expect(failedResponseInterceptor).toBeDefined();

      try {
        await failedResponseInterceptor(errorResponse);
      } catch (error) {
        expect(error).toEqual(errorResponse);
      }

      done();
    });
  });
});

const successResponse = {
  access_token: "0123456789"
};

const errorResponse = { response: { status: 500 } };
