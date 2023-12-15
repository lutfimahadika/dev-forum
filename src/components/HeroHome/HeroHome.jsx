import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import PopularTagsCategory from "../PopularTagsCategory/PopularTagsCategory";

export default function HeroHome({ threads }) {
  return (
    <div className="hero">
      {threads.map((thread, index) => (
        <PopularTagsCategory key={thread.id} {...thread} index={index} />
      ))}
      <Link to="/new" className="add-discuss-btn">
        Buat Diskusi Baru
        <HiPlus size={20} fill="white" />
      </Link>
    </div>
  );
}

HeroHome.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.string).isRequired,
};
