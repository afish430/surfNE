var colors = require('colors');
var DB = require('./dbConnection.js');
var SurfSpot = DB.getSurfSpotModel();

module.exports = 
  function saveNewSurfSpot(req , res , next){

    var surfSpot = new SurfSpot({
        name: req.body.name,
        town: req.body.town,
        state: req.body.state,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        description: req.body.description,
        infoLink: req.body.infoLink,
        surfShopLink: req.body.surfShopLink,
        surflineLink: req.body.surflineLink,
        mswLink: req.body.mswLink,
        swellInfoLink: req.body.swellInfoLink,
        msw_id: req.body.msw_id
      }); 
 
    surfSpot.save(function (err){
      if(err) {
        console.log("Error : %s ".red,err);
        res.render('addSurfSpotView',
          {
            title:"Add a New Surf Spot", 
            data: {
                    errorMessage: "An error occurred and your surf spot could not be saved"
                  }
          }); 
      }
        
      console.log("New surf spot %s saved".cyan, surfSpot.name); 
      res.redirect('/surfspots');
    });

  };
