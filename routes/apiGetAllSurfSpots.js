var colors = require('colors');
var DB = require('./dbConnection.js');
var SurfSpot = DB.getSurfSpotModel();

module.exports = function(req, res){
	
	SurfSpot.find({}, function(err , surfSpots){
      if(err) {
        console.log("Error : %s ".red, err);
      }

      var results = surfSpots.map(function (surfSpot){
      	return {
      		id: surfSpot._id,
            name: surfSpot.name,
            location: surfSpot.town + ", " + surfSpot.state,
            lat: surfSpot.latitude,
            lon: surfSpot.longitude,
            description: surfSpot.description,
	        infoLink: surfSpot.infoLink,
	        surfShopLink: surfSpot.surfShopLink,
	        surflineLink: surfSpot.surflineLink,
	        mswLink: surfSpot.mswLink,
	        swellInfoLink: surfSpot.swellInfoLink
      	}
      });

      res.format({
			//return surf spots as JSON
			'application/json': function() {
				res.json(results);
			},
			//return surf spots as XML
			'application/xml': function() {
				var surfSpotsXml = 
					'<?xml version="1.0"?>\n<surfSpots>\n' +
						results.map(function(spot){
							return ' <surfSpot id="' + spot.id + '">\n'
									+ '  <location>' + spot.location + '</location>\n'
									+ '  <lat>' + spot.lat + '</lat>\n'
									+ '  <description>' + spot.description + '</description>\n'
									+ '  <infoLink>' + spot.infoLink + '</infoLink>\n'
									+ '  <surfShopLink>' + spot.surfShopLink + '</surfShopLink>\n'
									+ '  <surflineLink>' + spot.surflineLink + '</surflineLink>\n'
									+ '  <mswLink>' + spot.mswLink + '</mswLink>\n'
									+ '  <swellInfoLink>' + spot.swellInfoLink + '</swellInfoLink>\n'
								+ ' </surfSpot>';
						}).join('\n') + '\n</surfSpots>\n';
				
				res.type('application/xml');
				res.send(surfSpotsXml);
			},
			//show all surf spots page
			'text/html': function() {
				res.redirect('/surfspots');
			}
		});


    });

};