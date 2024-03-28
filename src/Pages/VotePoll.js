import React, { useEffect } from "react";
import VotePollHeader from "../Components/VotePollHeader";
import PollSection from "../Components/Sections/PollSection";
import { useParams } from "react-router-dom";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { increment } from "firebase/firestore";
import db from "../firebase";

const VotePoll = () => {
  const { pollid } = useParams();

  useEffect(() => {
    const docRef = doc(db, "polls", pollid);

    // Increment liveCount when the component mounts
    updateDoc(docRef, { live_count: increment(1) });

    const unsubscribe = onSnapshot(docRef, (doc) => {
      // You can handle real-time updates to the poll document here if needed
    });

    // Function to decrement liveCount
    const decrementLiveCount = () => {
      updateDoc(docRef, { live_count: increment(-1) });
    };

    // Decrement liveCount when the component unmounts
    window.addEventListener("beforeunload", decrementLiveCount);

    return () => {
      // Decrement liveCount when the component unmounts
      decrementLiveCount();
      unsubscribe();
      window.removeEventListener("beforeunload", decrementLiveCount);
    };
  }, [pollid]);

  return (
    <div className="vote_poll_main">
      <VotePollHeader />
      <PollSection />
    </div>
  );
};

export default VotePoll;
