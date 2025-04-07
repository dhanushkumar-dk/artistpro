import React, { useState } from "react";
import EventsBanner from "../components/EventsBanner";
import SellingFast from "../components/SellingFast";
import VenuesNearYou from "../components/VenuesNearYou";
import FeaturedFestivals from "../components/FeaturedFestivals";
import FooterEvent from "../components/FooterEvent";

const Events = () => {
  const [selectedFilters, setSelectedFilters] = useState([]); // Track selected filters as an array

  const filters = [
    {
      name: "Today",
      url: "https://www.bandsintown.com/today/genre/all-genres",
    },
    {
      name: "This Week",
      url: "https://www.bandsintown.com/this-week/genre/all-genres",
    },
    {
      name: "This Month",
      url: "https://www.bandsintown.com/this-month/genre/all-genres",
    },
    {
      name: "Choose Dates",
      url: "https://www.bandsintown.com/choose-dates/genre/all-genres?calendarTrigger=true",
    },
    {
      name: "Live Streams",
      url: "https://www.bandsintown.com/all-dates/genre/all-genres?livestreams=true",
    },
    {
      name: "Alternative",
      url: "https://www.bandsintown.com/all-dates/genre/alternative",
    },
    { name: "Blues", url: "https://www.bandsintown.com/all-dates/genre/blues" },
    {
      name: "Christian/Gospel",
      url: "https://www.bandsintown.com/all-dates/genre/christian-gospel",
    },
    {
      name: "Classical",
      url: "https://www.bandsintown.com/all-dates/genre/classical",
    },
    {
      name: "Country",
      url: "https://www.bandsintown.com/all-dates/genre/country",
    },
    {
      name: "Comedy",
      url: "https://www.bandsintown.com/all-dates/genre/comedy",
    },
    {
      name: "Electronic",
      url: "https://www.bandsintown.com/all-dates/genre/electronic",
    },
    { name: "Folk", url: "https://www.bandsintown.com/all-dates/genre/folk" },
    {
      name: "Hip Hop",
      url: "https://www.bandsintown.com/all-dates/genre/hip-hop",
    },
    { name: "Jazz", url: "https://www.bandsintown.com/all-dates/genre/jazz" },
    { name: "Latin", url: "https://www.bandsintown.com/all-dates/genre/latin" },
    { name: "Metal", url: "https://www.bandsintown.com/all-dates/genre/metal" },
    { name: "Pop", url: "https://www.bandsintown.com/all-dates/genre/pop" },
    { name: "Punk", url: "https://www.bandsintown.com/all-dates/genre/punk" },
    {
      name: "R&B/Soul",
      url: "https://www.bandsintown.com/all-dates/genre/rnb-soul",
    },
    {
      name: "Reggae",
      url: "https://www.bandsintown.com/all-dates/genre/reggae",
    },
    { name: "Rock", url: "https://www.bandsintown.com/all-dates/genre/rock" },
    {
      name: "All Genres",
      url: "https://www.bandsintown.com/all-dates/genre/all-genres",
    },
  ];

  // Handle filter selection, toggling between adding and removing filters
  const handleFilterChange = (filterName) => {
    if (filterName === "All Genres") {
      // Reset filters if "All Genres" is selected
      setSelectedFilters([]);
    } else {
      setSelectedFilters((prevSelectedFilters) => {
        if (prevSelectedFilters.includes(filterName)) {
          // If filter is already selected, remove it
          return prevSelectedFilters.filter((filter) => filter !== filterName);
        } else {
          // If filter is not selected, add it
          return [...prevSelectedFilters, filterName];
        }
      });
    }
  };

  return (
    <div>
      <EventsBanner />

      {/* Scrollable Navbar-style filter section */}
      <div className="container-fluid mt-4">
        <div
          className="d-flex overflow-auto py-2"
          style={{ whiteSpace: "nowrap" }}
        >
          {/* Map through the filters array and render filter buttons */}
          {filters.map((filterItem) => (
            <a
              key={filterItem.name}
              href={filterItem.url}
              className={`nav-item nav-link mx-2 ${
                selectedFilters.includes(filterItem.name) ? "active" : "" // Conditionally apply 'active' class
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleFilterChange(filterItem.name); // Toggle filter selection
              }}
              style={{
                display: "inline-block",
                fontSize: "18px", // Font size for the items
                padding: "14px", // Padding for each item
              }}
            >
              {filterItem.name}
            </a>
          ))}
        </div>
      </div>

      {/* Pass the selectedFilters prop to the child components */}
      <SellingFast filters={selectedFilters} />
      <VenuesNearYou filters={selectedFilters} />
      <FeaturedFestivals filters={selectedFilters} />

      <FooterEvent />
    </div>
  );
};

export default Events;
