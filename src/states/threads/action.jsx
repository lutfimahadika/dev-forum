import { showLoading, hideLoading } from "react-redux-loading-bar";
import api from "../../utils/api";

const ActionType = {
  RECEIVE_THREADS: "threads/receive",
  CREATE_THREAD: "threads/create",
  TOGGLE_UP_VOTE_THREAD: "threads/toggeUpVote",
  TOGGLE_DOWN_VOTE_THREAD: "threads/toggleDownVote",
  NEUTRALIZE_VOTE_THREAD: "threads/neutralizeVote",
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function createThreadActionCreator(thread) {
  return {
    type: ActionType.CREATE_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleUpVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleNeutralizeVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_VOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncCreateThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const thread = await api.createNewThread({ title, body, category });
      dispatch(createThreadActionCreator(thread));
    } catch (error) {
      console.log(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(
      toggleUpVoteActionCreator({
        threadId,
        userId: authUser.id,
      }),
    );
    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      console.log(error.message);
      dispatch(
        toggleUpVoteActionCreator({
          threadId,
          userId: authUser.id,
        }),
      );
    }

    dispatch(hideLoading());
  };
}

function asyncToggleDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(
      toggleDownVoteActionCreator({
        threadId,
        userId: authUser.id,
      }),
    );
    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      console.log(error.message);
      dispatch(
        toggleDownVoteActionCreator({
          threadId,
          userId: authUser.id,
        }),
      );
    }

    dispatch(hideLoading());
  };
}

function asyncNeutralizeVoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(
      toggleNeutralizeVoteActionCreator({
        threadId,
        userId: authUser.id,
      }),
    );
    try {
      await api.neutralizeThreadVote(threadId);
    } catch (error) {
      console.log(error.message);
      dispatch(
        toggleNeutralizeVoteActionCreator({
          threadId,
          userId: authUser.id,
        }),
      );
    }

    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  createThreadActionCreator,
  toggleUpVoteActionCreator,
  toggleDownVoteActionCreator,
  toggleNeutralizeVoteActionCreator,
  asyncCreateThread,
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncNeutralizeVoteThread,
};
