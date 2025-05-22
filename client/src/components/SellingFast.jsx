import React from "react";

const SellingFast = ({ filters }) => {
  // Placeholder event data
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
    { id: 6, name: "Latin Vibes", genre: "Latin", date: "2025-04-13" },
    { id: 7, name: "Hip Hop Blast", genre: "Hip Hop", date: "2025-04-14" },
    {
      id: 8,
      name: "Classical Evening",
      genre: "Classical",
      date: "2025-04-15",
    },
    { id: 9, name: "Metal Mayhem", genre: "Metal", date: "2025-04-16" },
    { id: 10, name: "R&B Sensations", genre: "R&B/Soul", date: "2025-04-17" },
  ];
  // Filter logic
  const filteredEvents = events.filter(
    (event) => filters.length === 0 || filters.includes(event.genre)
  );

  return (
    <section className="my-5">
      <div className="container">
        <h2 className="mb-3 fw-bold text-primary">Selling Fast</h2>

        {/* Filter tags */}
        <div className="mb-3">
          <strong>Filters:</strong>{" "}
          {filters.length === 0 ? (
            <span className="text-muted">All Events</span>
          ) : (
            filters.map((filter, index) => (
              <span
                key={index}
                className="badge bg-secondary text-white me-2 px-3 py-2 rounded-pill"
              >
                {filter}
              </span>
            ))
          )}
        </div>

        {/* Event List */}
        {filteredEvents.length === 0 ? (
          <p className="text-danger">
            No events found for the selected filters.
          </p>
        ) : (
          <div className="row">
            {filteredEvents.map((event) => (
              <div key={event.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card shadow-sm h-100 border-0 rounded-4">
                  <div className="card-body">
                    <h5 className="card-title text-dark">{event.name}</h5>
                    <p className="card-text text-muted mb-1">
                      <strong>Genre:</strong> {event.genre}
                    </p>
                    <p className="card-text text-muted">
                      <strong>Date:</strong> {event.date}
                    </p>
                    <button className="btn btn-sm btn-outline-primary mt-2">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SellingFast;
