import React, { useState } from 'react'
import {Input , Popover , Radio , Modal , Message} from "antd";
import {
  ArrowDownOutlined,
  DownOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import "../Styles/Swap.css";
import tokenList from "../token-list.json";

const Swap = ({isWalletConnected}) => {
  const [tokenOneAmount , setTokenOneAmount] = useState(null);
  const [tokenTwoAmount , setTokenTwoAmount] = useState(null);
  const [tokenOne , setTokenOne] = useState(tokenList[0]);
  const [tokenTwo , setTokenTwo] = useState(tokenList[1]);
  const [isOpen , SetIsOpen] = useState(false);
  const [changeToken , setChangeToken] = useState(1);

  const changeAmount = (e) => {
    setTokenOneAmount(e.target.value);
  }

  const switchTokens = () => {
    const one = tokenOne;
    const two = tokenTwo;
    setTokenOne(two);
    setTokenTwo(one);
  }

  const openModal = (asset) => {
    setChangeToken(asset);
    SetIsOpen(true);
  } 

  const modifyToken = (i) => {
    if(changeToken === 1){
      setTokenOne(tokenList[i]);
    }
    else{
      setTokenTwo(tokenList[i]);
    }

    SetIsOpen(false);
  }

  return (
    <>
    <Modal
      open={isOpen}
      footer={null}
      onCancel={() => SetIsOpen(false)}
      title = "Select a token"
    >
      <div className="modalContent">
        {tokenList?.map((e,i) => {
          return(
              <div
                className="tokenChoice"
                key={i}
                onClick={() => modifyToken(i)}
              >
                <img src={e.img} alt={e.ticker} className="tokenLogo" />
                <div className="tokenChoiceNames">
                  <div className="tokenName">{e.name}</div>
                  <div className="tokenTicker">{e.ticker}</div>
                </div>
              </div>
          ); 
        })}
      </div>
    </Modal>
    <div className="tradeBox">
      <div className="tradeBoxHeader">
        <h4 className="swap-heading">Swap</h4>
      </div>
      <div className="inputs">
        <Input placeholder='0' value={tokenOneAmount} onChange={changeAmount}/>
        <Input placeholder='0' value={tokenTwoAmount} disabled={true}/>
        <div className="switchButton" onClick={switchTokens}>
          <ArrowDownOutlined className="switchArrow" />
        </div>
        <div className="assetOne" onClick={() => openModal(1)}>
          <img src={tokenOne.img} alt="assetOneLogo" className="assetLogo"/>
          {tokenOne.ticker}
          <DownOutlined />
        </div>
        <div className="assetTwo" onClick={() => openModal(2)}>
          <img src={tokenTwo.img} alt="assetTwoLogo" className="assetLogo"/>
          {tokenTwo.ticker}
          <DownOutlined />
        </div>
      </div>
      <div className="swapButton" /*onClick={fetchDexSwap}*/ disabled={!tokenOneAmount || isWalletConnected === "Connect Wallet"}>
        { isWalletConnected === "Connect Wallet" ? <p>Please Connect Wallet ! </p>: <p>Swap</p> }
      </div>
    </div>
    </>
  )
}

export default Swap