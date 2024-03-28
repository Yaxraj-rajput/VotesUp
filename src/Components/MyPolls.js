import React from "react";
import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import db from "../firebase";
import { useAuth } from "../Context/AuthContext";

const MyPolls = () => {
  const [polls, setPolls] = useState([]);
  const user = useAuth();
  const uid = user ? user.uid : null;
  useEffect(() => {
    const fetchPolls = async () => {
      if (uid) {
        const data = await getDocs(
          query(collection(db, "polls"), where("poll_by_uid", "==", uid))
        );
        setPolls(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      }
    };

    fetchPolls();
  }, [uid]);
  return (
    <div className="my_polls_main">
      <h1>My Polls</h1>

      <div className="polls">
        {user ? (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Activity</th>
                <th>Total Votes</th>
                <th>Poll Result</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {polls.map((poll) => (
                <tr key={poll.id}>
                  <td>{poll.title}</td>
                  <td>{poll.date}</td>
                  <td>{poll.live_count ? "Active" : "Inactive"}</td>
                  <td>{poll.total_votes}</td>
                  <td>
                    <a href={`/poll/${poll.id}`}>View Result</a>
                  </td>
                  <td>
                    <a href={`/poll/${poll.id}`}>Edit</a>
                    <a href={`/poll/${poll.id}`}>Delete</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <span className="alter_description">
            Please login to view your polls
          </span>
        )}
      </div>
    </div>
  );
};

export default MyPolls;
