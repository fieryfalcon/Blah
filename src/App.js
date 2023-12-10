import React, { useState } from "react";
import Portfolio from "./Components/Portfolio";
import Transactions from "./Components/Transactions";
import Followers from "./Components/Followers";
import Following from "./Components/Following";
import CommonPOAP from "./Components/CommonPOAP";
import Swap from "./Components/Swap";
import HomeIcon from "./Images/Home-sign.png";
import SwapIcon from "./Images/Swap-sign.png";
import Logo from "./Images/Main-logo.png";
import Search from "./Images/Search-logo.png";
import Wallet from "./Images/Wallet-logo.png";
import Copy from "./Images/Copy-logo.png";
import {BrowserRouter as Router , Routes , Route, Link} from 'react-router-dom';

import "./App.css";

const userProfileData = {
  name: "Vaishnavi Singh", // has to get from lens 
  address: "0x1234567890abcdef1234567890abcdef", // 
  TotalBalance: "$110,061",
  imageUrl:
    "https://www.creativefabrica.com/wp-content/uploads/2023/01/20/Cute-Adorable-Minion-Nursery-Art-Nursery-Decor-58275132-1-312x208.png", // Replace with actual path to image
};

const TotalBalance = () => {
  return (
    <div className="total-balance">
      <span>{userProfileData.TotalBalance}</span>
    </div>
  );
};

const App = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [activeComponent, setActiveComponent] = useState("Portfolio");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "Portfolio":
        return <Portfolio searchTerm={searchTerm} />;
      case "Transactions":
        return <Transactions searchTerm={searchTerm} />;
      case "Followers":
        return <Followers searchTerm={searchTerm} />;
      case "Following":
        return <Following searchTerm={searchTerm} />;
      case "Common POAP":
        return <CommonPOAP searchTerm={searchTerm} />;
      default:
        return <Portfolio searchTerm={searchTerm} />;
    }
  };

  const copyToClipboard = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
    navigator.clipboard.writeText(userWalletAddress).catch((err) => {
      console.error("Could not copy text: ", err);
    });
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };
  const [isWalletConnected, setWalletConnected] = useState("Connect Wallet");
const [userWalletAddress, setuserWalletAddress] = useState("");


  const connectWallet = async() => {

try{
  
if(window.ethereum === "undefined" ){
  alert("Install Metamsk Wallet");
}
  else{
    const accounts = await window.ethereum.request({method : "eth_requestAccounts"});
    console.log(accounts[0]);
    setWalletConnected("Wallet Connected");
    setuserWalletAddress(accounts[0]);
    console.log(userWalletAddress);
      }
}catch(e){console.log(e)}
  }


  const loginWithWeb3 = () => console.log("Login with Web3 Auth");

  return (
    <div className="app">
      <div className="Sidebar">
        <Link to="/">
          <img className="Main-logo" src={Logo}/>
        </Link>
        <ul className = "Button-panel">
          <li>
             <Link to="/">
              <img className = "Home-button" src={HomeIcon}/>
            </Link>
          </li>
          <li>
            <Link to="/swap">
              <img className = "Swap-button" src={SwapIcon}/>
            </Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element = {<div className="Main-container">
        <div className="top-bar">
          {isWalletConnected == "Wallet Connected" ? <div className="user-profile">
            <img
              className="user-profile-image"
              src={userProfileData.imageUrl}
              alt={`${userProfileData.name}'s profile`}
            />
            <div className="user-profile-info">
              <div className="user-profile-name">{userProfileData.name}</div>
              <div className="user-profile-address">
                <span>
                  
                  
                  
                {userWalletAddress.length>0 ? `${userWalletAddress.substring(
  0,
  6
)}...${userWalletAddress.substring(38)}` : ""}
                  
                  
                  
                  </span>                                              
                <button
                  className="user-profile-copy-button"
                  onClick={copyToClipboard}
                >
                  {isCopied ? "Copied!" : <img src={Copy}/>}
                </button>
              </div>
            </div>
          </div> : ""}
        </div>

        <div className="search-and-buttons">
          <input
            type="text"
            placeholder="Type something..."
            className="search-input"
            onChange={handleSearchChange}
            value={searchTerm}
          />
          <div className="buttons">
            <button className="connect-wallet-button" onClick={connectWallet}>
              <div className="wallet-logo">
                {isWalletConnected === "Connect Wallet" ? <img src={Wallet} /> : ""}
              </div>

{userWalletAddress.length>0 ? `Connected: ${userWalletAddress.substring(
  0,
  6
)}...${userWalletAddress.substring(38)}` : "Connect Wallet"}

            </button>
            <button className="web3-auth-button" onClick={loginWithWeb3}>
              Login Via Web3 Auth
            </button>
          </div>
        </div>

        <div className="content-below">
        <NavigationMenu setActiveComponent={setActiveComponent} />
      
        </div>
        {renderComponent()}
      </div>} />
        <Route path="/swap" element = {<Swap isWalletConnected={isWalletConnected}/>} />
      </Routes>
    </div>
  );
};

const NavigationMenu = ({ setActiveComponent , isWalletConnected}) => {
  return (
    <nav className="navigation-menu">
      <ul>
        <li>
          <button className="nav-button" onClick={() => setActiveComponent("Portfolio")}>
            Portfolio
          </button>
        </li>
        <li>
          <button className="nav-button" onClick={() => setActiveComponent("Transactions")}>
            Transactions
          </button>
        </li>
        <li>
          <button className="nav-button" onClick={() => setActiveComponent("Followers")}>
            Followers
          </button>
        </li>
        <li>
          <button className="nav-button" onClick={() => setActiveComponent("Following")}>
            Following
          </button>
        </li>
        <li>
          <button className="nav-button" onClick={() => setActiveComponent("Common POAP")}>
            Common POAP's
          </button>
        </li>
        <li>
          <button className="amount"> 
            $110,313 
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default App;
