var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
var geocoder;
var list_of_markers = new Array();

function placeMarker(singleEvent, callback) {
  var my_address = singleEvent[2];
  var my_rank = String.fromCharCode(singleEvent[0] + 64);
  if (my_rank != undefined) {
	  geocoder.geocode ( 
	  { 'address': my_address }, 
		function( results, status){
			if (status == google.maps.GeocoderStatus.OK) {
				map.setCenter(results[0].geometry.location);
			    var marker = new google.maps.Marker ({
					map: map,
					position: results[0].geometry.location,
					icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld='+my_rank+'|00CC00|000000'
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
				callback(marker);
				} 
				else 
				{
					console.log('Geocode was not successful for the following reason: ' + status);
				}
		  }
	  );
  }
}

function makeInfoWindowEvent(map, infowindow, marker) {
  google.maps.event.addListener(marker, 'click', function() {
	infowindow.open(map, marker);
  });
}

function calcRoute(inputmarkers) {
  console.log("Calculating "+inputmarkers.length+" routes...");
  wpts = [];
  for (var i=1; i<inputmarkers.length-2; i++)
  {
  	  wpts.push({location: inputmarkers[i].getPosition(), stopover:true})
  }
  var start = inputmarkers[0].getPosition();
  var end = inputmarkers[inputmarkers.length - 1].getPosition();
  var request = {
	  origin: start,
	  destination: end,
	  waypoints: wpts,
	  optimizeWaypoints: true,
	  travelMode: google.maps.TravelMode.DRIVING
  };
  directionsService.route(request, function(response, status) {
	if (status == google.maps.DirectionsStatus.OK) {
	  console.log("Directions engine OK!");
	  directionsDisplay.setDirections(response);
	}
	else {
		console.log("Impossible route. Skipping...");
	}
  });
}

function createMarkerList(m, size) {
	list_of_markers.push(m);
	if(list_of_markers[size-1] != undefined) {
		console.log('Async load complete.');
		calcRoute(list_of_markers);
	}
}

function buildMap(input) 
{
	console.log("Building map...");
	var list_of_list = input;
	var marker_list = new Array();
	directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
	var mapOptions = 
	{
		zoom: 2,
		center: new google.maps.LatLng(39.952338, -75.193139)
	}
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	google.maps.event.trigger(map, 'resize');
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById('directions-panel'));
	geocoder = new google.maps.Geocoder();
	console.log("Geocoder powering up...");
	for (var i=0; i<list_of_list.length; i++) {
		placeMarker(list_of_list[i], function(marker) { 
			createMarkerList(marker, list_of_list.length);
		});
	}
}
