module.exports = 
	function showAddSurfSpot(req , res , next){

		if (!req.session.user || !req.session.user.isAdmin) {
        	return res.render('404');
      	}

  		res.render('addSurfSpotView', 
  		{title:"Add a New Surf Spot"});
	};
