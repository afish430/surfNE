var colors = require('colors');
var DB = require('./dbConnection.js');
var SurfSpot = DB.getSurfSpotModel();

module.exports = function(req, res){

	var id = req.params.id;

	SurfSpot.findById(id, function (err, surfSpot){
      if(err) {
        console.log("Error : %s ".red, err);
      }

      var result =  {
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
  	  };

      res.format({
			//return surf spots as JSON
			'application/json': function() {
				res.json(result);
			},
			//return surf spots as XML
			'application/xml': function() {
				var surfSpotsXml = 
					'<?xml version="1.0"?>\n' +
						' <surfSpot id="' + result.id + '">\n'
								+ '  <location>' + result.location + '</location>\n'
								+ '  <lat>' + result.lat + '</lat>\n'
								+ '  <description>' + result.description + '</description>\n'
								+ '  <infoLink>' + result.infoLink + '</infoLink>\n'
								+ '  <surfShopLink>' + result.surfShopLink + '</surfShopLink>\n'
								+ '  <surflineLink>' + result.surflineLink + '</surflineLink>\n'
								+ '  <mswLink>' + result.mswLink + '</mswLink>\n'
								+ '  <swellInfoLink>' + result.swellInfoLink + '</swellInfoLink>\n'
								+ ' </surfSpot>';
						 + '\n</surfSpots>\n';
				
				res.type('application/xml');
				res.send(surfSpotsXml);
			},
			//show all surf spots page
			'text/html': function() {
				res.redirect('/surfspots/' + result.id);
			}
		});


    });

};