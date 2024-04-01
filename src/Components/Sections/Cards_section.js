import React, { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import db from "../../firebase";
import Vote_card from "../UI/Vote_card";
import { Link } from "react-router-dom";

const Cards_section = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      const q = query(collection(db, "polls"));
      const querySnapshot = await getDocs(q);
      const cardsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      cardsData.sort((a, b) => {
        const aSeconds = a.added_on ? a.added_on.seconds : 0;
        const bSeconds = b.added_on ? b.added_on.seconds : 0;
        return bSeconds - aSeconds;
      });
      setCards(cardsData);
    };

    fetchCards();
  }, []);

  useEffect(() => {
    setFilteredCards(
      cards.filter((card) =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, cards]);

  return (
    <div className="cards_section_main">
      <div className="title">
        <h1>{props.section_title}</h1>
        <Link to={"/new"}>
          <button>Add New Poll</button>
        </Link>
      </div>
      <div className="search_bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a poll..."
        />
      </div>
      <div className="cards">
        {filteredCards.map(
          (card, i) =>
            !card.isPrivate && <Vote_card key={i} card={card} id={card.id} />
        )}
      </div>
    </div>
  );
};

export default Cards_section;
