var DB = require('./dbConnection.js');
var SurfSpot = DB.getSurfSpotModel();

module.exports = 
	function editSurfSpot(req , res , next){
    var id = req.params.id;

    SurfSpot.findById(id, function (err, surfSpot){
      if (err) {
        console.log("Error Selecting : %s ", err); 
      }
        
      if (!surfSpot || !req.session.user || !req.session.user.isAdmin) {
        return res.render('404');
      }
        
      res.render('editSurfSpotView',
          {
            title:"Edit Surf Spot", 
            data: {
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
    });
};

