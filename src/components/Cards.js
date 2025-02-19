import React from "react";
import Data from "./data.json";

const Cards = () => {
    return (
    <main className="cards_container">
        {Data.map((item, index) => {
        return (
            <div key={index} className="card">
                <div className="card_content">
                    <h1 className="card_name">{item.name}</h1>
                    <h2 className="card_roll">{item.roll}</h2>
                    <h2 className="card_location">{item.location}</h2>
                    <h2 className="card_type">{item.type}</h2>
                </div>
                <img src={item.img} alt={item.name} className="card_img" />
            </div>
        );
    })}
    </main>
  );
};

export default Cards;