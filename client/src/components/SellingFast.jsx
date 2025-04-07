import React from "react";

const SellingFast = ({ filters }) => {
  // Placeholder data for events (replace this with actual event data or API calls)
  const events = [
    { id: 1, name: "Rock Concert", genre: "Rock", date: "2025-04-08" },
    { id: 2, name: "Jazz Festival", genre: "Jazz", date: "2025-04-09" },
    { id: 3, name: "Pop Music Live", genre: "Pop", date: "2025-04-10" },
    { id: 4, name: "Blues Night", genre: "Blues", date: "2025-04-11" },
    {
      id: 5,
      name: "Electronic Beats",
      genre: "Electronic",
      date: "2025-04-12",
    },
  ];

  // Filter events based on selected filters
  const filteredEvents = events.filter((event) => {
    // Check if the event's genre matches any of the selected filters
    return filters.length === 0 || filters.includes(event.genre);
  });

  return (
    <div className="selling-fast">
      <h2>Selling Fast</h2>
      {/* Display selected filters */}
      <div>
        <strong>Selected Filters: </strong>
        {filters.length === 0 ? <span>All Events</span> : filters.join(", ")}
      </div>

      {/* Display filtered events */}
      {filteredEvents.length === 0 ? (
        <p>No events found for the selected filters.</p>
      ) : (
        <ul>
          {filteredEvents.map((event) => (
            <li key={event.id}>
              <strong>{event.name}</strong> - {event.genre} - {event.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SellingFast;
