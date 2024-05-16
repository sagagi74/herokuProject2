const withAuth = (req, res, next) => {
<<<<<<< HEAD
  // If the user isn't logged in, redirect them to the login route
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
=======
    // If the user is not logged in, redirect the user to the login page
    // This is directly from the `/gallery/:id` and `/painting/:id` routes
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {
      // If the user is logged in, execute the route function that will allow them to view the gallery
      // We call next() if the user is authenticated
      next();
    }
  };
  
  module.exports = withAuth;
  
>>>>>>> 80c37a0f92324620ef21b332d6ab9a7be1f1582a
