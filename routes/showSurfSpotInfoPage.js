var DB = require('./dbConnection.js');
var SurfSpot = DB.getSurfSpotModel();
var Comment = DB.getCommentModel();
var moment = require('moment');

module.exports = 
	function editSurfSpot(req , res , next){
    var id = req.params.id;

    SurfSpot.findById(id, function (err, surfSpot){
      if (err) {
        console.log("Error Selecting : %s ", err); 
      } 
      if (!surfSpot) {
        return res.render('404');
      }

      Comment.find({surfSpotId: surfSpot._id}, function (err, comments){
        if (err) {
          console.log("Error Selecting : %s ", err); 
        }

        //convert timestamp in comments to readable strings
        var commentsArray = [];
        if(comments && comments.length > 0) {
              commentsArray = comments.map(function(comment){
              var tstamp = comment.timestamp;
              comment.dateString = moment(tstamp.getTime()).format('MM/DD/YYYY');
              comment.timeString = moment(tstamp.getTime()).format('hh:mm A');
              return comment;
            });
        }

        res.render('surfSpotInfoView',
          {
            title: surfSpot.name, 
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
                    //msw_id: surfSpot.msw_id,
                    hasComments: commentsArray.length > 0,
                    comments: commentsArray
                  }
          });   

      });
        
                   
    });
};