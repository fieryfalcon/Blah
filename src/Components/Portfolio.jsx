import React, { useState, useEffect } from "react";
import "../Styles/Portfolio.css";
import Bitcoin from "../Images/Bitcoin-logo.png"; // Assuming you have images for all tokens

const Portfolio = ({ searchTerm }) => {
  const [nftData, setNftData] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    if (searchTerm === "vitalik.eth") {
      // Fetch data if searchTerm is 'vitalik.eth'
      fetch("http://localhost:3001/portfoliopartone")
        .then((response) => response.json())
        .then((data) => {
          const tokens = data.Ethereum.TokenBalance.map((token) => ({
            id: token.tokenAddress,
            name: token.token.name,
            amount: token.amount,
            chain: "Ethereum",
          }));
          setCryptoData(tokens);
        })
        .catch((error) => {
          console.error("Error fetching token data:", error);
        });

      fetch("http://localhost:3001/portfolio")
        .then((response) => response.json())
        .then((data) => {
          const nfts = data.Ethereum.TokenBalance.filter(
            (token) => token.tokenNfts.contentValue.image
          ).map((token) => ({
            id: token.tokenId,
            image: token.tokenNfts.contentValue.image.small || Bitcoin,
            title: token.tokenId,
          }));
          setNftData(nfts);
        })
        .catch((error) => {
          console.error("Error fetching NFT data:", error);
        });
    } else {
      // Hardcoded details if searchTerm is not 'vitalik.eth'
      setCryptoData([
        { id: 1, name: "ETH", amount: "0.005", chain: "Polygon" },
        { id: 2, name: "MATIC", amount: "10.3", chain: "Polygon" },
        { id: 3, name: "USDC", amount: "150.21", chain: "Polygon" },
      ]);
      setNftData([]); // No NFTs for other search terms
    }
  }, [searchTerm]);

  return (
    <div className="portfolio-container">
      <div className="crypto-section">
        <div className="section-title">Crypto Details</div>
        <table className="crypto-table">
          <thead>
            <tr>
              <th>Token Name</th>
              <th>Amount</th>
              <th>Chain</th>
            </tr>
          </thead>
          <tbody>
            {cryptoData.map((crypto, index) => (
              <tr key={index}>
                <td>{crypto.name}</td>
                <td>{crypto.amount}</td>
                <td>{crypto.chain}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="nfts-section">
        <div className="section-title">NFTs</div>
        {nftData.length > 0 ? (
          <div className="nft-items-container">
            {nftData.map((nft) => (
              <div key={nft.id} className="nft-item">
                <img
                  src={nft.image}
                  alt={`NFT ${nft.title}`}
                  className="nft-image"
                />
                <div className="nft-title">{`Token ID: ${nft.title}`}</div>
              </div>
            ))}
          </div>
        ) : (
          <p>No NFTs found.</p>
        )}
      </div>
    </div>
  );
};

export default Portfolio;
