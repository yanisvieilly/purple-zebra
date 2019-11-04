import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadingIcon = () => (
  <div className="row mt-3">
    <div className="col text-center">
      <FontAwesomeIcon icon={faSpinner} size="10x" spin />
    </div>
  </div>
);

export default LoadingIcon;
