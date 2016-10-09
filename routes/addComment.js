var colors = require('colors');
var DB = require('./dbConnection.js');
var Comment = DB.getCommentModel();
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');

module.exports = 
  function addComment(req , res , next){

    var io = req.io;

    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
      if(err) {
        console.log("Error : %s ".red,err);
      }
      else {
        var imagePath = '';
        if(files.photo && files.photo.name){ //handle photo upload
          var photoDir = path.resolve(__dirname, '../public/images/uploads');
          var photo = files.photo;
          var dateString = Date.now();
          var dir = photoDir + '/' + dateString;
          var photoPath = dir + '/' + photo.name; //absolute path to create
          fs.mkdirSync(dir);
          fs.renameSync(photo.path, photoPath); //copy uploaded image to a new location
          imagePath = '/images/uploads/' + dateString + '/' + photo.name; //relative path to find and display image
        }
        
        var comment = new Comment({
          userName: req.session.user.userName,
          timestamp: new Date(),
          text: fields.comment,
          surfSpotId: fields.spotId,
          imagePath: imagePath
        }); 
     
        comment.save(function (err){
          if(err) {
            console.log("Error : %s ".red,err);
          }
          io.sockets.emit('new-comment', { data: 'a comment was added'}); //emit so page refreshes for all clients
          console.log("New comment saved".cyan); 
          res.redirect('back');
        });
      }
    });

  };
