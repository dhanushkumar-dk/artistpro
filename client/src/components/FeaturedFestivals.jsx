import React from "react";

const FeaturedFestivals = ({ filters }) => {
  const festivals = [
    {
      id: 1,
      name: "Sunburst Festival",
      location: "Miami",
      genre: "Electronic",
    },
    { id: 2, name: "Roots Revival", location: "Nashville", genre: "Country" },
    { id: 3, name: "Urban Beats", location: "New York", genre: "Hip Hop" },
    { id: 4, name: "Harmony Fest", location: "San Francisco", genre: "Folk" },
    { id: 5, name: "Metal Storm", location: "Denver", genre: "Metal" },
    { id: 6, name: "Jazz & Soul Jam", location: "New Orleans", genre: "Jazz" },
    { id: 7, name: "Poptopia", location: "Los Angeles", genre: "Pop" },
    { id: 8, name: "Reggae Waves", location: "Jamaica", genre: "Reggae" },
    {
      id: 9,
      name: "Gospel Light",
      location: "Atlanta",
      genre: "Christian/Gospel",
    },
    { id: 10, name: "AltVerse", location: "Seattle", genre: "Alternative" },
  ];
  const filteredFestivals = festivals.filter(
    (festival) => filters.length === 0 || filters.includes(festival.genre)
  );

  return (
    <section className="my-5">
      <div className="container">
        <h2 className="mb-3 fw-bold text-warning">Featured Festivals</h2>

        {filteredFestivals.length === 0 ? (
          <p className="text-danger">No festivals match your filters.</p>
        ) : (
          <div className="row">
            {filteredFestivals.map((festival) => (
              <div key={festival.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card shadow-sm h-100 border-0 rounded-4">
                  <div className="card-body">
                    <h5 className="card-title text-dark">{festival.name}</h5>
                    <p className="card-text text-muted mb-1">
                      <strong>Genre:</strong> {festival.genre}
                    </p>
                    <p className="card-text text-muted">
                      <strong>Location:</strong> {festival.location}
                    </p>
                    <button className="btn btn-sm btn-outline-warning mt-2">
                      View Festival
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

export default FeaturedFestivals;
