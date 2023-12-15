import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncReceiveLeaderboards } from "../states/leaderboards/action";

export default function LeaderboardsPage() {
  const leaderboards = useSelector((states) => states.leaderboards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards(leaderboards));
  }, [dispatch]);

  return (
    <div className="leaderboards">
      <h2>Pengguna Paling Aktif</h2>
      <table>
        <thead>
          <tr>
            <th>Pengguna</th>
            <th>Skor</th>
          </tr>
        </thead>
        <tbody>
          {leaderboards.map((leaderboard) => {
            const { user } = leaderboard;
            return (
              <tr className="list-user" key={user.id}>
                <td className="leaderboard-user user-avatar">
                  <img src={user.avatar} alt={user.name} />
                  <p>{user.name}</p>
                </td>
                <td>{leaderboard.score}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
