$(function(){

	//create map
	var surfMap = L.map('allSurfSpotsMap').setView([42.3601, -71.0589], 7);

	//add basemap
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    maxZoom: 18,
	    id: 'mapbox.streets',
	    accessToken: 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpandmbXliNDBjZWd2M2x6bDk3c2ZtOTkifQ._QA7i5Mpkd_m30IGElHziw'
	}).addTo(surfMap);

	//define icon
	var surferIcon = L.icon({
	    iconUrl: '/images/Surfer-icon.png',
	    iconSize:     [40, 40],
	    iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
	});

	//get surf spots from API
	$.get('/api/surfSpots', function(data){
			//add icons to map
			data.forEach(function(surfSpot){
				 var marker = L.marker([surfSpot.lat, surfSpot.lon], {icon: surferIcon}).addTo(surfMap);
				 $(marker).on('click', function(){
				 	window.location.href = '/surfSpots/info/' + surfSpot.id;
				 });
				 marker.bindPopup('<h5 style="text-align: center;">' +surfSpot.name + '</h5><h6 style="text-align: center;">(' + surfSpot.location + ')</h6>');
		         marker.on('mouseover', function (e) {
		            this.openPopup();
		         });
		         marker.on('mouseout', function (e) {
		            this.closePopup();
		         });
			});
		}, 
		'json'
	);

});
