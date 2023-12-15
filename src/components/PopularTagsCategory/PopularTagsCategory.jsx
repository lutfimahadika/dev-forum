import React from "react";
import PropTypes, { string } from "prop-types";

export default function PopularTagsCategory({ threads, tag, setTag }) {
  function onTagsHandler(index) {
    setTag(index);

    if (tag === index) {
      setTag("");
    }
  }

  return (
    <div className="popular-tags-category">
      <h1>Kategori Populer</h1>
      <div className="category-tags">
        {threads.map((thread) => (
          <button
            type="button"
            tabIndex={0}
            className={tag === thread.category ? "tags active" : "tags"}
            key={thread.id}
            id={thread.id}
            onClick={() => onTagsHandler(thread.category)}
          >
            {thread.category}
          </button>
        ))}
      </div>
    </div>
  );
}

PopularTagsCategory.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: string.isRequired,
      category: string.isRequired,
    }),
  ).isRequired,
  tag: PropTypes.string.isRequired,
  setTag: PropTypes.func.isRequired,
};
