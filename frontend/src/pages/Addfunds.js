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
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import Web3 from "web3";
import Palego from "../contracts/Palego.sol";
import BEP20USDTABI from "../contracts/ABI/BEP20USDT.json";

const TronWeb = require('tronweb')
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const privateKey = "3481E79956D4BD95F358AC96D151C976392FC4E3FC132F78A847906DE588C145";
const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);

// ----------------------------------------------------------------------
library.add(faEye, faEyeSlash);

export default function Addfunds() {
 
  const userDetails = JSON.parse(localStorage.getItem('userInfo'));

  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [userbscwalletbalance, setuserbscwalletBalance] = useState(0);
  const [usertrxwalletbalance, setusertrxwalletBalance] = useState(0);
  const [usertotalwalletbalance, setusertotalwalletBalance] = useState(0);
  const [tpin, setTPin] = useState("");
  const [value, setValue] = useState("");
  
  // mainnet 
  const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
  // testnet
  // const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
  
  const BSCContractaddress = "0x86e89F524Bce338194a910C7E5aF04887Ed9A370";
  const userbscwalletaddress = userDetails.bscwalletaddress;
  const usertrxwalletaddressbase58 = userDetails.trxwalletaddressbase58;
  
  async function getbscuserWalletBalance() {
    const userbscbalance = await web3.eth.getBalance(userbscwalletaddress);
    setuserbscwalletBalance(userbscbalance)
  }
  getbscuserWalletBalance();

  // console.log(tronWeb)
console.log(usertrxwalletaddressbase58)
  async function gettrxuserWalletBalance() {
    await tronWeb.trx.getBalance(usertrxwalletaddressbase58)
  const balance = await tronWeb.trx.getBalance(usertrxwalletaddressbase58);
    console.log(balance)
  }
  gettrxuserWalletBalance();

  const maxAmount = async (e) => {
    const userbscbalance = await web3.eth.getBalance(userbscwalletaddress);
    const usertrxbalance = await tronWeb.trx.getBalance(usertrxwalletaddressbase58);
    setAmount({userbscbalance} ? {usertrxbalance} : 0);
  };
  
  useEffect(() => {
    setusertotalwalletBalance(userbscwalletbalance+usertotalwalletbalance);  
    },[])


    const [passwordinputType, setpasswordinputType] = useState("password");
    const [eyeIcon, setEyeIcon] = useState(<FontAwesomeIcon icon={faEye} />);
  
  
  const togglePasswordVisiblity = () => {
    if(passwordinputType === "password") {
      setpasswordinputType("text")
      setEyeIcon(<FontAwesomeIcon icon={faEye} />)
    }else {
      setpasswordinputType("password")
      setEyeIcon(<FontAwesomeIcon icon={faEyeSlash} />);
    }
  };
  
  const handleChange = (e) => {
    setValue(e.target.value);
    const amountinputField = document.getElementById("inputamount");
    if(value == "bep20") {
      const bscwallet = document.getElementById("bscwallet");
      const trcwallet = document.getElementById("trxwallet");
      bscwallet.style.display = "none";
      trcwallet.style.display = "block";
      amountinputField.style.display = "block";
    }else if(value == "trc20") {
      const trcwallet = document.getElementById("trxwallet");
      const bscwallet = document.getElementById("bscwallet");
      trcwallet.style.display = "none";
      bscwallet.style.display = "block";
      amountinputField.style.display = "block"
    }
  };


  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }  
      const {data} = await axios.post("/api/users/login/users", {
        amount
      }, config);
      localStorage.setItem("userInfo", JSON.stringify(data))
      navigate(`/dashboard/app/${data.username}`, { replace: true })
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <div className='container-d'>
        <form className="" onSubmit={submitHandler}>
          <div><img src={qrcode} className="qrcode"/></div>
          <div className='walletbalances'>
            <div className="wallet-bal">
                <label className="" htmlFor="grid-last-name">Trx Wallet Balance(USDT): <span className='bal'>{userbscwalletbalance}USDT</span></label>
            </div>
            <div className="wallet-bal">
                <label className="" htmlFor="grid-last-name">BSC Wallet Balance(USDT): <span className='bal'>{usertrxwalletbalance}USDT</span></label>
            </div>
            <div className="wallet-bal">
                <label className="" htmlFor="grid-last-name">Total Wallet Balance(USDT): <span className='bal'>{usertotalwalletbalance}USDT</span></label>
            </div>
          </div>
          
          <div className='form-group'>
              <label className="formlabel" htmlFor="grid-fwallet">Select Funding Wallet</label>
              <select className="forminput" value={value} onChange={handleChange}>
                <option value="trc20">TRC20 Wallet</option>
                <option value="bep20">BEP20 Wallet</option>
              </select>
          </div>

          <div className="form-group" id="inputamount">
              <label className="formlabel" htmlFor="grid-last-name">Amount</label>
                <input className="forminput" id="grid-last" required
                  type="text"
                  value={amount}
                  placeholder="Funding Amount"
                  onChange={(e) => setAmount(e.target.value)}
                  />
              <button className="passhideshowButton" onClick={maxAmount} type="button">Max</button>
          </div>

          <div id="bscwallet" className='form-group'>
            <div className='flex'>
              <div className='flex'>
                <p className='networktype'>Network: Bep20</p>
                <p className='not'>Use Bep20 as network</p>
              </div>
              <div className='flex'>
                <p>Depsit Wallet:<input value={userbscwalletaddress} readOnly className='forminput'/></p>
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
                <p>Depsit Wallet:<input value={usertrxwalletaddressbase58} readOnly className='forminput'/></p>
                <p className='not'>Transfer usdt only to this Trc20 wallet address above</p>
              </div>
            </div>
          </div>

          {/* <Select options={options} /> */}

          <div className='labelDiv'>
              <label className="formlabel" htmlFor="grid-tpin">Transaction Pin</label>
              <input className="forminput" id="transactionpin" 
                type={passwordinputType}
                value={tpin}
                placeholder="Transaction Pin"
                onChange={(e) => setTPin(e.target.value)}
              />
              <button className="passhideshowButton" onClick={togglePasswordVisiblity} type="button">{eyeIcon}</button>
          </div>
            
          <div className='mx-auto text-center'>
            <button className="registerButton" type="submit">
              Add Funds
            </button>
          </div>
        </form>
    </div>
  );
}
