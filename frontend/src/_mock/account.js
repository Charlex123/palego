// ----------------------------------------------------------------------
const userDetails = JSON.parse(localStorage.getItem('userInfo'));
function getUsername() {
  if(userDetails) {
    const username = userDetails.username;
    return username;
  }
   return "";
};

function getEmail() {
  if(userDetails) {
    const username = userDetails.email;
    return username;
  }
   return "";
};

function getPic() {
  if(userDetails) {
    const pic = userDetails.pic;
    return pic;
  }
   return "";
};

const account = {
  displayName: getUsername(),
  email: getEmail(),
  photoURL: getPic(),
};

export default account;
