// src/components/EventCard.jsx

export const RecommendationEventCard = ({
  image,
  date,
  title,
  description,
  calendarIcon,
}) => {
  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <div className="card h-100 shadow-sm">
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body">
          <div className="d-flex align-items-center mb-2">
            <img
              src={calendarIcon}
              alt="Calendar"
              width="20"
              height="20"
              className="me-2"
            />
            <p className="mb-0 text-muted small">{date}</p>
          </div>
          <h4 className="card-title">{title}</h4>
          <p className="card-text">{description}</p>
        </div>
      </div>
    </div>
  );
};
