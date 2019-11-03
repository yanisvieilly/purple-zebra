import React, { useEffect } from "react";

import { authenticate } from "./authentication";
import MainView from "./main-view";

const App = () => {
  useEffect(() => {
    const setupAuthentication = async () => {
      await authenticate();
    };

    setupAuthentication();
  }, []);

  return (
    <div className="app">
      <MainView />
    </div>
  );
};

export default App;
