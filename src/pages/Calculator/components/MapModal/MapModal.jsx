import React from "react";
import { Modal } from "@material-ui/core";
import MapContainer from "../../../../components/MapContainer/MapContainer";
import "./MapModal.scss";

const MapModal = ({ open, onClose, handleGetLocations, listIdAdded }) => {
  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={onClose}
        BackdropProps={{ style: { background: "#f2f2f2", opacity: 0.8, backdropFilter: "blur(8px)" } }}
        className="modal-map"
      >
        <div className="map-container">
          <MapContainer handleGetLocations={handleGetLocations} onClose={onClose} listIdAdded={listIdAdded} />
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default MapModal;
