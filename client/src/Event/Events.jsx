import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BACKEND_BASE_URL } from "../config";

import EventsBanner from "./Components/EventsBanner";
import EventCard from "./Components/EventCard"; // import here

const Events = ({ userData }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState(""); // new state for search input

  const location = useLocation(); //  get current location
  const navigate = useNavigate();

  const staticFilters = ["All Genres", "Today", "This Week", "This Month"];

  const isAllGenresSelected = selectedFilters.length === 0;

  const handleFilterChange = (filterName) => {
    if (filterName === "All Genres") {
      setSelectedFilters([]);
    } else {
      setSelectedFilters((prev) =>
        prev.includes(filterName)
          ? prev.filter((f) => f !== filterName)
          : [...prev, filterName]
      );
    }
  };

  const removeFilter = (filterName) => {
    setSelectedFilters((prev) => prev.filter((f) => f !== filterName));
  };

  const handleAddEventClick = () => {
    navigate("/events/add");
  };

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]); //  run whenever location changes

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // const response = await axios.get(process.env.REACT_APP_EVENTS_API);
        const response = await axios.get(`${BACKEND_BASE_URL}/eventsdata`);
        if (response.data.success) {
          const eventData = response.data.events;
          setEvents(eventData);

          const dynamicGenres = Array.from(
            new Set(eventData.map((e) => e.genre).filter(Boolean))
          );

          const combined = [...staticFilters];
          dynamicGenres.forEach((genre) => {
            if (!combined.includes(genre)) {
              combined.push(genre);
            }
          });

          setFilters(combined.map((name) => ({ name })));
        } else {
          setError("No events found");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to fetch events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white">
      <EventsBanner />

      <div className="text-center my-1">
        <h2 className="fw-bold m-0">Discover Events</h2>
        <p className="text-muted m-0">Filter by genre, time, or experience</p>
      </div>

      <div className=" m-0">
        <input
          type="text"
          className="form-control rounded-pill"
          placeholder="Search for concerts, artists, or events..."
          style={{
            maxWidth: "50%",
            margin: "10px auto",
            padding: "5px 15px",
          }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)} // handle input change
        />
      </div>

      {/* Filters */}
      <div className="container-fluid mt-3">
        <div
          className="d-flex overflow-auto py-2 px-3 bg-white shadow-sm sticky-top z-2"
          style={{ whiteSpace: "nowrap", gap: "10px" }}
        >
          {filters.map((filterItem) => (
            <button
              key={filterItem.name}
              type="button"
              className={`btn ${
                selectedFilters.includes(filterItem.name) ||
                (filterItem.name === "All Genres" && isAllGenresSelected)
                  ? "btn-primary text-white  btn-sm"
                  : "btn-outline-secondary  btn-sm"
              }`}
              onClick={() => handleFilterChange(filterItem.name)}
              style={{
                fontSize: "14px",
                borderRadius: "50px",
                transition: "all 0.3s ease",
                whiteSpace: "nowrap",
              }}
            >
              {filterItem.name}
            </button>
          ))}
        </div>
      </div>

      {/* Active Filters */}
      {!isAllGenresSelected && (
        <div className="container mt-3 mb-2">
          <div className="d-flex flex-wrap align-items-center gap-2">
            <span className="text-muted">Active Filters:</span>
            {selectedFilters.map((filter) => (
              <span
                key={filter}
                className="badge rounded-pill bg-primary d-flex align-items-center"
                style={{ padding: "6px 12px" }}
              >
                {filter}
                <button
                  type="button"
                  onClick={() => removeFilter(filter)}
                  className="btn-close btn-close-white btn-sm ms-2"
                  aria-label="Remove"
                  style={{ fontSize: "10px" }}
                ></button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Add Event Button */}
      <div className="text-center my-2">
        <button className="btn btn-success" onClick={handleAddEventClick}>
          Add New Event
        </button>
      </div>

      {/* Event List */}
      <div className="my-2 bg-white" id="event_container">
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div className="d-flex flex-wrap mx-2 mx-md-5">
            {events
              .filter(
                (event) =>
                  (isAllGenresSelected
                    ? true
                    : selectedFilters.includes(event.genre)) &&
                  ((event.name &&
                    event.name
                      .toLowerCase()
                      .includes(searchInput.toLowerCase())) ||
                    (event.artist &&
                      event.artist
                        .toLowerCase()
                        .includes(searchInput.toLowerCase())))
              )
              .map((event) => (
                <EventCard key={event._id} event={event} userData={userData} />
              ))}
          </div>
        )}
      </div>

      {/* <FooterEvent /> */}
    </div>
  );
};

export default Events;
