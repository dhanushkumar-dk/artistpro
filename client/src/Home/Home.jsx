// Landing Page Code url -> https://chatgpt.com/share/68539462-b324-8011-a739-378170872611

// src/pages/Home.jsx
import { Link } from "react-router-dom";
import { ViewAllCard } from "./Components/ViewAllCard";
// Assets
import {
  popularEventsData,
  sellingFastEventsData,
} from "./Assets/homeRecommendationEventsData";

import { RecommendationEventCard } from "./Components/RecommendationEventCard";

import calander_img_logo from "../assets/calander_logo.jpg";
import greyPin from "../assets/greyPin.svg";
import HomeBanner from "./Components/HomeBanner";

const Home = ({ userName }) => {
  return (
    <div className="bg-white">
      <HomeBanner userName={userName} />

      {/* Popular cards section you start  */}
      <div className="container py-5">
        <div className="d-flex justify-content-center align-items-center flex-column">
          <div className="row w-100 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center custom-card p-4 border rounded shadow">
              {/* Row 1: Heading and View All */}
              <div className="row w-100 d-flex justify-content-between align-items-center mb-4">
                <div className="col">
                  <h4>Popular in Chennai, India.</h4>
                  <p>What's happening around you</p>
                </div>
                <div className="col text-end">
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a
                        href="./events#event_container"
                        className="text-decoration-none"
                      >
                        <span className="text-decoration-none">
                          View All &rarr;
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Conditional Rendering */}
              {popularEventsData.length === 0 ? (
                <>
                  <img src={greyPin} alt="No events" />
                  <p className="mt-3 mb-1 fw-bold">No upcoming events</p>
                  <p className="text-muted mb-3">Try something else</p>

                  <div className="d-flex align-items-center justify-content-center gap-3 w-100">
                    <Link
                      href="#"
                      className="btn btn-danger text-white rounded-pill"
                    >
                      Follow More Artists
                    </Link>
                    <Link
                      href="#"
                      className="btn btn-danger text-white rounded-pill"
                    >
                      Adjust My Location
                    </Link>
                  </div>
                </>
              ) : (
                <div className="row g-4">
                  {popularEventsData.map((event, index) => (
                    <RecommendationEventCard
                      key={index}
                      image={event.image}
                      date={event.date}
                      title={event.title}
                      description={event.description}
                      calendarIcon={calander_img_logo}
                    />
                  ))}

                  {/* View All Card */}
                  <ViewAllCard />
                  {/* View All Card End */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Popular cards section you end  */}

      {/* Selling Fast cards section you start */}
      <div className="container py-5">
        <div className="d-flex justify-content-center align-items-center flex-column">
          <div className="row w-100 d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center custom-card p-4 border rounded shadow">
              {/* Row 1: Heading and View All */}
              <div className="row w-100 d-flex justify-content-between align-items-center mb-4">
                <div className="col">
                  <h4>Selling Fast</h4>
                  <p>Get these tickets while you still can</p>
                </div>
                <div className="col text-end">
                  <ul className="list-unstyled mb-0">
                    <li>
                      <a
                        href="./events#event_container"
                        className="text-decoration-none"
                      >
                        <span className="text-decoration-none">
                          View All &rarr;
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Conditional Rendering */}
              {sellingFastEventsData.length === 0 ? (
                <>
                  <img src={greyPin} alt="No events" />
                  <p className="mt-3 mb-1 fw-bold">No upcoming events</p>
                  <p className="text-muted mb-3">Try something else</p>

                  <div className="d-flex align-items-center justify-content-center gap-3 w-100">
                    <Link
                      href="#"
                      className="btn btn-danger text-white rounded-pill"
                    >
                      Follow More Artists
                    </Link>
                    <Link
                      href="#"
                      className="btn btn-danger text-white rounded-pill"
                    >
                      Adjust My Location
                    </Link>
                  </div>
                </>
              ) : (
                <div className="row g-4">
                  {sellingFastEventsData.map((event, index) => (
                    <RecommendationEventCard
                      key={index}
                      image={event.image}
                      date={event.date}
                      title={event.title}
                      description={event.description}
                      calendarIcon={calander_img_logo}
                    />
                  ))}

                  {/* View All Card */}
                  <ViewAllCard />
                  {/* View All Card End */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Selling Fast cards section you end */}
    </div>
  );
};

export default Home;
