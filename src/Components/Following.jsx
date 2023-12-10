import React, { useState, useEffect } from "react";
import "../Styles/Following.css";
import FollowerLogo from "../Images/Follower-logo.png";

const Following = ({ searchTerm }) => {
  const [followingData, setFollowingData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Start as false since we may not fetch
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch if searchTerm is 'vitalik.eth'
    if (searchTerm === "vitalik.eth") {
      setIsLoading(true); // Indicate loading
      fetch(`http://localhost:3001/following`) // Pass searchTerm to backend
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setFollowingData(data.SocialFollowings.Following);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    } else {
      // If searchTerm is not 'vitalik.eth', clear any existing data
      setFollowingData([]);
    }
  }, [searchTerm]); // Re-run when searchTerm changes

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Only render following data if available
  return (
    <div className="following-container">
      {followingData.length > 0 ? (
        followingData.map((follow, index) => (
          <div key={index} className="following-item">
            <img className="user-logo" src={FollowerLogo} alt="Following" />
            <div className="following-info">
              <span className="following-name">
                {follow.followingAddress.socials[0]?.profileName || "Unknown"}
              </span>
              <span className="following-handle">
                {follow.followingAddress.addresses.join(", ")}
              </span>
            </div>
            <div className="following-stats">
              {/* Additional stats if needed */}
            </div>
            <button className="unfollow-button">Unfollow</button>
          </div>
        ))
      ) : (
        <p>No following information to display.</p>
      )}
    </div>
  );
};

export default Following;
