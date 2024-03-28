import React from "react";
import Cards_section from "../Components/Sections/Cards_section";

const Home = () => {
  return (
    <div className="home_main">
      <Cards_section section_title="Top Voted✨" cards_count="3" />
      <Cards_section section_title="For You" cards_count="10" />
    </div>
  );
};

export default Home;
