import axios from "axios";

const getToken = async () =>
  axios.post(
    "https://edge.blablacar.com/token",
    {
      grant_type: "client_credentials",
      client_id: "dummy-client",
      client_secret: "UizxdvqmPxhO7s3IPqy9C5bkmTU9B0zL",
      scopes: ["SCOPE_TRIP_DRIVER", "DEFAULT", "SCOPE_INTERNAL_CLIENT"]
    },
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

const setUpRequestInterceptor = async () => {
  try {
    const { data } = await getToken();

    // We add an axios interceptor to every request, in order to pass the
    // authentication token via the request headers.
    axios.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${data.access_token}`;
      return config;
    });
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const authenticate = async () => {
  try {
    await setUpRequestInterceptor();

    axios.interceptors.response.use(
      response => response,
      async error => {
        // If the API responds with a 401, the token must have expired. So we
        // fetch a new token.
        if (error.response && error.response.status === 401) {
          await setUpRequestInterceptor();
          return;
        }

        return Promise.reject(error);
      }
    );
  } catch (error) {
    throw error;
  }
};
