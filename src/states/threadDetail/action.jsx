import { showLoading, hideLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

const ActionType = {
  CLEAR_THREAD_DETAIL: "threadDetail/clear",
  RECEIVE_THREAD_DETAIL: "threadDetail/receive",
  TOGGLE_UP_VOTE_THREAD_DETAIL: "threadDetail/toggleUpVote",
  TOGGLE_DOWN_VOTE_THREAD_DETAIL: "threadDetail/toggleDownVote",
  NEUTRALIZE_VOTE_THREAD_DETAIL: "threadDetail/neutralVote",
  CREATE_COMMENT: "comment/create",
  TOGGLE_UP_VOTE_COMMENT: "comment/toggleUpVoteComment",
  TOGGLE_DOWN_VOTE_COMMENT: "comment/toggleDownVoteComment",
  NEUTRALIZE_VOTE_COMMENT: "comment/neutralzeVote",
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function createCommentActionCreator(comment) {
  return {
    type: ActionType.CREATE_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleUpVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleDownVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleNeutralizeThreadDetailActionCreator(userId) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function toggleUpVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleDownVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    dispatch(clearThreadDetailActionCreator());

    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      console.log(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncCreateComment({ id, content }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const comment = await api.createComment({ id, content });
      dispatch(createCommentActionCreator(comment));
    } catch (error) {
      console.log(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id));

    try {
      await api.upVoteThread(threadDetail.id);
    } catch (error) {
      console.log(error.message);
      dispatch(toggleUpVoteThreadDetailActionCreator(authUser.id));
    }

    dispatch(hideLoading());
  };
}

function asyncToggleDownVoteThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id));

    try {
      await api.downVoteThread(threadDetail.id);
    } catch (error) {
      console.log(error.message);
      dispatch(toggleDownVoteThreadDetailActionCreator(authUser.id));
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteThreadDetail() {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    dispatch(toggleNeutralizeThreadDetailActionCreator(authUser.id));

    try {
      await api.neutralizeThreadVote(threadDetail.id);
    } catch (error) {
      console.log(error.message);
      dispatch(toggleNeutralizeThreadDetailActionCreator(authUser.id));
    }

    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(
      toggleUpVoteCommentActionCreator({
        commentId,
        userId: authUser.id,
      }),
    );
    try {
      await api.upVoteComment({ threadId, commentId });
    } catch (error) {
      console.log(error.message);
      dispatch(
        toggleUpVoteCommentActionCreator({
          commentId,
          userId: authUser.id,
        }),
      );
    }

    dispatch(hideLoading());
  };
}

function asyncToggleDownVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(
      toggleDownVoteCommentActionCreator({
        commentId,
        userId: authUser.id,
      }),
    );
    try {
      await api.downVoteComment({ threadId, commentId });
    } catch (error) {
      console.log(error.message);
      dispatch(
        toggleDownVoteCommentActionCreator({
          commentId,
          userId: authUser.id,
        }),
      );
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  toggleUpVoteThreadDetailActionCreator,
  toggleDownVoteThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  createCommentActionCreator,
  asyncCreateComment,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncNeutralizeVoteThreadDetail,
};
