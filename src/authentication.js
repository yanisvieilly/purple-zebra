import axios from "axios";

export const authenticate = async () => {
  const { data } = await axios.post(
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

  axios.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${data.access_token}`;
    return config;
  });

  return data;
};
