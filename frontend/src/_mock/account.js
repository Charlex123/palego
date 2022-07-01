// ----------------------------------------------------------------------
const userDetails = JSON.parse(localStorage.getItem('userInfo'));
const userName = userDetails.username;
const emailD = userDetails.email;
const pic = userDetails.pic;
const account = {
  displayName: userName,
  email: emailD,
  photoURL: pic,
};

export default account;
