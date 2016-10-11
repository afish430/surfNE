module.exports = 
	function showLoginPage(req , res , next){
  		res.render('loginView', 
  		{title:"Please Log In"});
	};