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
  const { data } = await getToken();

  axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${data.access_token}`;
    return config;
  });
};

export const authenticate = () => {
  setUpRequestInterceptor();

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        setUpRequestInterceptor();
        return;
      }

      return Promise.reject(error);
    }
  );
};
