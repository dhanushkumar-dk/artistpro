import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Country, State } from "country-state-city";
import { BACKEND_BASE_URL } from "../config";
import { checkPasswordRules } from "../utils/passwordUtils";
import axios from "axios";

const Register = () => {
  const [role, setRole] = useState("User");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [states, setStates] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordHints, setPasswordHints] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setAllCountries(Country.getAllCountries());
  }, []);

  useEffect(() => {
    if (country) {
      setStates(State.getStatesOfCountry(country));
      setState("");
    } else {
      setStates([]);
    }
  }, [country]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};
    const passwordIssues = checkPasswordRules(password);

    if (!validateEmail(email)) {
      validationErrors.email = "Invalid email format";
    }

    if (passwordIssues.length > 0) {
      validationErrors.password = "Password does not meet requirements";
    }

    setErrors(validationErrors);
    setPasswordHints(passwordIssues);

    if (Object.keys(validationErrors).length > 0) return;

    const selectedCountry = Country.getCountryByCode(country);
    const fullPhone =
      selectedCountry && selectedCountry.phonecode
        ? `+${selectedCountry.phonecode} ${phone}`
        : phone;

    axios
      .post(`${BACKEND_BASE_URL}/register`, {
        role,
        firstName,
        lastName,
        email,
        password,
        phone: fullPhone,
        address,
        country,
        state,
        description,
      })
      .then(() => {
        alert("Registered successfully! Please Login to proceed.");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="card p-4 shadow-lg w-100" style={{ maxWidth: "600px" }}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="mb-0">Register</h3>
            <Link to="/" className="btn btn-outline-primary btn-sm">
              Home
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
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
                <option value="Artist">Artist</option>
                <option value="User">User</option>
              </select>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${
                  errors.password ? "is-invalid" : ""
                }`}
                id="password"
                value={password}
                onChange={(e) => {
                  const pwd = e.target.value;
                  setPassword(pwd);
                  setPasswordHints(checkPasswordRules(pwd));
                }}
                required
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
              {passwordHints.length > 0 && (
                <ul className="mt-2 text-warning small ps-3">
                  {passwordHints.map((hint, index) => (
                    <li key={index}>{hint}</li>
                  ))}
                </ul>
              )}
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
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
                  {allCountries.map((c) => (
                    <option key={c.isoCode} value={c.isoCode}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6 mb-3">
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
                  {states.map((s) => (
                    <option key={s.isoCode} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <div className="input-group">
                <span className="input-group-text">
                  +{Country.getCountryByCode(country)?.phonecode || ""}
                </span>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {role === "Artist" && (
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Artist Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
            )}

            <button type="submit" className="btn btn-primary w-100">
              Register
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            Already have an account? <Link to="/login">Login here</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
