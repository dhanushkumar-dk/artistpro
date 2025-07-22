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
  const [currentTab, setCurrentTab] = useState(0);
  const [emailAvailable, setEmailAvailable] = useState(null); // null | true | false
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

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

  const checkEmailAvailability = async (email) => {
    setCheckingEmail(true);
    try {
      const res = await axios.post(`${BACKEND_BASE_URL}/check-email`, {
        email,
      });
      // 200 => Available
      if (res.status === 200) {
        setEmailAvailable(true);
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    } catch (err) {
      if (err.response && err.response.status === 409) {
        // Email already exists
        setEmailAvailable(false);
        setErrors((prev) => ({ ...prev, email: "Email already registered" }));
      } else {
        // Other unexpected error
        setErrors((prev) => ({
          ...prev,
          email: "Server error. Try again later.",
        }));
      }
    } finally {
      setCheckingEmail(false);
    }
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!otpVerified) {
      alert("Please verify your email using OTP before registering.");
      return;
    }

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
    const fullPhone = selectedCountry?.phonecode
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

  const nextTab = () => setCurrentTab((prev) => Math.min(prev + 1, 3));
  const prevTab = () => setCurrentTab((prev) => Math.max(prev - 1, 0));

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow-lg w-100" style={{ maxWidth: "600px" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="mb-0">Register</h3>
          <Link to="/" className="btn btn-outline-primary btn-sm">
            Home
          </Link>
        </div>

        {/* Tab Navigation */}
        <ul className="nav nav-tabs mb-3">
          {["Role", "Account", "Details", "Contact"].map((label, idx) => (
            <li className="nav-item" key={idx}>
              <button
                className={`nav-link ${currentTab === idx ? "active" : ""}`}
                onClick={() => setCurrentTab(idx)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit}>
          {/* TAB 1: Role */}
          {currentTab === 0 && (
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
          )}

          {/* TAB 2: Email + Password */}
          {currentTab === 1 && (
            <>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                {/* // Trigger check when user leaves email input field */}
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() =>
                    validateEmail(email) && checkEmailAvailability(email)
                  }
                  required
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
                {checkingEmail && (
                  <div className="text-info small mt-1">Checking email...</div>
                )}
                {emailAvailable && !errors.email && (
                  <div className="text-success small mt-1">
                    Email is available
                  </div>
                )}
              </div>

              {!otpVerified && !otpSent && (
                <button
                  type="button"
                  className="btn btn-outline-info btn-sm mt-2"
                  disabled={
                    !validateEmail(email) || !emailAvailable || checkingEmail
                  }
                  onClick={async () => {
                    try {
                      // eslint-disable-next-line no-unused-vars
                      const res = await axios.post(
                        `${BACKEND_BASE_URL}/send-otp`,
                        { email }
                      );
                      alert("OTP sent to your email.");
                      setOtpSent(true);
                    } catch (err) {
                      alert("Failed to send OTP. Try again.");
                    }
                  }}
                >
                  Send OTP
                </button>
              )}

              {!otpVerified && otpSent && (
                <>
                  <label htmlFor="otp" className="form-label mt-2">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-success btn-sm mt-2"
                    onClick={async () => {
                      try {
                        const res = await axios.post(
                          `${BACKEND_BASE_URL}/verify-otp`,
                          {
                            email,
                            otp,
                          }
                        );
                        if (res.data.verified) {
                          alert("OTP verified successfully.");
                          setOtpVerified(true);
                        } else {
                          alert("Invalid OTP.");
                        }
                      } catch (err) {
                        alert("OTP verification failed.");
                      }
                    }}
                  >
                    Verify OTP
                  </button>
                </>
              )}

              {otpVerified && (
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
              )}
            </>
          )}

          {/* TAB 3: First/Last Name + Country/State */}
          {currentTab === 2 && (
            <>
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
            </>
          )}

          {/* TAB 4: Phone, Address (+ Optional Description) */}
          {currentTab === 3 && (
            <>
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
                  />
                </div>
              )}
            </>
          )}

          {/* Navigation Buttons */}
          <div className="d-flex justify-content-between mt-4">
            {currentTab > 0 && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={prevTab}
              >
                Previous
              </button>
            )}

            {currentTab < 3 ? (
              <button
                type="button"
                className="btn btn-primary ms-auto"
                onClick={nextTab}
              >
                Next
              </button>
            ) : (
              <button type="submit" className="btn btn-success ms-auto">
                Register
              </button>
            )}
          </div>
        </form>

        <p className="text-center mt-3 mb-0">
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </div>
    </div>
  );
};

export default Register;
