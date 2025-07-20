import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../config";
import axios from "axios";

const MyInstruments = ({ user }) => {
  // const [user, setUser] = useState(null);
  const [ownedInstruments, setOwnedInstruments] = useState([]);
  const [rentedInstruments, setRentedInstruments] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const viewInstrument = (id) => {
    navigate(`/instrument/${id}`);
  };

  // Function to format date
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString("en-GB"); // "en-GB" gives the format "DD/MM/YYYY"
  };
  // Fetch current user
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`${BACKEND_BASE_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data) {
          // setUser(res.data);
          fetchInstruments(res.data.userId);
        }
      })
      .catch((err) => console.error("Error fetching user: ", err));
  }, []);

  // Fetch instruments for owned and rented
  const fetchInstruments = (userId) => {
    axios
      .get(`${BACKEND_BASE_URL}/instruments`)
      .then((res) => {
        const owned = res.data.filter(
          (instrument) => instrument.userId === userId
        );
        const rented = res.data.filter(
          (instrument) => instrument.renterId === userId
        );

        setOwnedInstruments(owned);
        setRentedInstruments(rented);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching instruments:", err));
  };

  // Function to display instrument status as "Rented" when the status is "not available"
  const getInstrumentStatus = (status) => {
    return status === "not available" ? "Rented" : status;
  };

  const handleReturnInstrument = (instrumentId) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .put(
        `${BACKEND_BASE_URL}/instruments/return/${instrumentId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        // Handle success (e.g., show a success message or update local state)
        alert("Instrument returned and status updated to available!");
        // Re-fetch the instruments to reflect the changes
        fetchInstruments(user.userId);
      })
      .catch((err) => {
        console.error("Error returning instrument: ", err);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="container py-5">
        <h1 className="mb-4 text-center">Instruments</h1>

        {/* Display the user's information */}
        <div className="text-center mb-5">
          <h3>
            Welcome: {user.firstName} {user.lastName}
          </h3>
        </div>

        {/* Section 1: Owned Instruments */}
        <div className="mb-5">
          <h4 className="mb-3">Your Instruments</h4>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Instrument Name</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ownedInstruments.map((instrument) => (
                <tr
                  key={instrument._id}
                  style={{ cursor: "pointer" }}
                  onClick={() => viewInstrument(instrument._id)}
                >
                  <td>{instrument.instrumentName}</td>
                  <td>{instrument.instrumentDescription}</td>
                  <td>${instrument.amount}</td>
                  <td>{getInstrumentStatus(instrument.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Section 2: Rented Instruments */}
        <div>
          <h4 className="mb-3">Your Rented Instruments</h4>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Instrument Name</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Rented Date</th>
                <th>Expected Return</th>
                <th>Status</th>
                <th>Return</th>
              </tr>
            </thead>
            <tbody>
              {rentedInstruments.map((instrument) => (
                <tr
                  key={instrument._id}
                  style={{ cursor: "pointer" }}
                  onClick={() => viewInstrument(instrument._id)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f5f5f5")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "")
                  }
                >
                  <td>{instrument.instrumentName}</td>
                  <td>{instrument.instrumentDescription}</td>
                  <td>${instrument.amount}</td>
                  {/* <td>{instrument.rentedDate}</td>
                  <td>{instrument.expectedReturnDate}</td> */}
                  <td>{formatDate(instrument.rentedDate)}</td>
                  <td>{formatDate(instrument.expectedReturnDate)}</td>
                  <td>{getInstrumentStatus(instrument.status)}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-warning btn-sm ml-2"
                      onClick={() => handleReturnInstrument(instrument._id)}
                    >
                      Return
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyInstruments;
