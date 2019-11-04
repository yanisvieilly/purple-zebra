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

  describe("response interceptor", () => {
    it("sets up a response interceptor that rejects a promise when status code is not 401", done => {
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

    it("sets up a response interceptor that refreshes the token when the status code is 401", done => {
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

        failedResponseInterceptor(mustRefreshTokenResponse);

        moxios.wait(async () => {
          expect(moxios.requests.count()).toEqual(2);

          const request = moxios.requests.mostRecent();
          expect(request.url).toEqual("https://edge.blablacar.com/token");

          done();
        });
      });
    });
  });
});

const successResponse = {
  access_token: "0123456789"
};

const errorResponse = { response: { status: 500 } };

const mustRefreshTokenResponse = { response: { status: 401 } };
