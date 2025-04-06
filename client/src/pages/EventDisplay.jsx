// EventDisplay.jsx
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const EventDisplay = ({ event }) => {
  const { imageUrl, month, date, time, bookingsCount, artistName, location } =
    event;

  return (
    <div className="card mb-4">
      {/* Event Image */}
      <img
        src={imageUrl}
        className="card-img-top"
        alt="Event"
        style={{ aspectRatio: "1/1", objectFit: "cover" }}
      />

      {/* Card Body */}
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          {/* Left side: Date, Month, Time, and Calendar icon */}
          <div className="d-flex align-items-center gap-2">
            <span>{month}</span>
            <span>{date}</span>
            <span>{time}</span>
            <FaCalendarAlt />
          </div>

          {/* Right side: Booking Count */}
          <div className="text-end">
            <span>{bookingsCount} Bookings</span>
          </div>
        </div>

        {/* Artist Name */}
        <h5 className="card-title">{artistName}</h5>

        {/* Event Location */}
        <p className="card-text">{location}</p>
      </div>
    </div>
  );
};

export default EventDisplay;

// Example usage
// <EventDisplay
//   event={{
//     imageUrl: 'https://example.com/image.jpg',
//     month: 'April',
//     date: '06',
//     time: '7:00 PM',
//     bookingsCount: 250,
//     artistName: 'John Doe',
//     location: 'Los Angeles, CA'
//   }}
// />
