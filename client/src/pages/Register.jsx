import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

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
      setState("");
    }
  }, [country]);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/register", {
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
        alert("Registered successfully! Please Login to proceed.");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container mt-5">
      <Link to="/home">
        <button className="btn btn-primary">Home</button>
      </Link>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            className="form-select"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="Musician">Musician</option>
            <option value="Artist">Artist</option>
            <option value="User">User</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="firstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <select
            className="form-select"
            id="country"
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
        </div>
        <div className="mb-3">
          <label htmlFor="state" className="form-label">
            State
          </label>
          <select
            className="form-select"
            id="state"
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
        </div>
        {role === "Musician" && (
          <div className="mb-3">
            <label htmlFor="instruments" className="form-label">
              Instruments
            </label>
            <input
              type="text"
              className="form-control"
              id="instruments"
              placeholder="List instruments (comma separated)"
              value={instruments}
              onChange={(e) => setInstruments(e.target.value.split(","))}
              required
            />
          </div>
        )}
        {role === "Artist" && (
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Artist Description
            </label>
            <textarea
              className="form-control"
              id="description"
              placeholder="Write something about yourself"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
        )}
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <p className="mt-3">
        Already have an account? <a href="/login">Login here</a>.
      </p>
    </div>
  );
};

export default Register;
