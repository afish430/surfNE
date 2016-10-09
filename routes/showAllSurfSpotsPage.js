var colors = require('colors');
var DB = require('./dbConnection.js');
var SurfSpot = DB.getSurfSpotModel();

module.exports = 
	function displaySurfSpots(req , res , next){
    
    SurfSpot.find({}, function(err , surfSpots){
      if(err) {
        console.log("Error : %s ".red, err);
      }

      var results = surfSpots.map(function (surfSpot){
      	return {
      		id: surfSpot._id,
          name: surfSpot.name,
          location: surfSpot.town + ", " + surfSpot.state
      	}
      });

      res.render('allSurfSpotsView',
      	{title:"New England Surf Spots", data:results});

    });
};
