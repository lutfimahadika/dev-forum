import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  HiOutlineThumbUp,
  HiOutlineThumbDown,
  HiThumbUp,
  HiThumbDown,
} from "react-icons/hi";
import { HiArrowUturnLeft } from "react-icons/hi2";
import parser from "html-react-parser";
import { postedAt } from "../../utils";

export default function ThreadItem({
  authUser,
  id,
  title,
  body,
  category,
  upVotesBy,
  downVotesBy,
  totalComments,
  createdAt,
  user,
  upVote,
  downVote,
  neutralVote,
}) {
  return (
    <section className="card">
      <div className="card-body">
        <div className="card-text">
          <div className="card-author">
            Dibuat oleh
            <span>{user.name}</span>
          </div>
          <Link to={`/detail/${id}`} className="card-title">
            {title}
          </Link>
          <span className="card-content">{parser(body)}</span>
        </div>
        <div className="card-tags">
          <span className="tags">{`#${category}`}</span>
        </div>
      </div>
      <div className="card-footer">
        <div className="icons-btn like-thread">
          {upVotesBy.includes(authUser.id) ? (
            <HiThumbUp
              size={16}
              stroke="#13102D"
              onClick={() => neutralVote(id)}
            />
          ) : (
            <HiOutlineThumbUp
              size={16}
              stroke="#13102D"
              onClick={() => upVote(id)}
            />
          )}

          <p>{upVotesBy.length}</p>
        </div>
        <div className="icons-btn unlike-thread">
          {downVotesBy.includes(authUser.id) ? (
            <HiThumbDown
              size={16}
              stroke="#13102D"
              onClick={() => neutralVote(id)}
            />
          ) : (
            <HiOutlineThumbDown
              size={16}
              stroke="#13102D"
              onClick={() => downVote(id)}
            />
          )}

          <p>{downVotesBy.length}</p>
        </div>
        <div className="icons-btn reply-thread">
          <HiArrowUturnLeft size={16} fill="#828282" />
          <p>{totalComments}</p>
        </div>
        <p className="time-thread">{postedAt(createdAt)}</p>
      </div>
    </section>
  );
}

const userShape = {
  name: PropTypes.string.isRequired,
};
const authUserShape = {
  id: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  createdAt: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  authUser: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape).isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  upVote: PropTypes.func,
  downVote: PropTypes.func,
  neutralVote: PropTypes.func,
  authUser: PropTypes.shape(authUserShape).isRequired,
};

ThreadItem.defaultProps = {
  upVote: null,
  downVote: null,
  neutralVote: null,
};

export { threadItemShape };
