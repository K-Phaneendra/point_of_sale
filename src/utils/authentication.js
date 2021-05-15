export const isUserLoggedIn = () => {
  // if user logs in, then we store userID to the session storage
  const userID = sessionStorage.getItem('userID');
  if (userID) {
    return true;
  }
  return false;
};

export default {};
