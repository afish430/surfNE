var colors = require('colors');
var DB = require('./dbConnection.js');
var SurfSpot = DB.getSurfSpotModel();

module.exports = 
  function saveUpdatedSurfSpot(req , res , next){
    var id = req.params.id;

    SurfSpot.findById(id, function (err, surfSpot){

      if(err){
        console.log("Error Selecting : %s ".red, err); 
      }
        
      if (!surfSpot){
        return res.render('404');
      }  
      
      surfSpot.name = req.body.name;
      surfSpot.town = req.body.town;
      surfSpot.state = req.body.state;
      surfSpot.latitude = req.body.latitude;
      surfSpot.longitude = req.body.longitude;
      surfSpot.description = req.body.description;
      surfSpot.infoLink = req.body.infoLink;
      surfSpot.surfShopLink = req.body.surfShopLink;
      surfSpot.surflineLink = req.body.surflineLink;
      surfSpot.mswLink = req.body.mswLink;
      surfSpot.swellInfoLink = req.body.swellInfoLink;
      surfSpot.msw_id = req.body.msw_id;
        
      surfSpot.save(function (err) {
          if (err){
            console.log("Error updating : %s ".red, err );
            res.render('addSurfSpotView',
            {
              title:"Edit Surf Spot", 
              data: {
                      errorMessage: "An error occurred and your surf spot could not be saved",
                      id: surfSpot._id,
                      name: surfSpot.name,
                      town: surfSpot.town,
                      state: surfSpot.state,
                      latitude: surfSpot.latitude,
                      longitude: surfSpot.longitude,
                      description: surfSpot.description,
                      infoLink: surfSpot.infoLink,
                      surfShopLink: surfSpot.surfShopLink,
                      surflineLink: surfSpot.surflineLink,
                      mswLink: surfSpot.mswLink,
                      swellInfoLink: surfSpot.swellInfoLink,
                      msw_id: surfSpot.msw_id
                    }
            }); 
          }
            
          console.log("Updated surf spot %s saved".cyan, surfSpot.name);
          res.redirect('/surfspots');
        });

    });
  };
