import React from "react";
import { useAuth } from "../../Context/AuthContext";
import { useEffect, useState } from "react";
import {
  collection,
  doc,
  query,
  onSnapshot,
  orderBy,
  addDoc,
} from "firebase/firestore";
import db from "../../firebase";

const CommentsSection = (props) => {
  const user = useAuth();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const pollId = props.pollid; // Get the poll ID from props
  const commentsRef = collection(doc(db, "polls", pollId), "comments"); // Reference to the comments subcollection

  useEffect(() => {
    const q = query(commentsRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return unsubscribe;
  }, [pollId]); // Re-run the effect when pollId changes

  const addComment = async (comment) => {
    try {
      await addDoc(commentsRef, {
        text: comment,
        timestamp: new Date(),
        user: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
        },
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();

      if (comment.trim() === "") return;

      if (!user) {
        alert("You need to log in to comment.");
        return;
      }

      addComment(comment);
      setComment(""); // Clear the input field
    }
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div className="comments">
      <h1 className="title">Comments</h1>
      <div className="comment_container">
        <input
          value={comment}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="comment.."
        />{" "}
        <div className="comment_list">
          {comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <div className="profile">
                <div className="image">
                  <img src={comment.user.photoURL} />
                </div>
              </div>
              <div className="comment_text">
                <h5 className="username">{comment.user.displayName}</h5>
                <p className="main_comment">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
