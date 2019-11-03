import React, { useEffect, useState } from "react";

import { authenticate } from "./authentication";
import MainView from "./main-view";

const App = () => {
  const [authentication, setAuthentication] = useState({});

  useEffect(() => {
    const setupAuthentication = async () => {
      const payload = await authenticate();
      setAuthentication(payload);
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
