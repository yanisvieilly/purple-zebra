import React, { memo } from "react";

const TripsListLoadingErrorAlert = memo(() => (
  <div className="row mt-3">
    <div className="col">
      <div className="alert alert-danger" role="alert">
        Could not load the results.
      </div>
    </div>
  </div>
));

export default TripsListLoadingErrorAlert;
