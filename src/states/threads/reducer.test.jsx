/**
 * test scenario for threadsReducer
 *
 * - talkReducers function
 *  - should return the initial state when given by unknown action
 *  - should return threads when given by threads/receive action
 *  - should return threads with the new thread when given by threads/create action
 *  - should return threads with the toggle up vote thread when given threads/toggeUpVote action
 *  - should return thread with the toggle down vote thread when given threads/toggleDownVote action
 *
 */

import { describe, it, expect } from "vitest";
import threadsReducer from "./reducer";

describe("threadsReducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    // Arrange
    const initialState = [];
    const action = { type: "UNKNOWN" };

    // Action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it("should return threads when given by threads/receive action", () => {
    const initialState = [];
    const action = {
      type: "threads/receive",
      payload: {
        threads: [
          {
            id: "thread-1",
            title: "Thread-1",
            body: "Ini adalah thread pertama",
            category: "General",
            createdAt: "2021-06-21T07:00:00.000Z",
            ownerId: "user-1",
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
          {
            id: "thread-2",
            title: "Thread-2",
            body: "Ini adalah thread kedua",
            category: "General Main",
            createdAt: "2021-07-21T07:00:00.000Z",
            ownerId: "user-2",
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0,
          },
        ],
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it("should return threads with the new thread when given by threads/create action", () => {
    // arrange
    const initialState = [
      {
        id: "thread-1",
        title: "Thread-1",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "user-1",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: "threads/create",
      payload: {
        thread: {
          id: "thread-2",
          title: "Thread-2",
          body: "Ini adalah thread kedua",
          category: "General Main",
          createdAt: "2021-07-21T07:00:00.000Z",
          ownerId: "user-2",
          upVotesBy: [],
          downVotesBy: [],
          totalComments: 0,
        },
      },
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });

  it("should return threads with the toggle up vote thread when given threads/toggeUpVote action", () => {
    // arrange
    const initialState = [
      {
        id: "thread-1",
        title: "Thread-1",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "user-1",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: "threads/toggeUpVote",
      payload: {
        threadId: "thread-1",
        userId: "user-1",
      },
    };

    // action up vote thread
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        upVotesBy: [action.payload.userId],
      },
    ]);

    // action unvote thread
    const nextState2 = threadsReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });

  it("should return thread with the toggle down vote thread when given threads/toggleDownVote ", () => {
    // arrange
    const initialState = [
      {
        id: "thread-1",
        title: "Thread-1",
        body: "Ini adalah thread pertama",
        category: "General",
        createdAt: "2021-06-21T07:00:00.000Z",
        ownerId: "user-1",
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0,
      },
    ];

    const action = {
      type: "threads/toggleDownVote",
      payload: {
        threadId: "thread-1",
        userId: "user-1",
      },
    };

    // action up vote thread
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([
      {
        ...initialState[0],
        downVotesBy: [action.payload.userId],
      },
    ]);

    // action unvote thread
    const nextState2 = threadsReducer(nextState, action);

    // assert
    expect(nextState2).toEqual(initialState);
  });
});
