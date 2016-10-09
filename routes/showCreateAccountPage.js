module.exports = 
  function showCreateAccountPage(req , res , next){
      res.render('createAccountView', 
      {title:"Create User Account"});
  };
