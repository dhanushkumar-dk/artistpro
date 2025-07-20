import React from "react";

const RentModal = ({ show, onClose, onSubmit, rentForm, handleRentChange }) => {
  if (!show) return null;

  const minRentDate = new Date().toISOString().split("T")[0];
  const minReturnDate = rentForm.rentedDate
    ? new Date(new Date(rentForm.rentedDate).getTime() + 86400000)
        .toISOString()
        .split("T")[0]
    : minRentDate;

  return (
    <div className="modal d-block bg-dark bg-opacity-75">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Rent Instrument</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>
          <form onSubmit={onSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Rent Date</label>
                <input
                  type="date"
                  name="rentedDate"
                  className="form-control"
                  required
                  min={minRentDate}
                  value={rentForm.rentedDate}
                  onChange={handleRentChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Expected Return Date</label>
                <input
                  type="date"
                  name="expectedReturnDate"
                  className="form-control"
                  required
                  min={minReturnDate}
                  value={rentForm.expectedReturnDate}
                  onChange={handleRentChange}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-success">
                Confirm Rent
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RentModal;
