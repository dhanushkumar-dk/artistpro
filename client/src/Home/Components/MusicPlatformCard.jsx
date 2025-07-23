// src/components/MusicPlatformCard.jsx

const MusicPlatformCard = ({ imgSrc, alt, name }) => {
  return (
    <div className="col-12 col-sm-6 col-md-4">
      <div className="card flex-row p-2 d-flex align-items-center justify-content-between">
        <img src={imgSrc} alt={alt} width="40" height="40" className="me-3" />
        <p className="text-success fw-bold m-0 p-0">{name}</p>
        <button className="btn btn-sm mx-2 text-white bg-dark rounded-pill">
          Connect
        </button>
      </div>
    </div>
  );
};

export default MusicPlatformCard;
