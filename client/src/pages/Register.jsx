import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const countries = {
  USA: ["California", "Texas", "New York"],
  India: ["Tamil Nadu", "Maharashtra", "Karnataka"],
  UK: ["England", "Scotland", "Wales"],
};

const Register = () => {
  const [role, setRole] = useState("User");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [instruments, setInstruments] = useState([]);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (country) {
      setStates(countries[country]);
      setState(""); // Reset state when country changes
    }
  }, [country]);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/register", {
        role,
        firstName,
        lastName,
        email,
        password,
        country,
        state,
        instruments,
        description,
      })
      .then((result) => {
        console.log(result);
        if (result.data === "Already registered") {
          alert("E-mail already registered! Please Login to proceed.");
          navigate("/login");
        } else {
          alert("Registered successfully! Please Login to proceed.");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div
        className="d-flex justify-content-center align-items-center text-center vh-100"
        style={{
          backgroundImage:
            "linear-gradient(#00d5ff,#0095ff,rgba(93,0,255,.555))",
        }}
      >
        <div className="bg-white p-3 rounded" style={{ width: "40%" }}>
          <h2 className="mb-3 text-primary">Register</h2>
          <form onSubmit={handleSubmit}>
            <select
              className="form-control mb-3"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Musician">Musician</option>
              <option value="Artist">Artist</option>
              <option value="User">User</option>
            </select>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Country Dropdown */}
            <select
              className="form-control mb-3"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="">Choose Country</option>
              {Object.keys(countries).map((c, idx) => (
                <option key={idx} value={c}>
                  {c}
                </option>
              ))}
            </select>

            {/* State Dropdown */}
            <select
              className="form-control mb-3"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              disabled={!country}
            >
              <option value="">Choose State</option>
              {states.map((s, idx) => (
                <option key={idx} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {role === "Musician" && (
              <input
                type="text"
                className="form-control mb-3"
                placeholder="List Instruments (comma-separated)"
                onChange={(e) => setInstruments(e.target.value.split(","))}
                required
              />
            )}
            {role === "Artist" && (
              <textarea
                className="form-control mb-3"
                placeholder="Artist Description"
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            )}
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
          <p className="container my-2">Already have an account?</p>
          <Link to="/login" className="btn btn-secondary">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
