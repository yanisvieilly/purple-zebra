import React, { useEffect, useState } from "react";

import { authenticate } from "./authentication";

const App = () => {
  const [authentication, setAuthentication] = useState({});

  useEffect(() => {
    const setupAuthentication = async () => {
      const payload = await authenticate();
      setAuthentication(payload);
    };

    setupAuthentication();
  }, []);

  return <div className="app"></div>;
};

export default App;
