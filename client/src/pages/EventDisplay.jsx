import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

const EventDisplay = ({ event }) => {
  const { imageUrl, month, date, time, bookingsCount, artistName, location } =
    event;

  return (
    <div className="card shadow-sm border-0 rounded-4 overflow-hidden mb-4">
      {/* Image */}
      <img
        src={imageUrl}
        alt={artistName}
        className="w-100"
        style={{ aspectRatio: "1/1", objectFit: "cover" }}
      />

      {/* Body */}
      <div className="card-body">
        {/* Date and Booking Info */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center gap-2 text-muted small">
            <span>{month}</span>
            <span>{date}</span>
            <span>{time}</span>
            <FaCalendarAlt />
          </div>
          <div className="text-end text-muted small">
            {bookingsCount.toLocaleString()} Bookings
          </div>
        </div>

        {/* Artist Name */}
        <h5 className="card-title mb-1 fw-semibold">{artistName}</h5>

        {/* Location */}
        <p className="card-text text-muted small mb-0">{location}</p>
      </div>
    </div>
  );
};

export default EventDisplay;
