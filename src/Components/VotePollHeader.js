import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import db from "../firebase";

const VotePollHeader = () => {
  const [poll, setPoll] = useState(null);
  const { pollid } = useParams();
  useEffect(() => {
    const fetchPoll = async () => {
      const docRef = doc(db, "polls", pollid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPoll({ ...docSnap.data(), id: docSnap.id });
      } else {
        console.log("No such document!");
      }
    };

    fetchPoll();
  }, [pollid]);

  return (
    <div className="header">
      <div className="title_bar">
        <h1 className="pole_title">
          {poll && poll.title}{" "}
          <span className="user">
            by {poll && poll.poll_by ? poll.poll_by : "Anonymous User"}{" "}
          </span>
        </h1>
        <span className="duration">
          ends on {poll && poll.date ? poll.date : "No end date"}
        </span>
      </div>
      <div className="share_btns">
        <button
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
          }}
        >
          <i className="bi bi-share"></i>
        </button>
      </div>
    </div>
  );
};

export default VotePollHeader;
