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


	//Use World Weather API to get current conditions:

	var _PremiumApiBaseURL = 'http://api.worldweatheronline.com/premium/v1/';
	var _PremiumApiKey = '928d355a86a04cc79fa212732161410';

	function JSONP_MarineWeather(input) {
	    var url = _PremiumApiBaseURL + "marine.ashx?q=" + input.query + "&format=" + input.format + "&fx=" + input.fx + "&key=" + _PremiumApiKey;
	    jsonP(url, input.callback);
	}

	// Helper Method
	function jsonP(url, callback) {
	    $.ajax({
	        type: 'GET',
	        url: url,
	        async: false,
	        contentType: "application/json",
	        jsonpCallback: callback,
	        dataType: 'jsonp',
	        success: function (json) {
	            //console.dir('success');
	        },
	        error: function (e) {
	            console.log(e.message);
	        }
	    });
	}

    function GetMarineWeather(e) {

        var marineWeatherInput = {
            query: spotLatitude + ',' + spotLongitude,
            format: 'JSON',
            fx: '',
            callback: 'MarineWeatherCallback'
        };

        JSONP_MarineWeather(marineWeatherInput);
    }

    window.MarineWeatherCallback = function(marineWeather) {
    	console.log(marineWeather);       
        var timeLookup = {
        	'0' : '12 AM',
        	'300' : '3 AM',
        	'600' : '6 AM',
        	'900' : '9 AM',
        	'1200' : '12 PM',
        	'1500' : '3 PM',
        	'1800' : '6 PM',
        	'2100' : '9 PM'
        };

		marineWeather.data.weather[0].hourly.forEach(function(weatherHour){
			$('#conditionsTable').append(
				'<tr>' +
					'<td>' + timeLookup[weatherHour.time] + '</td>' +
					'<td>' + weatherHour.swellHeight_ft + 'ft</td>' +
					'<td>' + weatherHour.swellPeriod_secs + 's</td>' +
					'<td>' + weatherHour.waterTemp_F + '&deg;F</td>' +
					'<td>' + weatherHour.windspeedMiles + 'mph</td>' +
					'<td>' + weatherHour.winddir16Point + '</td>' +
				'</tr>'
			 );
		});


    }

    GetMarineWeather();


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