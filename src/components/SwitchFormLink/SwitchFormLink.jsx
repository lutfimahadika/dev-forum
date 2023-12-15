import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function SwitchFormLink({ text, link, href }) {
  return (
    <p className="to-register-link">
      {text}
      <Link to={href}>{link}</Link>
    </p>
  );
}

SwitchFormLink.propTypes = {
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};
