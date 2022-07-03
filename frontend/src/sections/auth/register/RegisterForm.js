import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PasswordChecklist from "react-password-checklist";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import '../../../styles/index.css';
import '../../../styles/register.css';
// component
import Iconify from '../../../components/Iconify';
import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import Web3 from "web3";
import { functions } from 'lodash';

const TronWeb = require('tronweb')
const HttpProvider = TronWeb.providers.HttpProvider;
const fullNode = new HttpProvider("https://api.trongrid.io");
const solidityNode = new HttpProvider("https://api.trongrid.io");
const eventServer = new HttpProvider("https://api.trongrid.io");
const privateKey = "3481E79956D4BD95F358AC96D151C976392FC4E3FC132F78A847906DE588C145";
const tronWeb = new TronWeb(fullNode,solidityNode,eventServer,privateKey);

// ----------------------------------------------------------------------
library.add(faEye, faEyeSlash);
export default function RegisterForm() {
  const navigate = useNavigate();

  const { id } = useParams();
  
  const sponsorId = id;
  const [email, setEmail] = useState("");
  const [username, setUserame] = useState("");
  const [transactionpin, setTransactionPin] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [level, setLevel] = useState("White Label");
  const [tpin, setTPin] = useState(1234);
  const [loading, setLoading] = useState(false);
  const [refBonus] = useState(0);
  const [totalrefBonus] = useState(0);
  const [withdrawnRefBonus] = useState(0);
  const [passwordinputType, setpasswordinputType] = useState("password");
  const [eyeIcon, setEyeIcon] = useState(<FontAwesomeIcon icon={faEye} />);
  //   const [accounts, setAccounts] = useState([]);

//   const isConnected = Boolean(accounts[0]);


    // mainnet 
    // const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
    // testnet
    const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');

    const bscaccount = web3.eth.accounts.create();
    const bscwalletaddress = bscaccount.address;
    const bscwalletprivatekey = bscaccount.privateKey;

    
    const togglePasswordVisiblity = () => {
    if(passwordinputType === "password") {
      setpasswordinputType("text")
      setEyeIcon(<FontAwesomeIcon icon={faEye} />)
    }else {
      setpasswordinputType("password")
      setEyeIcon(<FontAwesomeIcon icon={faEyeSlash} />);
    }
  };
  
  

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (password !== confirmpassword) {
      setMessage("Passwords do not match");
    }else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json"
          }
        }  
        setLoading(true);
        setLevel("White Whale");

        const res = await TronWeb.createAccount();
        const trxwalletaddressbase58 = res.address.base58;
        const trxwalletaddresshex = res.address.hex;
        const trxwalletprivatekey = res.privateKey;
        const {data} = await axios.post("/api/users/register", {
          username,
          sponsorId,
          email,
          level,
          tpin,
          password,
          refBonus,
          totalrefBonus,
          withdrawnRefBonus,
          bscwalletaddress,
          bscwalletprivatekey,
          trxwalletaddressbase58,
          trxwalletaddresshex,
          trxwalletprivatekey,
          pic
        }, config);
  
        console.log(data)
        localStorage.setItem("userInfo", JSON.stringify(data))
        setLoading(false)
        navigate(`/regsuccess/user/${data.username}`, { replace: true })
      } catch (error) {
        setError(error.response.data.message)
        console.log(error.response.data)
      }
  }
  
}

  return (
    <form className="formTag" onSubmit={submitHandler}>
      
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {loading && <Loading />}
      
      <div className='form-group'>
          <label className="formlabel" htmlFor="grid-last-name">Username</label>
          <input className="forminput" id="grid-user-name" type="varchar" placeholder="Enter username" required
            value={username}
            onChange={(e) => setUserame(e.target.value)}
            />
      </div>
          
      <div className="form-group">
        <label className="formlabel" htmlFor="grid-email"> Email</label>
              <input className="forminput" id="email" type="email" placeholder="Enter email" required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
      </div>

      <div className='form-group'>
          <label className="formlabel" htmlFor="grid-password"> Password</label>
            <input className="forminput" id="password" type={passwordinputType} placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button className="passhideshowButton" onClick={togglePasswordVisiblity} type="button">{eyeIcon}</button>
            <p className="formpTag">Make it as long and as crazy as you'd like</p>
      </div>

      <div className="form-group">
          <label className="formlabel" htmlFor="grid-password">Confirm Password</label>
            <input className="forminput" id="confirmpassword" type={passwordinputType} placeholder="Confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="passhideshowButton" onClick={togglePasswordVisiblity} type="button">{eyeIcon}</button>
           <p className="formpTag">Your password is encrypted and secured, we will not disclose your password with any third</p>
        </div>
      <div className='font-sm' style={{fontSize: 12}}>
        <PasswordChecklist
          rules={["minLength","specialChar","number","capital","match"]}
          minLength={5}
          value={password}
          valueAgain={confirmpassword}
          // onChange={(isValid) => {}}
        />
      </div>
      
      <div className='mx-auto text-center'>
        <button className="registerButton" type="submit">
          Register
        </button>
      </div>
    </form>
  );
}
