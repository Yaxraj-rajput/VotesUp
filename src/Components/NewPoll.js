import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../firebase";
import { useAuth } from "../Context/AuthContext";
import Modal from "react-modal";

const NewPoll = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [pollLink, setPollLink] = useState("");
  const [options_count, setOptions_count] = useState(1);
  const title = React.createRef();
  const description = React.createRef();
  const date = React.createRef();
  const isPrivate = React.createRef();
  const isStrict = React.createRef();
  const user = useAuth();
  const poll_by = user ? user.displayName : null;
  const poll_by_photo = user ? user.photoURL : null;
  const poll_by_uid = user ? user.uid : null;

  const options = Array.from({ length: options_count }, () =>
    React.createRef()
  );

  const changeOptionCount = (index) => {
    if (index === options_count - 1) {
      setOptions_count(options_count + 1);
    }
  };

  const createPoll = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "polls"), {
        title: title.current.value,
        options: options
          .map((option) => ({
            text: option.current.value,
            votes: 0,
          }))
          .filter((option) => option.text.trim() !== ""),
        description: description.current.value,
        date: date.current.value,
        isPrivate: isPrivate.current.checked,
        isStrict: isStrict.current.checked,
        total_votes: 0,
        live_count: 0,
        poll_by: poll_by,
        poll_by_photo: poll_by_photo,
        poll_by_uid: poll_by_uid,
        voters: [],
      });
      const pollLink = `http://localhost:3000/poll/${docRef.id}`;

      setPollLink(pollLink);
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error creating poll: ", error);
    }
  };

  return (
    <div className="new_poll_main">
      <form onSubmit={createPoll}>
        <input type="text" ref={title} placeholder="Poll Title" />
        <input type="text" ref={description} placeholder="Description" />
        <input type="date" ref={date} />
        <div className="checkbox">
          <span className="check">Private</span>
          <input type="checkbox" ref={isPrivate} />
        </div>
        <div className="checkbox">
          <span className="check">
            Strict Mode (Only Signed In user Can Vote)
          </span>
          <input type="checkbox" ref={isStrict} />
        </div>

        {options.map((option, index) => (
          <input
            key={index}
            onChange={() => changeOptionCount(index)}
            type="text"
            placeholder={`Option ${index + 1}`}
            ref={option}
          />
        ))}

        <button type="submit">
          {" "}
          <i className="bi bi-plus"></i> Create Poll
        </button>
      </form>
      {modalIsOpen && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <h2>Poll successfully created!</h2>
            <p>Share this link to invite others to vote:</p>

            <a href={pollLink}>{pollLink}</a>
            <button className="close_btn" onClick={() => setModalIsOpen(false)}>
              <i className="bi bi-x-lg"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPoll;
