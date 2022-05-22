import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
// component
import Loading from '../../../components/Loading';
import ErrorMessage from '../../../components/ErrorMessage';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------
library.add(faEye, faEyeSlash);

export default function LoginForm() {
  
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

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

    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }  
      setLoading(true)
      const {data} = await axios.post("/api/users/login/users", {
        email,
        password
      }, config);
      localStorage.setItem("userInfo", JSON.stringify(data))
      setLoading(false)
      navigate(`/dashboard/app/${data.username}`, { replace: true })
    } catch (error) {
      console.log(error.response.data)
    }
  }

  return (
    <form className="formTag" onSubmit={submitHandler}>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      <div className="formDiv">
        <div className="innerformDiv">
          <label className="formlabel" htmlFor="grid-last-name">
            Email
            <div className='labelDiv'>
              <input className="forminput" id="grid-last-name" required
               type="email"
               value={email}
               placeholder="Enter email"
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
              <input className="forminput" id="grid-password" 
               type={passwordinputType}
               value={password}
               placeholder="Password"
               onChange={(e) => setPassword(e.target.value)}
              />
              <button className="passhideshowButton" onClick={togglePasswordVisiblity} type="button">{eyeIcon}</button>
            </div>
          </label>
          <p className="formpTag">Make it as long and as crazy as you'd like</p>
        </div>
      </div>
      <button className="registerButton" type="submit">
        Login
      </button>
    </form>
  );
}
