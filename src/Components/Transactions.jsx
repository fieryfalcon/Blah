import React, { useState, useEffect } from "react";
import "../Styles/Transactions.css";
import Bitcoin from "../Images/Bitcoin-logo.png";
import Ethereum from "../Images/Eth-logo.png";
import Solana from "../Images/Solana-logo.png";
import Tether from "../Images/Tether-logo.png";
import Polygon from "../Images/matic.png";

const Transactions = ({ searchTerm }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Only fetch if searchTerm is 'vitalik.eth'
    if (searchTerm === "vitalik.eth") {
      setIsLoading(true);
      fetch(
        `http://localhost:3001/transactions?identity=${encodeURIComponent(
          searchTerm
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          setTransactions(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching transactions:", error);
          setIsLoading(false);
        });
    } else {
      // Clear transactions if searchTerm is not 'vitalik.eth'
      setTransactions([]);
    }
  }, [searchTerm]);

  const timeSince = (timestamp) => {
    const now = new Date();
    const elapsed = now - new Date(timestamp);

    const minutes = Math.floor(elapsed / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) {
      return `${minutes} minutes ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else {
      return `${days} days ago`;
    }
  };

  const getImage = (name) => {
    switch (name) {
      case "Bitcoin":
        return Bitcoin;
      case "Ethereum":
        return Ethereum;
      case "Polygon":
        return Polygon;
      case "Tether":
        return Tether;
      default:
        return null; // Or a default image
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="outer">
      <div className="transactions-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>From Address</th>
              <th>To Address</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>
                  <div className="transaction-name-symbol">
                    <img
                      src={getImage(transaction.name)}
                      alt={transaction.name}
                    />
                  </div>
                  {transaction.name}
                </td>
                <td>{transaction.fromAddress}</td>
                <td>{transaction.toAddress}</td>
                <td className="timestamp">{transaction.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
