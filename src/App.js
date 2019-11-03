import React, { useEffect, useState } from "react";

import { authenticate } from "./authentication";
import SearchForm from "./search-form";

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
      <div className="container">
        <SearchForm />
      </div>
    </div>
  );
};

export default App;
