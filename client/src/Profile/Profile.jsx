import { useEffect, useState } from "react";
import axios from "axios";
import HeaderBanner from "../Others/Banners/HeaderBanner";
import ProfileNavbar from "./Components/ProfileNavbar";
import { Country, State } from "country-state-city";

// ✅ Password Validator Utility
const checkPasswordRules = (password) => {
  const issues = [];
  const specialChars = password.match(/[@#$%/]/g) || [];
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);

  if (password.length < 8) issues.push("Minimum 8 characters required");
  if (specialChars.length < 1)
    issues.push("At least 1 special character required (@, #, $, %, /)");
  if (!hasLower) issues.push("At least 1 lowercase letter required");
  if (!hasUpper) issues.push("At least 1 uppercase letter required");
  if (!hasDigit) issues.push("At least 1 number required");

  return issues;
};

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allCountries, setAllCountries] = useState([]);
  const [statesForCountry, setStatesForCountry] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5000/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data) {
          setUser(res.data);
          setFormData(res.data);
          setIsLoggedIn(true);

          if (res.data.country) {
            const selectedCountry = Country.getAllCountries().find(
              (c) => c.isoCode === res.data.country
            );
            if (selectedCountry) {
              const states = State.getStatesOfCountry(selectedCountry.isoCode);
              setStatesForCountry(states);
            }
          }
        }
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  useEffect(() => {
    const countries = Country.getAllCountries();
    setAllCountries(countries);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      const issues = checkPasswordRules(value);
      setPasswordErrors(issues);
    }
  };

  const handleCountryChange = (e) => {
    const selectedIso = e.target.value;
    setFormData((prev) => ({ ...prev, country: selectedIso, state: "" }));

    const selectedCountry = Country.getCountryByCode(selectedIso);
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry.isoCode);
      setStatesForCountry(states);
    }
  };

  const handleEdit = () => setIsEditing(true);

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
    setPasswordErrors([]);
    setValidationError("");
  };

  const handleSave = () => {
    const token = localStorage.getItem("token");

    if (formData.password) {
      const issues = checkPasswordRules(formData.password);
      if (issues.length > 0) {
        setPasswordErrors(issues);
        setValidationError("Password does not meet security requirements.");
        return;
      }
    }

    axios
      .put("http://localhost:5000/user", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setUser(formData);
        setIsEditing(false);
        setPasswordErrors([]);
        setValidationError("");
      })
      .catch((err) => console.error("Save failed:", err));
  };

  const renderField = (label, name, type = "text", half = false) => (
    <div className={`mb-3 ${half ? "col-md-6" : "col-12"}`}>
      <label className="form-label text-secondary fw-semibold">{label}</label>
      {isEditing ? (
        <>
          <input
            type={type}
            className="form-control"
            name={name}
            value={formData[name] || ""}
            onChange={handleChange}
            required
          />
          {name === "password" && passwordErrors.length > 0 && (
            <ul className="text-warning small ps-3 mt-2">
              {passwordErrors.map((err, idx) => (
                <li key={idx}>{err}</li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <div className="form-control bg-light">{user[name] || "-"}</div>
      )}
    </div>
  );

  if (!user)
    return (
      <>
        <HeaderBanner />
        <ProfileNavbar />
        <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
          <div className="spinner-border text-primary" />
        </div>
      </>
    );

  return (
    <>
      <HeaderBanner />
      <ProfileNavbar />

      <div className="container my-0 d-flex justify-content-center bg-white py-5">
        <div className="card shadow-lg p-4 w-100" style={{ maxWidth: "800px" }}>
          <div className="d-flex justify-content-between align-items-start flex-wrap mb-4">
            <div>
              <h3 className="fw-bold">
                Welcome,{" "}
                <span className="text-primary">
                  {isLoggedIn ? `${user.firstName} ${user.lastName}` : "Guest"}
                </span>
              </h3>
              <p className="text-muted mb-0">Manage your profile information</p>
            </div>

            <div className="mt-3 mt-md-0">
              {!isEditing ? (
                <button
                  className="btn btn-outline-primary px-4"
                  onClick={handleEdit}
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-outline-secondary me-2"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button className="btn btn-success" onClick={handleSave}>
                    Save
                  </button>
                </>
              )}
            </div>
          </div>

          {validationError && (
            <div className="alert alert-danger">{validationError}</div>
          )}

          <hr />

          {/* Description */}
          <div className="mb-4">
            <label className="form-label text-secondary fw-semibold">
              Description
            </label>
            {isEditing ? (
              <textarea
                className="form-control"
                rows={3}
                name="description"
                value={formData.description || ""}
                onChange={handleChange}
              />
            ) : (
              <div
                className="form-control bg-light"
                style={{ minHeight: "75px" }}
              >
                {user.description || "No description available."}
              </div>
            )}
          </div>

          {/* Fields */}
          <div className="row">
            {renderField("First Name", "firstName", "text", true)}
            {renderField("Last Name", "lastName", "text", true)}

            <div className="mb-3 col-md-6">
              <label className="form-label text-secondary fw-semibold">
                Email
              </label>
              <div className="form-control bg-light">{user.email || "-"}</div>
            </div>

            {renderField("Password", "password", "password", true)}

            {/* Country */}
            <div className="mb-3 col-md-6">
              <label className="form-label text-secondary fw-semibold">
                Country
              </label>
              {isEditing ? (
                <select
                  className="form-select"
                  name="country"
                  value={formData.country || ""}
                  onChange={handleCountryChange}
                >
                  <option value="">Select Country</option>
                  {allCountries.map((c) => (
                    <option key={c.isoCode} value={c.isoCode}>
                      {c.name}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="form-control bg-light">
                  {allCountries.find((c) => c.isoCode === user.country)?.name ||
                    "-"}
                </div>
              )}
            </div>

            {/* State */}
            <div className="mb-3 col-md-6">
              <label className="form-label text-secondary fw-semibold">
                State
              </label>
              {isEditing ? (
                <select
                  className="form-select"
                  name="state"
                  value={formData.state || ""}
                  onChange={handleChange}
                  disabled={!formData.country}
                >
                  <option value="">Select State</option>
                  {statesForCountry.map((s) => (
                    <option key={s.isoCode} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="form-control bg-light">{user.state || "-"}</div>
              )}
            </div>

            {/* Address */}
            <div className="mb-3 col-12">
              <label className="form-label text-secondary fw-semibold">
                Address
              </label>
              {isEditing ? (
                <textarea
                  className="form-control"
                  name="address"
                  rows={2}
                  value={formData.address || ""}
                  onChange={handleChange}
                />
              ) : (
                <div className="form-control bg-light">
                  {user.address || "-"}
                </div>
              )}
            </div>

            {/* Phone Number (read-only) */}
            <div className="mb-3 col-md-6">
              <label className="form-label text-secondary fw-semibold">
                Phone Number
              </label>
              <div className="form-control bg-light">{user.phone || "-"}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
