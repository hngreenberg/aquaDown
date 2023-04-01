const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.logged_in) {
    console.log('You are not logged in');
    res.redirect('/login');
  } else {
   console.log('You are logged in')
    next();
  }
};

module.exports = withAuth;
