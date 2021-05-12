import React from "react";
import PropTypes from "prop-types";

const Location = React.memo(({ place, units, cost }) => {
  return (
    <React.Fragment>
      <label>Locations</label>
      <div className="location">
        <div className="location-item">
          <label>Place</label>
          <div className="">{place?.name}</div>
        </div>
        <div className="location-item">
          <label>Units</label>
          <div className="">{units}</div>
        </div>
        <div className="location-item">
          <label>Cost</label>
          <div className="">{cost}</div>
        </div>
      </div>
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
