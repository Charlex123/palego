import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import Alert from 'react-bootstrap/Alert';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
// Styles
import "../styles/dashboard.css";
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

// mock
import USERLIST from '../_mock/user';
import { faBorderNone } from '@fortawesome/free-solid-svg-icons';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const navigate = useNavigate();

  const userDetails = JSON.parse(localStorage.getItem('userInfo'));
  
  const [otpin] = useState(userDetails.tpin);
  const [userid] = useState(userDetails._id);
  const [tpin , setTPin] = useState("");
  const [newpassword , setNewPassword] = useState("");
  const [confirmnewpassword , setConfirmNewPassword] = useState("");
  const [showAlert , setShowAlert] = useState("");
  const [confirmtpin , setConfirmTPin] = useState("");
  const [tpininputType, settpininputType] = useState("password");
  const [otpininputType, setotpininputType] = useState("password");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(<FontAwesomeIcon icon={faEye} />);
  const [passwordinputType, setpasswordinputType] = useState("password");
  
  const otoggletpinVisiblity = () => {
    if(otpininputType === "password") {
      setotpininputType("text")
      setEyeIcon(<FontAwesomeIcon icon={faEye} />)
    }else {
      setotpininputType("password")
      setEyeIcon(<FontAwesomeIcon icon={faEyeSlash} />);
    }
  };

  const toggletpinVisiblity = () => {
    if(tpininputType === "password") {
      settpininputType("text")
      setEyeIcon(<FontAwesomeIcon icon={faEye} />)
    }else {
      settpininputType("password")
      setEyeIcon(<FontAwesomeIcon icon={faEyeSlash} />);
    }
  };

  const toggletpasswordVisiblity = () => {
    if(passwordinputType === "password") {
      setpasswordinputType("text")
      setEyeIcon(<FontAwesomeIcon icon={faEye} />)
    }else {
      setpasswordinputType("password")
      setEyeIcon(<FontAwesomeIcon icon={faEyeSlash} />);
    }
  };
  
    const tpinsubmitHandler = async (e) => {
      e.preventDefault();
      
      if (tpin !== confirmtpin) {
        setMessage("transaction pins do not match");
      }else if (tpin.length > 4) {
        setMessage("transaction pin must be a 4 digits number");
      }
      else {
        setMessage(null);
        try {
          const config = {
            headers: {
              "Content-type": "application/json"
            }
          }  
          setLoading(true);
          
          const {data} = await axios.post("/api/users/updatetransactionpin", {
            userid,
            tpin
          }, config);
          
          setLoading(false)
          setShowAlert(<Alert >
            Transaction Pin Change Success
          </Alert>)
        } catch (error) {
          setError(error.response.data.message)
          console.log(error.response.data)
        }
    }
    
  }

  function updatetpin() {
    const tpinDiv = document.getElementById("showtpinform");
          if(tpinDiv.style.display == "none") {
            tpinDiv.style.display = 'block';
          }else {
            tpinDiv.style.display = 'none';
          }
  }

  function updatepass() {
    const npassinDiv = document.getElementById("showupdatepassform");
          if(npassinDiv.style.display == "none") {
            npassinDiv.style.display = 'block';
          }else {
            npassinDiv.style.display = 'none';
          }
  }

  function deleteaccount() {
    
  }

  const passsubmitHandler = async (e) => {
    e.preventDefault();
    
    if (newpassword !== confirmnewpassword) {
      setMessage("passwords do not match");
    }else if (newpassword.length < 6) {
      setMessage("Password must be more than 6 characters");
    }
    else {
      setMessage(null);
      try {
        const config = {
          headers: {
            "Content-type": "application/json"
          }
        }  
        setLoading(true);
        
        const {data} = await axios.post("/api/users/resetpassword", {
          userid,
          newpassword
        }, config);
        
        setLoading(false)
        setShowAlert(<Alert >
          Password Change Success
        </Alert>)
      } catch (error) {
        setError(error.response.data.message)
        console.log(error.response.data)
      }
  }
  
}

  
  const pic = userDetails.pic;
  return (
  <Page title="User">
    <Container>
        <h1>My Profile</h1>
        <div className='row'>
          <div className='col-md-8'>
            <div className='row mt-4 mb-4'>
              <div className='col-md-2'>
                  <div>
                    <img src={pic} className="p-img"/>
                  </div>
              </div>
              <div className='col-md-9'>
                  <div className="bg-transparent text-secondary">My Username: <span>{userDetails.username}</span></div>
                  <div className="bg-transparent text-secondary">My Email: <span>{userDetails.email}</span></div>
              </div>
            </div>
            <div className="bg-transparent">
              <div className=" text-secondary">Change Profile Image: <button>Upload Image</button></div>
            </div>
            <div className='tpin'>
              <div className='tranxpin'>
                  <span>Default Transaction Pin: </span><div className='txpin'><input type={otpininputType} value={otpin} /> <button className="passhideshowButton" onClick={otoggletpinVisiblity} type="button">{eyeIcon}</button> <button onClick={updatetpin}>Update Transaction Pin</button></div>
              </div>
              <div className='settpin' id="showtpinform">
              {showAlert}
              <form className="formTag" onSubmit={tpinsubmitHandler}>
                
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                {loading && <Loading />}
                
                <div className='form-group'>
                    <label className="formlabel" htmlFor="grid-tpin"> Transaction pin</label>
                      <input className="forminput" id="tpin" type={tpininputType} placeholder="Enter transaction"
                      value={tpin}
                      onChange={(e) => setTPin(e.target.value)}
                      />
                      <button className="passhideshowButton" onClick={toggletpinVisiblity} type="button">{eyeIcon}</button>
                      
                </div>

                <div className="form-group">
                    <label className="formlabel" htmlFor="grid-tpin">Confirm transaction pin</label>
                      <input className="forminput" id="confirmtpin" type={tpininputType} placeholder="Confirm transaction pin"
                      value={confirmtpin}
                      onChange={(e) => setConfirmTPin(e.target.value)}
                      />
                      <button className="passhideshowButton border-0" onClick={toggletpinVisiblity} type="button">{eyeIcon}</button>
                    <p className="formpTag">Your transaction pin is encrypted and secured, we will not disclose your tpin with any third</p>
                  </div>
                
                <div className='mx-auto text-center'>
                  <button className="registerButton" type="submit">
                    Submit
                  </button>
                </div>
              </form>
              </div>
            </div>

            <div className='tpass'>
              <div>Update Your Password: <button onClick={updatepass}>Update Password</button></div>
              <div className='setpass' id="showupdatepassform">
              {showAlert}
              <form className="formTag" onSubmit={passsubmitHandler}>
                
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                {loading && <Loading />}
                
                <div className='form-group'>
                    <label className="formlabel" htmlFor="grid-tpin"> New Password</label>
                      <input className="forminput" id="newpassword" type={passwordinputType} placeholder="Enter transaction"
                      value={newpassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      />
                      <button className="passhideshowButton" onClick={toggletpasswordVisiblity} type="button">{eyeIcon}</button>
                      
                </div>

                <div className="form-group">
                    <label className="formlabel" htmlFor="grid-tpin">Confirm transaction pin</label>
                      <input className="forminput" id="confirmnewpassword" type={passwordinputType} placeholder="Confirm transaction pin"
                      value={confirmnewpassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      />
                      <button className="passhideshowButton border-0" onClick={toggletpasswordVisiblity} type="button">{eyeIcon}</button>
                    <p className="formpTag">Your transaction pin is encrypted and secured, we will not disclose your tpin with any third</p>
                  </div>
                
                <div className='mx-auto text-center '>
                  <button className="registerButton" type="submit">
                    Submit
                  </button>
                </div>
              </form>
              </div>
            </div>

            <div className='del-acc mt-4 pt-4'>
              <button onClick={deleteaccount} className="bg-danger rounded">Delete Account</button>
            </div>
          </div>
          <div className='col-md-4'>
            <div className="text-secondary">User Level <div className='user-level'>{userDetails.level}</div></div>
          </div>
        
        </div>
      </Container>
    </Page>
  );
}
