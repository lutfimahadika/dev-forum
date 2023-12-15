/**
 * skenario test
 *
 * - asyncPopulateUsersAndTalks thunk
 *  - should dispatch action correctly when get leaderboards data success
 *  - should dispatch action and call console.log when data leaderboards fetching failed
 *  -
 */

import {
  describe,
  beforeEach,
  afterEach,
  expect,
  vi,
  it,
  afterAll,
} from "vitest";
import { showLoading, hideLoading } from "react-redux-loading-bar";
import api from "../../utils/api";
import {
  asyncReceiveThreadDetail,
  clearThreadDetailActionCreator,
  receiveThreadDetailActionCreator,
} from "./action";

const fakeThreadDetailResponse = {
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

const fakeErrorResponse = new Error("Ups, something went wrong");

describe("asyncReceiveThreadDetail thunk", () => {
  beforeEach(() => {
    api._getThreadDetail = api.getThreadDetail;
  });

  afterEach(() => {
    api.getThreadDetail = api._getThreadDetail;

    // delete backup data
    delete api._getThreadDetail;
  });

  // mock alert
  const consoleMock = vi
    .spyOn(console, "log")
    .mockImplementation(() => undefined);

  it("should dispatch correctly when data fetching succes", async () => {
    // arrange
    // stub implementation
    api.getThreadDetail = () => Promise.resolve(fakeThreadDetailResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncReceiveThreadDetail()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(clearThreadDetailActionCreator());
    expect(dispatch).toHaveBeenCalledWith(
      receiveThreadDetailActionCreator(fakeThreadDetailResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call console.log when data leaderboards fetching failed", async () => {
    // arrange
    // stub implementation
    api.getThreadDetail = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    afterAll(() => {
      consoleMock.mockReset();
    });

    // action
    await asyncReceiveThreadDetail()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(consoleMock).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
