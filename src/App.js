import React, { useEffect, useState } from "react";

import { authenticate } from "./authentication";
import MainView from "./main-view";

const App = () => {
  const [authenticationError, setAuthenticationError] = useState(false);

  const setupAuthentication = async () => {
    try {
      await authenticate();
    } catch (error) {
      setAuthenticationError(true);
    }
  };

  useEffect(() => {
    setupAuthentication();
  }, []);

  return (
    <div className="app">
      <MainView authenticationError={authenticationError} />
    </div>
  );
};

export default App;
