import React from "react";
import PropTypes from "prop-types";

export default function FormComment({ setInput, postHandler }) {
  return (
    <form className="addComment" onSubmit={(e) => postHandler(e)}>
      <div
        data-testid="editable-field"
        className="comment-field-input"
        onInput={setInput}
        contentEditable
        suppressContentEditableWarning
      />
      <button type="submit" className="btn">
        Kirim
      </button>
    </form>
  );
}

FormComment.propTypes = {
  setInput: PropTypes.func.isRequired,
  postHandler: PropTypes.func.isRequired,
};
