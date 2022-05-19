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

// ----------------------------------------------------------------------
library.add(faEye, faEyeSlash);
export default function RegisterForm() {
  const navigate = useNavigate();

  const { id } = useParams();
  
  const sponsorId = id;
  console.log(sponsorId)
  const [email, setEmail] = useState("");
  const [username, setUserame] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
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
        setLoading(true)
        const {data} = await axios.post("/api/users/register", {
          username,
          sponsorId,
          email,
          password,
          pic
        }, config);
  
        localStorage.setItem("userInfo", JSON.stringify(data))
        setLoading(false)
        navigate(`/dashboard/app/${data.username}`, { replace: true })
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
      <div className="formDiv">
        <div className="innerformDiv">
          <label className="formlabel" htmlFor="grid-last-name">
            Username
            <div className='labelDiv'>
              <input className="forminput" id="grid-uaer-name" type="varchar" placeholder="Enter username" required
              value={username}
              onChange={(e) => setUserame(e.target.value)}
              />
            </div>
          </label>
        </div>
      </div>
      <div className="formDiv">
        <div className="innerformDiv">
          <label className="formlabel" htmlFor="grid-email">
            Email
            <div className='labelDiv'>
              <input className="forminput" id="email" type="email" placeholder="Enter email" required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </label>
        </div>
      </div>
      <div className="formDiv">
        <div className="innerformDiv">
          <label className="formlabel" htmlFor="grid-password">
            Password
            <div className='labelDiv'>
              <input className="forminput" id="password" type={passwordinputType} placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
              <button className="passhideshowButton" onClick={togglePasswordVisiblity} type="button">{eyeIcon}</button>
            </div>
          </label>
          <p className="formpTag">Make it as long and as crazy as you'd like</p>
        </div>
      </div>
      <div className="formDiv">
        <div className="innerformDiv">
          <label className="formlabel" htmlFor="grid-password">
            Confirm Password
            <div className='labelDiv'>
              <input className="forminput" id="confirmpassword" type={passwordinputType} placeholder="Confirm password"
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button className="passhideshowButton" onClick={togglePasswordVisiblity} type="button">{eyeIcon}</button>
            </div>
          </label>
          <p className="formpTag">Your password is encrypted and secured, we will not disclose your password with any third</p>
        </div>
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
      
      <button className="registerButton" type="submit">
        Register
      </button>
    </form>
  );
}
