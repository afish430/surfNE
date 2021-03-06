var colors = require('colors');
var DB = require('./dbConnection.js');
var User = DB.getUserModel();

module.exports = 
  function loginUser(req , res , next){

      var showInvalidLogin = function(){
          res.render('loginView',
          {
            title:"Login", 
            data: {
                    errorMessage: "Invalid user name or password"
                  }
          });    
      };

      User.findOne({userName: req.body.userName}, function(err, user){

        if(err){
          console.log("Error logging in : %s ".red, err); 
        }

        if(user) {
          user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) throw err;
            if(isMatch){
              //add to session
              req.session.user = user;
              console.log("Logged in user %s".cyan, user.userName); 
              if (req.body.fromId){
                res.redirect('/surfspots/info/' + req.body.fromId); //send back to info page where user hit Log In from
              }
              else {
                res.redirect('/surfspots');
              }          
            }
            else {
              showInvalidLogin();
            }   
          });
        }
        else {
          showInvalidLogin();
        }

      });
        
    };