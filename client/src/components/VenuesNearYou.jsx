// VenuesNearYou.jsx
import React from "react";

const VenuesNearYou = ({ filter }) => {
  return (
    <div className="venues-near-you">
      <h2>Venues Near You - Filter: {filter}</h2>
      {/* Display venues based on filter */}
    </div>
  );
};

export default VenuesNearYou;
