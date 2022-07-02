import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import Alert from 'react-bootstrap/Alert';
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
import BEP20Palego from "../contracts/BEP20Palego.sol";
import BEP20PalegoAbi from "../contracts/ABI/BEP20Palego.json";
import TRC20Palego from "../tronbox/contracts/TRC20Palego.sol";
import TRC20PalegoAbi from "../tronbox/contracts/ABI/TRC20Palego.json";
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
  console.log(userDetails)
  const navigate = useNavigate();

  const [amount, setAmount] = useState("");
  const [assettype, setAssetType] = useState("");
  const [assetaddress, setAssetAddress] = useState("");
  const [error, setError] = useState(false);
  const [userId] = useState(userDetails._id);
  const [status] = useState("Active");
  const [userbscwalletbalance, setuserbscwalletBalance] = useState(0);
  const [usertrxwalletbalance, setusertrxwalletBalance] = useState(0);
  const [message, setMessage] = useState(null);
  const [usertotalwalletbalance, setusertotalwalletBalance] = useState(0);
  const [tpin, setTPin] = useState("");
  const [showAlert , setShowAlert] = useState("");
  const [value, setValue] = useState("");
  
  // mainnet 
  const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
  // testnet
  // const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
  
  const TRC20USDTcontractaddres =  "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
  const BEP20USDTcontractaddres =  "0x55d398326f99059fF775485246999027B3197955";
  const PalegoBEP20ContractAddress = "0xF3005B94480F8D15FE434F07B0A047840620d958";
  const PalegoTRC20ContractAddress = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";
  const userbscwalletaddress = userDetails.bscwalletaddress;
  const usertrxwalletaddressbase58 = userDetails.trxwalletaddressbase58;
  
  async function getbscuserWalletBalance() {
    const userbscbalance = await web3.eth.getBalance(userbscwalletaddress);
    setuserbscwalletBalance(userbscbalance)
  }
  getbscuserWalletBalance();

  async function gettrxuserWalletBalance() {
  const usertrxbalance = await tronWeb.trx.getBalance(usertrxwalletaddressbase58);
  setusertrxwalletBalance(usertrxbalance)
  }
  gettrxuserWalletBalance();

  // var subscription = web3.eth.subscribe('logs', {
  //   address: '0x123456..',
  //   }, function(error, result){
  //   if (!error)
  //   console.log(result);
  //   })
  //   .on("data", function(log){
  //   console.log(log);
  //   })
  //   .on("changed", function(log){
  //   });

//   async function transferUSDT(e) {

//     setValue(e.target.value);
//     const amountinputField = document.getElementById("inputamount");
//     if(value == "bep20") {
//       const contract = await web3.eth.contract(BEP20PalegoAbi, BEP20Palego);
//       const resp = await contract.methods.transfer(PalegoBEP20ContractAddress, amount).send();
//       console.log("transfer:", resp);
//     }else if(value == "trc20") {
//       const contract = tronWeb.contract(TRC20PalegoAbi,TRC20Palego);
//       const resp = await contract.methods.transfer(PalegoTRC20ContractAddress, amount).send();
//       console.log("transfer:", resp);
//     }
    
// }

  const maxAmount = async (e) => {
    const bscbalance = await web3.eth.getBalance(userbscwalletaddress);
    const trxbalance = await tronWeb.trx.getBalance(usertrxwalletaddressbase58);

    if(value == "bep20") {
      setAmount(bscbalance);
    }else if(value == "trc20") {
      setAmount(trxbalance);
    }
  };
  
  // generate random number between 1 and 2
  
 const random = Math.floor(Math.random() * (200 - 100) + 100)/100;
 
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
      setAssetType("trc20");
      setAssetAddress(usertrxwalletaddressbase58)
    }else if(value == "trc20") {
      const trcwallet = document.getElementById("trxwallet");
      const bscwallet = document.getElementById("bscwallet");
      trcwallet.style.display = "none";
      bscwallet.style.display = "block";
      amountinputField.style.display = "block";
      setAssetType("bep20");
      setAssetAddress(userbscwalletaddress);
    }
  };

  
  const submitHandler = async (e) => {
    e.preventDefault();
    const dailyprofit = (random/100) * amount;
    const assetdailyprofitratio = random;
    const minassetduration = 86400;
    const profitamountt = amount - dailyprofit;
    const profitamount = profitamountt.toFixed(2);
    const shortassetaddress = assetaddress.slice(0, 10);
    console.log(assetaddress)
    if (amount < 20) {
      setMessage("Mininum Asset Funds Is $20 USDT");
    }
    else if(tpin != userDetails.tpin) {
      setMessage("Your transaction pin do not match");
    }
    else if(tpin.length > 4) {
      setMessage("Transaction pin must be a 4 digit number");
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }  
      const {data} = await axios.post("/api/users/addfunds", {
        amount,
        assetdailyprofitratio,
        assettype,
        assetaddress,
        shortassetaddress,
        userId,
        status,
        dailyprofit,
        minassetduration,
        profitamount
      }, config);
      console.log(data)
      setShowAlert(<Alert >
        {assettype} asset of {amount+'USDT'} sucessfully added
      </Alert>)
      // navigate(`/dashboard/app/${data.username}`, { replace: true })
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <div className='container-d'>
        <form className="" onSubmit={submitHandler}>
          <div><img src={qrcode} className="qrcode"/></div>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          {showAlert}
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
                  placeholder="enter funding amount"
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
            <button className="addfundsbtn" type="submit">
              Add Funds
            </button>
          </div>
        </form>
    </div>
  );
}
