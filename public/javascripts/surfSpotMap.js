$(function(){

	var spotMap = L.map('surfSpotMap').setView([spotLatitude, spotLongitude], 15);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    maxZoom: 18,
	    id: 'mapbox.streets-satellite',
	    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw'
	}).addTo(spotMap);

	var surferIcon = L.icon({
	    iconUrl: '/images/Surfer-icon.png',
	    iconSize:     [60, 60],
	    iconAnchor:   [30, 30], // point of the icon which will correspond to marker's location
	});

	L.marker([spotLatitude, spotLongitude], {icon: surferIcon}).addTo(spotMap);

	//show new comments as they come in
	var socket = io.connect('http://localhost:3000');
	socket.on('new-comment', function (msg) { //reload the page to show new comments as they arrive
		var partialComment = $('.comments-container textarea').val();
	 	if(!partialComment){ //we don't want to interrupt a user if they are typing a comment
	 		location.reload(); 
	 	}
	});


	//get surf info from Magic Seaweed API: (Need API key)
	// $.get('http://magicseaweed.com/api/mdkey/forecast/?spot_id=' + msw_id, function(data){
	// 		console.log(data);
	// 		data.forEach(function(period){
	// 		 	console.log(period);
	// 		});
	// 	}, 
	// 	'json'
	// );

});