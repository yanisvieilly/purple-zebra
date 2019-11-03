export const authenticate = async () => {
  const response = await fetch("https://edge.blablacar.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: "dummy-client",
      client_secret: "UizxdvqmPxhO7s3IPqy9C5bkmTU9B0zL",
      scopes: ["SCOPE_TRIP_DRIVER", "DEFAULT", "SCOPE_INTERNAL_CLIENT"]
    })
  });

  return response.json();
};
