import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { HiPlus } from "react-icons/hi";
import ThreadList from "../components/ThreadList/ThreadList";
import { asyncPopulateUsersAndThreads } from "../states/shared/action";
import {
  asyncToggleUpVoteThread,
  asyncToggleDownVoteThread,
  asyncNeutralizeVoteThread,
} from "../states/threads/action";
import PopularTagsCategory from "../components/PopularTagsCategory/PopularTagsCategory";

export default function HomePage() {
  const threads = useSelector((states) => states.threads);
  const users = useSelector((states) => states.users);
  const authUser = useSelector((states) => states.authUser);

  const [tagActive, setTagActive] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpVote = (id) => {
    dispatch(asyncToggleUpVoteThread(id));
  };

  const onNeutralVote = (id) => {
    dispatch(asyncNeutralizeVoteThread(id));
  };

  const onDownVote = (id) => {
    dispatch(asyncToggleDownVoteThread(id));
  };

  const threadList = threads?.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser.id,
  }));

  const filteredTag = threadList?.filter((thread) => {
    if (tagActive === "") {
      return threadList;
    }
    return thread.category === tagActive;
  });

  return (
    <section>
      <div className="hero">
        <PopularTagsCategory
          threads={threads}
          tag={tagActive}
          setTag={setTagActive}
        />
        <Link to="/new" className="add-discuss-btn">
          Buat Diskusi Baru
          <HiPlus size={20} fill="white" />
        </Link>
      </div>
      <ThreadList
        threads={filteredTag}
        upVote={onUpVote}
        downVote={onDownVote}
        neutralVote={onNeutralVote}
        authUser={authUser}
      />
    </section>
  );
}
