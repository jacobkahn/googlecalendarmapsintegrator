var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var geocoder;
var coordsList = [];

function placeMarker(singleEvent) {
  var my_address = singleEvent[2];
  var my_rank = String.fromCharCode(singleEvent[0] + 64);
	console.log()
  if (my_rank != undefined) {
	  geocoder.geocode ( 
	  { 'address': my_address }, 
		function(results, status){
			if (status == google.maps.GeocoderStatus.OK) {
				storeCoords(results[0].geometry.location.lat(),results[0].geometry.location.lng());
				map.setCenter(results[0].geometry.location);
			    var marker = new google.maps.Marker ({
					map: map,
					position: results[0].geometry.location,
					icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld='+my_rank+'|FF0000|000000'
				});
				var infowindow = new google.maps.InfoWindow({ maxWidth: 320 }); 
			    var info = singleEvent[1] + '\n';
				info += 'from '+singleEvent[3]+' to '+singleEvent[4];
				info += ' at '+ singleEvent[2];
			    if(!infowindow){
					infowindow = new google.maps.InfoWindow({content: info});
			    }else{
					infowindow.setContent(info);
			    }
			  	google.maps.event.addListener(marker, 'click', function() {
					infowindow.open(map, marker); 
			  		});
				} 
				else 
				{
					console.log('Geocode was not successful for the following reason: ' + status);
				}
		  }
	  );
  }
	console.log(coordsList);
}
function storeCoords(lat, lng) {
	var coords = [lat, lng];
	coordsList.push(coords);
}

function makeInfoWindowEvent(map, infowindow, marker) {
  google.maps.event.addListener(marker, 'click', function() {
	infowindow.open(map, marker);
  });
}

function calcRoute(coords) {
  for (var i=0; i<coords.length-1; i++)
  {
	  var head_lat = coords[i][0];
	  var head_lng = coords[i][1];
	  var tail_lat = coords[i+1][0];
	  var tail_lng = coords[i+1][1];
	  var start_point = new google.maps.LatLng(head_lat,head_lng);
	  var end_point= new google.maps.LatLng(tail_lat,tail_lng);
	  var selectedMode = document.getElementById('mode').value;
	  var request = {
		  origin: start_point,
		  destination: end_point,
		  travelMode: google.maps.TravelMode[selectedMode]
	  };
	  directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
		  directionsDisplay.setDirections(response);
		}
	  });
  }
}

function buildMap(input) 
{
	console.log("Building map...");
	var list_of_list = input;
	var marker_list = new Array(list_of_list.length);
	directionsDisplay = new google.maps.DirectionsRenderer();
	var mapOptions = 
	{
		zoom: 2,
		center: new google.maps.LatLng(39.952338, -75.193139)
	}
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	google.maps.event.trigger(map, 'resize');
	directionsDisplay.setMap(map);
	geocoder = new google.maps.Geocoder();
	console.log("Geocoder powering up...");
	for (var i=0; i<list_of_list.length; i++) {
		marker_list.push(placeMarker(list_of_list[i]));
	}
}
