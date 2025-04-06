// EventPage.jsx
import React, { useState } from "react";
import EventsBanner from "../components/EventsBanner";
import SellingFast from "../components/SellingFast";
import VenuesNearYou from "../components/VenuesNearYou";
import FeaturedFestivals from "../components/FeaturedFestivals";
import FooterEvent from "../components/FooterEvent";

const Events = () => {
  const [filter, setFilter] = useState("All");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <div>
      <EventsBanner />

      <div className="filters-tab">
        <button onClick={() => handleFilterChange("This Week")}>
          This Week
        </button>
        <button onClick={() => handleFilterChange("This Month")}>
          This Month
        </button>
        <button onClick={() => handleFilterChange("Genres")}>
          Different Music Genres
        </button>
        <button onClick={() => handleFilterChange("Live Streams")}>
          Live Streams
        </button>
        <button onClick={() => handleFilterChange("All")}>Reset Filter</button>
      </div>

      <SellingFast filter={filter} />
      <VenuesNearYou filter={filter} />
      <FeaturedFestivals filter={filter} />

      <FooterEvent />
    </div>
  );
};

export default Events;
