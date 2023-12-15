/**
 * skenario test
 *
 * - asyncReceiveLeaderboards thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
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
  asyncReceiveLeaderboards,
  receiveLeaderboardsActionCreator,
} from "./action";

const fakeLeaderboardsResponse = [
  {
    user: {
      id: "users-1",
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://generated-image-url.jpg",
    },
    score: 10,
  },
  {
    user: {
      id: "users-2",
      name: "Jane Doe",
      email: "jane@example.com",
      avatar: "https://generated-image-url.jpg",
    },
    score: 5,
  },
];

const fakeErrorResponse = new Error("Ups, something went wrong");

describe("asyncReceiveLeaderboards thunk", () => {
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards;

    // delet backup data
    delete api._getLeaderboards;
  });

  // mock alert
  const consoleMock = vi
    .spyOn(console, "log")
    .mockImplementation(() => undefined);

  it("should dispatch correctly when data fetching success", async () => {
    // arrange
    // stub impelementation
    api.getLeaderboards = () => Promise.resolve(fakeLeaderboardsResponse);

    // mock dispatch
    const dispatch = vi.fn();

    // action
    await asyncReceiveLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());

    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeLeaderboardsResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it("should dispatch action and call console.log correctly when data fetching failed", async () => {
    // arrange
    // stub implementation
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = vi.fn();

    afterAll(() => {
      consoleMock.mockReset();
    });

    // action
    await asyncReceiveLeaderboards()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(consoleMock).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});
