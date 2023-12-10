import React, { useState, useEffect } from "react";
import "../Styles/Followers.css";
import FollowerLogo from "../Images/Follower-logo.png";

const Followers = ({ searchTerm }) => {
  const [followersData, setFollowersData] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // start with false if conditionally fetching
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch if searchTerm is 'vitalik.eth'
    if (searchTerm === "vitalik.eth") {
      setIsLoading(true); // start loading
      fetch(`http://localhost:3001/followers`) // URL of your backend endpoint
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setFollowersData(data.SocialFollowers.Follower); // Adjust according to your data structure
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    } else {
      // If searchTerm is not 'vitalik.eth', clear any existing data
      setFollowersData([]);
    }
  }, [searchTerm]); // Rerun when searchTerm changes

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  // Only render followers if data is available
  return (
    <div className="followers-container">
      {followersData.length > 0 ? (
        followersData.map((follower, index) => (
          <div key={index} className="follower-item">
            <img className="user-logo" src={FollowerLogo} alt="Follower" />
            <div className="follower-info">
              <span className="follower-name">
                {follower.followerAddress.socials[0]?.profileName || "Unknown"}
              </span>
              <span className="follower-handle">
                {follower.followerAddress.addresses.join(", ")}
              </span>
            </div>
            <div className="follower-stats">
              <span className="domains">
                Domains:{" "}
                {follower.followingAddress.domains
                  .map((domain) => domain.name)
                  .join(", ")}
              </span>
            </div>
            <button className="remove-button">Remove</button>
          </div>
        ))
      ) : (
        <p>No followers to display.</p>
      )}
    </div>
  );
};

export default Followers;
