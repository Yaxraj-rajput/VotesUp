import React, { useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  runTransaction,
  onSnapshot,
  increment,
} from "firebase/firestore";
import db from "../../firebase";
import { useParams } from "react-router-dom";
import { arrayUnion, arrayRemove } from "firebase/firestore";
import CommentsSection from "./CommentsSection";
import { useAuth } from "../../Context/AuthContext";
import AnalyticsSection from "./AnalyticsSection";

const PollSection = () => {
  const user = useAuth();
  const [poll, setPoll] = useState(null);
  const [liveCount, setLiveCount] = useState(0);
  const [isVoting, setIsVoting] = useState(false); // New state to track voting status

  const { pollid } = useParams();
  useEffect(() => {
    const fetchPoll = async () => {
      const docRef = doc(db, "polls", pollid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPoll({ ...docSnap.data(), id: docSnap.id });
        setLiveCount(docSnap.data().live_count);
      } else {
        console.log("No such document!");
      }
    };

    fetchPoll();
  }, [pollid]);

  useEffect(() => {
    const docRef = doc(db, "polls", pollid);

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setPoll({ ...docSnap.data(), id: docSnap.id });
        setLiveCount(docSnap.data().live_count);
      } else {
        console.log("No such document!");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [pollid]);

  return (
    <div className="poll_section_main">
      <div className="poll_main">
        <span className="status">
          {liveCount} {liveCount === 1 ? "person " : "people "}
          live on this vote channel
        </span>
        <div className="poll">
          {poll &&
            Object.values(poll.options).map((option, i) => {
              const uid = user ? user.uid : null;
              const userVote = poll.voters ? poll.voters[uid] : null;

              return (
                <div
                  className="poll_option"
                  onClick={
                    isVoting
                      ? null
                      : async () => {
                          setIsVoting(true); // Set voting to true when a vote is initiated

                          const docRef = doc(db, "polls", pollid);

                          let uid = user ? user.uid : null;
                          const isStrict = poll ? poll.isStrict : false;

                          if (!uid) {
                            if (isStrict) {
                              alert(
                                "You must be logged in to vote for this poll!"
                              );
                              return;
                            }

                            uid = localStorage.getItem("guestId");
                            if (!uid) {
                              uid = Math.random().toString(36).substring(2);
                              localStorage.setItem("guestId", uid);
                            }
                          }

                          setPoll((prevPoll) => {
                            const newOptions = prevPoll.options.map((o) =>
                              o.text === option.text
                                ? { ...o, votes: o.votes + 1 }
                                : o
                            );
                            return {
                              ...prevPoll,
                              options: newOptions,
                              total_votes: prevPoll.total_votes + 1,
                              voters: {
                                ...prevPoll.voters,
                                [uid]: option.text,
                              },
                            };
                          });

                          await runTransaction(db, async (transaction) => {
                            const docSnap = await transaction.get(docRef);

                            if (!docSnap.exists()) {
                              throw "Document does not exist!";
                            }

                            const data = docSnap.data();
                            if (data.voters && data.voters[uid]) {
                              return;
                            }
                            const newOptions = data.options.map((o) =>
                              o.text === option.text
                                ? { ...o, votes: o.votes + 1 }
                                : o
                            );

                            transaction.update(docRef, {
                              options: newOptions,
                              total_votes: increment(1),
                              voters: { ...data.voters, [uid]: option.text },
                            });
                          });

                          const docSnap = await getDoc(docRef);
                          if (docSnap.exists()) {
                            setPoll({ ...docSnap.data(), id: docSnap.id });
                          }

                          setIsVoting(false); // Set voting to false after the transaction is complete
                        }
                  }
                  key={i}
                  style={isVoting ? { pointerEvents: "none" } : {}} // Disable pointer events while voting is in progress
                >
                  <span className="option">{option.text}</span>
                  <div
                    style={{
                      width: `${(option.votes / poll.total_votes) * 100}%`,
                    }}
                    className={`bar ${
                      poll.voters[uid] === option.text ? "active" : ""
                    }`}
                  ></div>
                  <span className="vote_count">{option.votes}</span>
                </div>
              );
            })}
        </div>
      </div>
      <CommentsSection pollid={pollid} />
      <AnalyticsSection pollid={pollid} />
    </div>
  );
};

export default PollSection;
