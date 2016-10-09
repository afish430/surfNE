var colors = require('colors');
var DB = require('./dbConnection.js');
var User = DB.getUserModel();

module.exports = 
  function createAccount(req , res , next){

  	if(req.body.password !== req.body.password2){
      res.render('createAccountView',
      {
        title:"Create Account", 
        data: {
                errorMessage: "The passwords do not match. Please try again."
              }
      });
      return;                
    }

    User.findOne({userName: req.body.userName}, function(err, user){   	
        if(user){
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
		      res.redirect('/login');
		    });
        }

      });

  };