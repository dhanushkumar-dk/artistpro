// src/components/InstrumentDisplay.jsx

const InstrumentDisplay = ({ instrument }) => {
  return (
    <div
      className="card shadow-lg"
      style={{ borderRadius: "15px", border: "none" }}
    >
      {/* Instrument Image */}
      <img
        src={instrument.image}
        alt={instrument.name}
        className="card-img-top"
        style={{
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
          height: "200px",
          objectFit: "cover",
        }}
      />

      {/* Card Body */}
      <div className="card-body">
        <h5 className="card-title text-center text-primary font-weight-bold">
          {instrument.name}
        </h5>
        <p className="card-text text-muted">{instrument.description}</p>

        {/* Instrument Details */}
        <div className="d-flex justify-content-between">
          <span className="text-success font-weight-bold">
            Price: ${instrument.price}
          </span>
          <span className="text-info">{instrument.category}</span>
        </div>

        {/* Button */}
        <div className="text-center mt-3">
          <button
            className="btn btn-primary btn-block"
            style={{ borderRadius: "50px", fontWeight: "bold" }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstrumentDisplay;
