import PropTypes from "prop-types";
import React, { useReducer } from "react";
import "./style.css";

const reducer = (state, action) => {
  switch (action) {
    case "click":
      return {
        property1: state.property1 === "off" ? "on" : "off",
      };
    default:
      return state;
  }
};

export const ToggleButton = ({ property1, className, onClick, modeOn }) => {
  const [state, dispatch] = useReducer(reducer, {
    property1: property1 || "off",
  });

  const handleToggleClick = () => {
    dispatch("click"); // Toggle the property1 state
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={`toggle-button ${className}`} onClick={handleToggleClick}>
      <div className={`overlap-group ${modeOn ? "on" : "off"}`}>
        <div className="ellipse" />
      </div>
    </div>
  );
};

ToggleButton.propTypes = {
  property1: PropTypes.oneOf(["off", "on"]),
  onClick: PropTypes.func,
};

export default ToggleButton;
