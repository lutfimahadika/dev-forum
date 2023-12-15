import React from "react";
import PropTypes from "prop-types";
import {
  HiOutlineThumbUp,
  HiOutlineThumbDown,
  HiThumbUp,
  HiThumbDown,
} from "react-icons/hi";
import parser from "html-react-parser";
import { useDispatch } from "react-redux";
import { postedAt } from "../../utils";
import {
  asyncToggleDownVoteComment,
  asyncToggleUpVoteComment,
} from "../../states/threadDetail/action";

export default function CommentCard({ authUser, comments, id }) {
  const dispatch = useDispatch();

  function onLikeComment(commentId) {
    dispatch(asyncToggleUpVoteComment({ commentId, threadId: id }));
  }
  function onUnlikeComment(commentId) {
    dispatch(asyncToggleDownVoteComment({ commentId, threadId: id }));
  }

  return (
    <div>
      {comments?.map((data) => (
        <div className="comment" key={data.id}>
          <div className="header">
            <div className="user-avatar">
              <img src={data.owner.avatar} alt={data.owner.name} />
              <p>{data.owner.name}</p>
            </div>
            <p>{postedAt(data.createdAt)}</p>
          </div>
          <div className="content">
            <p>{parser(data.content)}</p>
          </div>
          <div className="liked">
            <div className="icons-btn unlike-thread">
              <button
                type="button"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  onLikeComment(data.id);
                }}
              >
                {data.upVotesBy.includes(authUser.id) ? (
                  <HiThumbUp size={20} stroke="#13102D" />
                ) : (
                  <HiOutlineThumbUp size={20} stroke="#13102D" />
                )}
                <p>{data.upVotesBy.length}</p>
              </button>
            </div>
            <div className="icons-btn unlike-thread">
              <button
                type="button"
                tabIndex={0}
                className="icons-btn like-thread"
                onClick={(e) => {
                  e.preventDefault();
                  onUnlikeComment(data.id);
                }}
              >
                {data.downVotesBy.includes(authUser.id) ? (
                  <HiThumbDown size={20} stroke="#13102D" />
                ) : (
                  <HiOutlineThumbDown size={20} stroke="#13102D" />
                )}
                <p>{data.downVotesBy.length}</p>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const commentShape = {
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CommentCard.propTypes = {
  ...commentShape,
};
