import React from "react";
import "../Styles/Portfolio.css"; // Make sure to create a corresponding CSS file for styling
import poap1 from "../Images/poap-1.png";
import poap2 from "../Images/poap-2.png";
import poap3 from "../Images/poap-3.png";

const CommonPOAP = () => {
  // Dummy data for the portfolio
  const poapCollection = [
    { id: 1, image:{poap1} },
    { id: 2, image:{poap2} },
    { id: 3, image:{poap3} },
    { id: 4, image:{poap1} },
    { id: 5, image:{poap2} },
    { id: 6, image:{poap3} },
    { id: 7, image:{poap1} },
    { id: 8, image:{poap2} },
  ];

  return (
    <div className="portfolio-grid">
      {poapCollection.map((poap) => (
        <div key={poap.id} className="portfolio-item">
          <div className="item-symbol" >
            {(poap.id === 1 || poap.id === 4 || poap.id ===7) && <div id="poap-symbol"><img src={poap1} alt="Bitcoin" /> <p className="poap-text">Hamlet Contemplates ...</p></div>}
            {(poap.id === 2|| poap.id === 5 || poap.id === 8) && <div id="poap-symbol"><img src={poap2} alt="Ethereum" /> <p className="poap-text">Hamlet Contemplates ...</p></div>}
            {(poap.id === 3 || poap.id === 6 ) && <div id="poap-symbol"><img src={poap3} alt="Solana" /> <p className="poap-text">Hamlet Contemplates ...</p></div>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommonPOAP;