var colors = require('colors');
var DB = require('./dbConnection.js');
var User = DB.getUserModel();

module.exports = 
  function loginUser(req , res , next){

      User.findOne({userName: req.body.userName}, function(err, user){

        if(err){
          console.log("Error logging in : %s ".red, err); 
        }

        if(!user || user.password !== req.body.password){
          res.render('loginView',
          {
            title:"Login", 
            data: {
                    errorMessage: "Invalid user name or password"
                  }
          });                
        }
        else {
          //add to session
          req.session.user = user;
          console.log("Logged in user %s".cyan, user.userName); 
          res.redirect('/surfspots');
        }

      });
        
    };