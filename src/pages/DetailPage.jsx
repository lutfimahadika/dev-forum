import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DetailThread from "../components/DetailThread/DetailThread";
import CommentCard from "../components/CommentCard/CommentCard";
import {
  asyncReceiveThreadDetail,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncNeutralizeVoteThreadDetail,
  asyncCreateComment,
} from "../states/threadDetail/action";
import FormComment from "../components/FormComment/FormComment";

export default function DetailPage() {
  const threadDetail = useSelector((states) => states.threadDetail);
  const authUser = useSelector((states) => states.authUser);

  const { id } = useParams();
  const [content, setContent] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onUpVoteThread = () => {
    dispatch(asyncToggleUpVoteThreadDetail());
  };

  const onDownVoteThread = () => {
    dispatch(asyncToggleDownVoteThreadDetail());
  };

  const onNeutralVoteThread = () => {
    dispatch(asyncNeutralizeVoteThreadDetail());
  };

  const onSetContentHandler = (e) => {
    setContent(e.target.innerHTML);
  };

  const onPostComment = (e) => {
    e.preventDefault();
    dispatch(asyncCreateComment({ id, content }));
    setContent("");
  };

  if (!threadDetail) {
    return null;
  }

  return (
    <div className="detail-container">
      <DetailThread
        authUser={authUser.id}
        upVote={onUpVoteThread}
        downVote={onDownVoteThread}
        neutralVote={onNeutralVoteThread}
        id={id}
        {...threadDetail}
      />
      <div className="add-comment-container">
        <h3>Beri Komentar</h3>
        <FormComment
          setInput={onSetContentHandler}
          postHandler={onPostComment}
        />
      </div>
      <div className="comment-section">
        <h3>
          Komentar
          <span className="comment-length">
            ({threadDetail.comments.length ? threadDetail.comments.length : "0"}
            )
          </span>
        </h3>
        {threadDetail.comments.length ? (
          <div className="comments">
            <CommentCard authUser={authUser} id={id} {...threadDetail} />
          </div>
        ) : (
          <p className="not-comment">Tidak ada komentar</p>
        )}
      </div>
    </div>
  );
}
