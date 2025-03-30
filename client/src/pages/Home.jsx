import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h2>Connect, Collaborate, Create</h2>
        <p>Join a network of artists and musicians to make magic together.</p>
        <Link to="/login" className="cta-button">
          Get Started
        </Link>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
