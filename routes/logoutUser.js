var colors = require('colors');
var DB = require('./dbConnection.js');
var User = DB.getUserModel();

module.exports = 
  function logoutUser(req , res , next){

	  console.log("Logging out user %s".cyan, req.session.user.userName); 
      //Do logout (delete user from session)
      delete req.session.user;
        
      res.redirect('/surfspots');
    }