export const ViewAllCard = () => {
  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <div className="h-100 shadow-sm d-flex flex-column align-items-center justify-content-center">
        <div className="d-flex flex-column align-items-center justify-content-center py-3">
          <a
            href="./events#event_container"
            className="text-decoration-none text-dark"
          >
            <div
              className="rounded-circle shadow d-flex align-items-center justify-content-center mb-2"
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#f8f9fa",
              }}
            >
              &rarr;
            </div>
            <p className="mb-0 fw-semibold">View All</p>
          </a>
        </div>
      </div>
    </div>
  );
};
