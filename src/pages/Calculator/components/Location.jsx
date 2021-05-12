import React, { useState } from "react";
import { Modal } from "@material-ui/core";
import PropTypes from "prop-types";
import MapContainer from "../../../components/MapContainer/MapContainer";
import "./Location.scss";

const Location = React.memo(({ place, units, cost }) => {
  const [open, setOpen] = useState(false);

  const showModal = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <label>Locations</label>
      <div className="location">
        <div className="location-item">
          <label>Place</label>
        </div>
        <div className="location-item">
          <label>Units</label>
        </div>
        <div className="location-item">
          <label>Cost</label>
        </div>
        <div className="location-item">
          <button onClick={showModal}>Add</button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={onClose}
        BackdropProps={{ style: { background: "white", opacity: 0.8, backdropFilter: "blur(8px)" } }}
        className="modal-map"
      >
        <div className="map-container">
          <MapContainer />
        </div>
      </Modal>
    </React.Fragment>
  );
});

Location.defaultProps = {
  place: null,
  units: 0,
  cost: 0
};

Location.propTypes = {
  place: PropTypes.object,
  units: PropTypes.number,
  cost: PropTypes.number
};

export default Location;
