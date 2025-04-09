import React from "react";

const VenuesNearYou = ({ filters }) => {
  const venues = [
    { id: 1, name: "City Arena", location: "Downtown", genre: "Rock" },
    { id: 2, name: "Jazz Club", location: "Uptown", genre: "Jazz" },
    { id: 3, name: "Open Grounds", location: "Central Park", genre: "Pop" },
    { id: 4, name: "Electric Hall", location: "Midtown", genre: "Electronic" },
    {
      id: 5,
      name: "The Country Barn",
      location: "Countryside",
      genre: "Country",
    },
    {
      id: 6,
      name: "Gospel House",
      location: "Westside",
      genre: "Christian/Gospel",
    },
    { id: 7, name: "Reggae Island", location: "Beachfront", genre: "Reggae" },
    { id: 8, name: "Comedy Cellar", location: "Underground", genre: "Comedy" },
    {
      id: 9,
      name: "Indie Den",
      location: "Warehouse District",
      genre: "Alternative",
    },
    { id: 10, name: "Soul Studio", location: "Old Town", genre: "R&B/Soul" },
  ];
  const filteredVenues = venues.filter(
    (venue) => filters.length === 0 || filters.includes(venue.genre)
  );

  return (
    <section className="my-5">
      <div className="container">
        <h2 className="mb-3 fw-bold text-success">Venues Near You</h2>

        {filteredVenues.length === 0 ? (
          <p className="text-danger">No venues found for selected filters.</p>
        ) : (
          <div className="row">
            {filteredVenues.map((venue) => (
              <div key={venue.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card shadow-sm h-100 border-0 rounded-4">
                  <div className="card-body">
                    <h5 className="card-title text-dark">{venue.name}</h5>
                    <p className="card-text text-muted mb-1">
                      <strong>Genre:</strong> {venue.genre}
                    </p>
                    <p className="card-text text-muted">
                      <strong>Location:</strong> {venue.location}
                    </p>
                    <button className="btn btn-sm btn-outline-success mt-2">
                      Explore Venue
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

export default VenuesNearYou;
