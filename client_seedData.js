var mongoose = require('mongoose');
var colors = require('colors');

//create database connection
var dbUrl = 'mongodb://127.0.0.1:27017/surfnewengland';
var connection = mongoose.createConnection(dbUrl);

//set up models
var DB = require('./surfDb.js');
var SurfSpot = DB.getSurfSpotModel(connection);
var User = DB.getUserModel(connection);

connection.on("open", function(){
	
	// create and save surf spots as document objects
	var surfSpot;

	surfSpot = new SurfSpot({
		name: 'York Beach',
		town: 'York',
		state: 'ME',
		latitude: 43.162851, 
		longitude: -70.616941,
		description: 'York beach is a long WSW facing beach break good for longboarders and beginers with ample room to spread out. The north end is somewhat protected from N to NE winds by Cape Neddick.',
		infoLink: 'http://www.yorkbeachme.com/York_Beach_Maine/Welcome.html',
		surfShopLink: 'http://www.liquiddreamssurf.com/',
		surflineLink: 'http://www.surfline.com/surf-report/york-beach-new-england_5106/',
		mswLink: 'http://magicseaweed.com/Long-Sands-Surf-Report/367/',
		swellInfoLink: '',
		msw_id: 367
	}); 
	surfSpot.save();

	surfSpot = new SurfSpot({
		name: 'The Wall',
		town: 'Hampton',
		state: 'NH',
		latitude: 42.939326,
		longitude: -70.794135,
		description: 'The North Beach is famous for surfing, and is one of the better areas that has constant swells.  The North Beach is also famous for "The Wall".  A cement wall that extends over two miles and has a great boardwalk for running, bicycling and taking a nice leisurely stroll.',
		infoLink: 'http://www.itsabeach.com/',
		surfShopLink: 'https://cinnamonrainbows.com/',
		surflineLink: 'http://www.surfline.com/surf-report/the-wall-new-england_5130/',
		mswLink: 'http://magicseaweed.com/The-Wall-Surf-Report/369/',
		swellInfoLink: 'http://www.swellinfo.com/surf-forecast/hampton-new-hampshire',
		msw_id: 369
	}); 
	surfSpot.save();

	surfSpot = new SurfSpot({
		name: 'Nauset Beach',
		town: 'Orleans',
		state: 'MA',
		latitude: 41.8417747,
		longitude: -69.9452957,
		description: 'Nauset Beach, not to be confused with Nauset Light Beach of the National Seashore, is a lengthy 10-mile expanse starting in Orleans stretching all the way to Chatham. Surfing is permitted in the non- protected beach areas from 9 a.m. to 6 p.m. It is also popular with swimmers and boogie boarders. The beach is also available for off-road vehicles with the proper permit.',
		infoLink: 'http://capecodonline.com/beaches/orleans/nauset-beach/',
		surfShopLink: 'http://pumphousesurf.com/',
		surflineLink: 'http://www.surfline.com/surf-report/nauset-beach-new-england_108230/',
		mswLink: 'http://magicseaweed.com/Cape-Cod-Surf-Report/373/',
		swellInfoLink: 'http://www.swellinfo.com/surfreport/nauset-beach-cam',
		msw_id: 373
	}); 
	surfSpot.save();

	surfSpot = new SurfSpot({
		name: 'Easton\'s Beach',
		town: 'Newport',
		state: 'RI',
		latitude: 41.4876026,
		longitude: -71.2911609,
		description: 'One of the best Rhode Island beaches, Easton\'s Beach (called 1st Beach by the locals) is located on Memorial Boulevard, right at the beginning of the world famous Newport Cliff Walk. It is situated right on the border with neighboring Middletown, Rhode Island.',
		infoLink: 'http://www.cityofnewport.com/departments/easton-s-beach',
		surfShopLink: 'http://www.islandsurfandsport.com/',
		surflineLink: 'http://www.surfline.com/surf-report/first-beach-new-england_5111/',
		mswLink: 'http://magicseaweed.com/1st-Beach-Eastons-Beach-Surf-Report/907/',
		swellInfoLink: 'http://www.swellinfo.com/surf-forecast/newport-rhode-island',
		msw_id: 907
	}); 
	surfSpot.save(function(err) {
		connection.close();
		if (err) throw err;
		console.log("Success! Surf spot data has been seeded.".green);
	});

	// create and save users as document objects
	var user;

	user = new User({
		userName: 'BigKahuna',
		password: 'tubular',
		isAdmin: true
	}); 
	user.save();

	user = new User({
		userName: 'Bodie99',
		password: 'gnarly',
		isAdmin: false
	}); 
	user.save(function(err) {
		connection.close();
		if (err) throw err;
		console.log("Success! User data has been seeded.".green);
	});
	
});










