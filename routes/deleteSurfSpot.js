var colors = require('colors');
var DB = require('./dbConnection.js');
var SurfSpot = DB.getSurfSpotModel();

module.exports = 
	function deleteSurfSpot(req , res , next){
    var id = req.params.id;
    
    SurfSpot.findById(id, function (err, surfSpot){
      if(err){
        console.log("Error Selecting : %s ".red, err); 
      }
        
      if (!surfSpot){
        return res.render('404');
      }
          
      surfSpot.remove(function (err) {
        if (err){
          console.log("Error deleting : %s ".red, err );
        }
          
        console.log("SurfSpot %s deleted".magenta, surfSpot.name);  
        res.redirect('/surfspots');
      });        

    });

  };

  