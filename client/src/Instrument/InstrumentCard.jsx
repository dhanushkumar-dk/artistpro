import { useNavigate } from "react-router-dom";

const InstrumentCard = ({ instrument, userId, handleOpenRentModal }) => {
  const navigate = useNavigate();

  if (userId === instrument.userId) return null;

  return (
    <div className="col-10 col-sm-6 col-md-4 col-lg-3 mx-auto p-1 p-sm-2 p-md-3 p-lg-4">
      <div className="card shadow-lg rounded-3 border-dark">
        {/* Image */}
        <div
          style={{
            width: "100%",
            paddingTop: "100%",
            position: "relative",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <img
            src={`http://localhost:5000/uploads/${instrument.image}`}
            alt={instrument.instrumentName}
            className="card-img-top"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        <hr className="m-0 p-0 border border-dark border-2 opacity-50" />

        {/* Instrument Info */}
        <div className="card-body p-2 col-12" style={{ fontSize: "0.6rem" }}>
          <p className="text-center fw-bold m-0 p-0">
            {instrument.instrumentName}
          </p>
          <div className="row">
            {/* Labels */}
            <div className="col-6 col-md-6">
              <p className="fw-bold p-0 m-0">Owner:</p>
              <p className="fw-bold p-0 m-0">Amount:</p>
              <p className="fw-bold p-0 m-0">Category:</p>
              <p className="fw-bold p-0 m-0">Status:</p>
              <p className="fw-bold p-0 m-0">Contact:</p>

              <button
                className="btn btn-sm btn-warning col-6 col-sm-8 p-0 fw-bold mt-1"
                style={{ fontSize: "0.6rem" }}
                onClick={() =>
                  handleOpenRentModal(instrument._id, instrument.userId)
                }
              >
                Rent
              </button>
            </div>

            {/* Values */}
            <div className="col-6 col-md-6">
              <p className="p-0 m-0">{instrument.userName}</p>
              <p className="p-0 m-0">${instrument.amount}</p>
              <p className="p-0 m-0">{instrument.category}</p>
              <p className="p-0 m-0 text-capitalize">{instrument.status}</p>
              <p className="p-0 m-0">{instrument.contactNumber}</p>

              <button
                onClick={() => navigate(`/instrument/${instrument._id}`)}
                className="btn btn-sm btn-primary col-6 col-sm-8 p-0 fw-bold mt-1"
                style={{ fontSize: "0.6rem" }}
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstrumentCard;
