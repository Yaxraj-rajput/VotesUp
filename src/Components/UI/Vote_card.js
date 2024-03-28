import React from "react";
import right_arrow from "../../Static/Elements/right-arrow.png";
import { Link } from "react-router-dom";

const Vote_card = (props) => {
  return (
    <Link to={`/poll/${props.id}`} style={{ textDecoration: "none" }}>
      {" "}
      <div className="vote_card_main">
        <button className="vote_btn">
          <img src={right_arrow}></img>
        </button>
        <div className="profile">
          <div className="image">
            <img
              src={
                props.card.poll_by_photo
                  ? props.card.poll_by_photo
                  : "https://upload.wikimedia.org/wikipedia/commons/f/fb/Minecraft-creeper-face.jpg"
              }
            ></img>
          </div>
          <h1 className="username">
            {props.card.poll_by ? props.card.poll_by : "Anonymous User"}
          </h1>
        </div>

        <div className="card_title">
          <h3>{props.card.title}</h3>
        </div>

        <div className="duration">
          <span>Until {props.card.date}</span>
        </div>

        <span className="vote_count">{props.card.total_votes} Votes</span>
      </div>
    </Link>
  );
};

export default Vote_card;
