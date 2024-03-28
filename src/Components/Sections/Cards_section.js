import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import db from "../../firebase";
import Vote_card from "../UI/Vote_card";

const Cards_section = (props) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const q = query(collection(db, "polls"));
      const querySnapshot = await getDocs(q);
      setCards(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };

    fetchCards();
  }, []);

  return (
    <div className="cards_section_main">
      <div className="title">
        <h1>{props.section_title}</h1>
      </div>
      <div className="cards">
        {cards.map(
          (card, i) =>
            !card.isPrivate && <Vote_card key={i} card={card} id={card.id} />
        )}
      </div>
    </div>
  );
};

export default Cards_section;
