/**
 * test scenario for talksReducer
 * - talkReducers function
 * - should return inital state when given by unknown action
 * - should empty state when given threadDetail/clear action
 * - should return the thread when given threadDetail/receive action
 * - should return thread with the toggle up vote thread when given threadDetail/toggleUpVote action
 * - should return thread with the toggle down vote thread when given threadDetail/toggleDownVote action
 * - should return thread with the toggle down vote thread when given threadDetail/neutralVote action
 * - should return thread with comment when given comment/create action
 * - should return comment with the toggle up vote comment when given comment/toggleUpVoteComment action
 * - should return comment with the toggle down vote comment wehn given comment/toggleDownVote action
 * - should return comment with the toggle up vote comment when given comment/neutralzeVote action
 */

import { describe, it, expect } from "vitest";
import threadDetailReducer from "./reducer";

describe("threadDetail function", () => {
  it("should return the initial state when given by unknown action", () => {
    //  arrange
    const initialState = [];
    const action = { type: "UNKNOWN" };

    // action
    const currentState = threadDetailReducer(initialState, action);

    // assert
    expect(currentState).toEqual(initialState);
  });

  it("should empty state when given threadDetail/clear action", () => {
    // arrange
    const initialState = {
      id: "thread-1",
      title: "Thread-1",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      ownerId: "user-1",
      upVotesBy: [],
      downVotesBy: [],
      totalComments: 0,
    };

    const action = {
      type: "threadDetail/clear",
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual(null);
  });

  it("should return the thread when given threadDetail/receive action", () => {
    // arrange
    const initialState = [];

    const action = {
      type: "threadDetail/receive",
      payload: [
        {
          id: "thread-1",
          title: "Thread Pertama",
          body: "Ini adalah thread pertama",
          category: "General",
          createdAt: "2021-06-21T07:00:00.000Z",
          owner: {
            id: "users-1",
            name: "John Doe",
            avatar: "https://generated-image-url.jpg",
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [],
        },
      ],
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // arrange
    expect(nextState).toEqual(action.payload.threads);
  });

  it("should return thread with the toggle up vote thread when given threadDetail/toggleUpVote action", () => {
    // arrange
    const initialState = {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      owner: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: "threadDetail/toggleUpVote",
      payload: {
        userId: "user-1",
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [action.payload.userId],
    });

    // action unvote thread
    const nextState2 = threadDetailReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });

  it("should return thread with the toggle down vote thread when given threadDetail/toggleDownVote action", () => {
    // arrange
    const initialState = {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      owner: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: "threadDetail/toggleDownVote",
      payload: {
        userId: "user-1",
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      downVotesBy: [action.payload.userId],
    });

    // action unvote thread
    const nextState2 = threadDetailReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });

  it("should return thread with the toggle down vote thread when given threadDetail/neutralVote action", () => {
    // arrange
    const initialState = {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      owner: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      upVotesBy: ["users-1"],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: "threadDetail/neutralVote",
      payload: {
        userId: "users-1",
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
    });
  });

  it("should return thread with comment when given comment/create action", () => {
    // arrange
    const initialState = {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      owner: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: "comment-1",
          content: "Ini adalah komentar pertama",
          createdAt: "2021-06-21T07:00:00.000Z",
          owner: {
            id: "users-1",
            name: "John Doe",
            avatar: "https://generated-image-url.jpg",
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: "comment/create",
      payload: {
        comment: {
          id: "comment-2",
          content: "Ini adalah komentar kedua",
          createdAt: "2021-06-21T07:00:00.000Z",
          owner: {
            id: "users-2",
            name: "Thunk",
            avatar: "https://generated-image-url.jpg",
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert

    expect(nextState).toEqual({
      ...initialState,
      comments: initialState.comments.concat(action.payload.comment),
    });
  });

  it("should return comment with the toggle up vote comment when given comment/toggleUpVoteComment action", () => {
    // arrange
    const initialState = {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      owner: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: "comment-1",
          content: "Ini adalah komentar pertama",
          createdAt: "2021-06-21T07:00:00.000Z",
          owner: {
            id: "users-1",
            name: "John Doe",
            avatar: "https://generated-image-url.jpg",
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: "comment/toggleUpVoteComment",
      payload: {
        commentId: "comment-1",
        userId: "users-1",
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [action.payload.userId],
        },
      ],
    });
  });

  it("should return comment with the toggle up vote comment when given comment/toggleDownVoteComment action", () => {
    // arrange
    const initialState = {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      owner: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: "comment-1",
          content: "Ini adalah komentar pertama",
          createdAt: "2021-06-21T07:00:00.000Z",
          owner: {
            id: "users-1",
            name: "John Doe",
            avatar: "https://generated-image-url.jpg",
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: "comment/toggleDownVoteComment",
      payload: {
        commentId: "comment-1",
        userId: "users-1",
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          downVotesBy: [action.payload.userId],
        },
      ],
    });
  });

  it("should return comment with the toggle up vote comment when given comment/neutralzeVote action", () => {
    // arrange
    const initialState = {
      id: "thread-1",
      title: "Thread Pertama",
      body: "Ini adalah thread pertama",
      category: "General",
      createdAt: "2021-06-21T07:00:00.000Z",
      owner: {
        id: "users-1",
        name: "John Doe",
        avatar: "https://generated-image-url.jpg",
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [
        {
          id: "comment-1",
          content: "Ini adalah komentar pertama",
          createdAt: "2021-06-21T07:00:00.000Z",
          owner: {
            id: "users-1",
            name: "John Doe",
            avatar: "https://generated-image-url.jpg",
          },
          upVotesBy: ["users-1"],
          downVotesBy: [],
        },
      ],
    };

    const action = {
      type: "comment/neutralzeVote",
      payload: {
        commentId: "comment-1",
        userId: "users-1",
      },
    };

    // action
    const nextState = threadDetailReducer(initialState, action);
    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [
        {
          ...initialState.comments[0],
          upVotesBy: [action.payload.userId],
        },
      ],
    });
  });
});
