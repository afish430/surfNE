var colors = require('colors');
var DB = require('./dbConnection.js');
var User = DB.getUserModel();

module.exports = 
  function createAccount(req , res , next){

    //check that user name is at least 6 characters, letters and numbers only
    var userRegex = /^[a-zA-Z0-9]{6,}$/;  
    if (!req.body.userName.match(userRegex)){
      res.render('createAccountView',
      {
        title:"Create Account", 
        data: {
                errorMessage: "The user name does not meet requirements."
              }
      });
      return;  
    }

    //check that passwords match
  	if(req.body.password !== req.body.password2){
      res.render('createAccountView',
      {
        title:"Create Account", 
        data: {
                errorMessage: "The passwords do not match. Please try again.",
                userName: req.body.userName
              }
      });
      return;                
    }

    //check that password is at least 6 characters, includes a letter, a number, and a special character
    var pwdRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;  
    if (!req.body.password.match(pwdRegex)){
      res.render('createAccountView',
      {
        title:"Create Account", 
        data: {
                errorMessage: "The password does not meet requirements.",
                userName: req.body.userName
              }
      });
      return;  
    }

    User.findOne({userName: req.body.userName}, function(err, user){   	
        if(user){ //check that user name doesn't alrreasdy exist
          res.render('createAccountView',
          {
            title:"Create Account", 
            data: {
                    errorMessage: "This user name already exists. Please choose another."
                  }
          });              
        }
        else {
		    var user = new User({
		        userName: req.body.userName,
		        password: req.body.password,
		        isAdmin: false
		      }); 
		 
		    user.save(function (err){
		      if(err) {
		        console.log("Error : %s ".red,err);
		      }
		        
		      console.log("New User %s saved".cyan, user.userName); 
		      res.render('loginView', 
            {title:"Account Created! Please Log In"});
  		    });
        }

      });

  };