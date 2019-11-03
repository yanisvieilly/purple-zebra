import React from "react";

const AuthenticationErrorAlert = () => (
  <div className="row mt-3">
    <div className="col">
      <div className="alert alert-danger" role="alert">
        Could not authenticate to BlaBlaCar API.
      </div>
    </div>
  </div>
);

export default AuthenticationErrorAlert;
