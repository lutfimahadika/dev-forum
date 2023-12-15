import React from "react";
import PropTypes from "prop-types";

export default function FormHeading({ heading, text }) {
  return (
    <div className="form-heading">
      <h2>{heading}</h2>
      <p>{text}</p>
    </div>
  );
}

FormHeading.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
