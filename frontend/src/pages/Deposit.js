import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCopy, faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import "../styles/accountform.css";
// component
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import Iconify from '../components/Iconify';
import qrcode from "../images/qr_code.png";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import Web3 from "web3";
import BEP20Palego from "../contracts/BEP20Palego.sol";
import BEP20PalegoAbi from "../contracts/ABI/BEP20Palego.json";
import TRC20Palego from "../tronbox/contracts/TRC20Palego.sol";
import TRC20PalegoAbi from "../tronbox/contracts/ABI/TRC20Palego.json";

const TronWeb = require('tronweb');
// import Select from 'react-select'
// ----------------------------------------------------------------------
library.add(faEye, faEyeSlash);

export default function Addfunds() {
 
  const userDetails = JSON.parse(localStorage.getItem('userInfo'));

  const [userbscwalletbalance, setuserbscwalletBalance] = useState(0);

  const [value, setValue] = useState("");
  const [copystatus, setCopyStatus] = useState("");
  
  // mainnet 
  // const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
  // testnet
  const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
  
  const BSCContractaddress = "0x86e89F524Bce338194a910C7E5aF04887Ed9A370";
  const userbscwalletaddress = userDetails.bscwalletaddress;
  const usertrxwalletaddressbase58 = userDetails.trxwalletaddressbase58;
  
  async function getuserbscWalletBalance() {
    const userbscbalance = await web3.eth.getBalance(userbscwalletaddress);
    setuserbscwalletBalance(userbscbalance)
  }
  getuserbscWalletBalance();

  
  const handleChange = (e) => {
    setValue(e.target.value);
    if(value == "bep20") {
      const bscwallet = document.getElementById("bscwallet");
      const trcwallet = document.getElementById("trxwallet");
      bscwallet.style.display = "none";
      trcwallet.style.display = "block";
    }else if(value == "trc20") {
      const trcwallet = document.getElementById("trxwallet");
      const bscwallet = document.getElementById("bscwallet");
      trcwallet.style.display = "none";
      bscwallet.style.display = "block";
    }
  };



  return (
    <div className='container-d'>
        <form className="">
          <div><img src={qrcode} className="qrcode"/></div>
          <div className='walletbalances'>
            <div className="wallet-bal">
                <label className="" htmlFor="grid-last-name">Trx Wallet Balance(USDT): <span className='bal'></span></label>
            </div>
            <div className="wallet-bal">
                <label className="" htmlFor="grid-last-name">BSC Wallet Balance(USDT): <span className='bal'>{userbscwalletbalance}USDT</span></label>
            </div>
            <div className="wallet-bal">
                <label className="" htmlFor="grid-last-name">Total Wallet Balance(USDT): <span className='bal'></span></label>
            </div>
          </div>
          
          <div className='form-group'>
              <label className="formlabel" htmlFor="grid-password">Select Funding Wallet</label>
              <select className="forminput" value={value} onChange={handleChange}>
                <option value="trc20">TRC20 Wallet</option>
                <option value="bep20">BEP20 Wallet</option>
              </select>
          </div>

          <div id="bscwallet" className='form-group'>
            <div className='flex'>
              <div className='flex'>
                <p className='networktype'>Network: Bep20</p>
                <p className='not'>Use Bep20 as network</p>
              </div>
              <div className='flex'>
                <p>Depsit Wallet:<input value={userbscwalletaddress} readOnly className='forminput'/><CopyToClipboard text={userbscwalletaddress}
          onCopy={() => setCopyStatus('copied!!!')}>
          <button type='button' style={{background: 'transparent',textAlign: 'left', color: '#f1f1f1', float: 'right', border: 'none'}}><FontAwesomeIcon icon={faCopy}/> {copystatus}</button>
        </CopyToClipboard></p>
                <p className='not'>Transfer usdt only to this bep20 wallet address above</p>
              </div>
            </div>
          </div>

          <div id="trxwallet" className='form-group'>
            <div className='flex'>
              <div className='flex'>
                <p className='networktype'>Network: Trc20</p>
                <p className='not'>Use Trc20 as network</p>
              </div>
              <div className='flex'>
                <p>Depsit Wallet:<input value={usertrxwalletaddressbase58} id='trxwalletaddress' readOnly className='forminput'/><CopyToClipboard text={userbscwalletaddress}
          onCopy={() => setCopyStatus('copied!!!')}>
          <button type='button' style={{background: 'transparent',textAlign: 'left', color: '#f1f1f1', float: 'right', border: 'none'}}><FontAwesomeIcon icon={faCopy}/> {copystatus}</button>
        </CopyToClipboard></p>
                <p className='not'>Transfer usdt only to this Trc20 wallet address above</p>
              </div>
            </div>
          </div>

          {/* <Select options={options} /> */}           
        </form>
    </div>
  );
}
