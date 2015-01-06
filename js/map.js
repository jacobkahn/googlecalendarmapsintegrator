        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        var map;
        var geocoder;
        var jacob_address="University of Pennsylvania Philadelphia PA United States" 
        var start_point = new google.maps.LatLng(40,75);
        //my_rank: ABCDEF, the order of the events
        //my_address: A string
        function placeMarker(singleEvent)
        {
          //eventList is an arrayList with order, name, location, starting and                       //ending time
          my_address = singleEvent[2];
          my_rank = String.fromCharCode(singleEvent[0] + 64);
          //document.write(my_rank == 'A');
          if (my_rank != undefined)
          {
          //document.write();
          //document.write(my_rank);
              geocoder.geocode
              ( 
              { 'address': my_address }, 
                function(results, status){
                    if (status == google.maps.GeocoderStatus.OK) 
                    {
                      map.setCenter(results[0].geometry.location);
                      var marker = new google.maps.Marker
                      ({
                          map: map,
                          position: results[0].geometry.location,
                          icon: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld='+my_rank+'|FF0000|000000'
                      });
                      var infowindow = new google.maps.InfoWindow({ maxWidth: 320 }); 
                      /*var info = "<h1 id = 'eventName'></h1>"+
                              "<p id = 'eventTime'></p>"+
                              "<p id = 'eventLocation'></p>"+
                          "</div>";*/
                        var info = singleEvent[1] + '\n';
                        info += 'from '+singleEvent[3]+' to '+singleEvent[4];
                        info += ' at '+ singleEvent[2];
                      //var info = "hello";
                      //document.write(info);
                     /* var div=document.getElementById('eventName');
                      div.innerHTML=singleEvent[1];
                      div=document.getElementById('eventTime');
                      div.innerHTML=singleEvent[3]+' to '+singleEvent[4];*/
                      if(!infowindow){
                        infowindow = new google.maps.InfoWindow({
                            content: info
                        });
                      }else{
                        infowindow.setContent(info);
                      }
                      google.maps.event.addListener(marker, 'click', function() {
                            infowindow.open(map, marker); 
                      });
                      return marker;
                    } 
                    else 
                    {
                     // alert('Geocode was not successful for the following reason: ' +                         status);
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
        
       /* function calcRoute(my_list_of_list) {
          for (var i=0;i<my_list_of_list_length-1;i++)
          {
              var head_lng = placeMarker(my_list_of_list[i][1]).getPoint().lng();
              var head_lat = placeMarker(my_list_of_list[i][1]).getPoint().lat();
              var tail_lng = placeMarker(my_list_of_list[i+1][1]).getPoint().lng();
              var tail_lat = placeMarker(my_list_of_list[i+1][1]).getPoint().lat();
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
        }*/
        function initialize() 
        {
          var list_of_list = new Array(5);
          var marker_list = new Array(5);
          directionsDisplay = new google.maps.DirectionsRenderer();
          var mapOptions = 
          {
            zoom: 14,
            center: start_point
          }
          map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
          directionsDisplay.setMap(map);
          geocoder = new google.maps.Geocoder();
          for (var i = 0; i < 5; i++) {
            list_of_list[i] = new Array(5);
          }
          list_of_list[0][0]=1;
          list_of_list[0][1]="Visit friends at kC";
          list_of_list[0][2]="912 Burning Tree Kansas City MO";
          list_of_list[0][3]="07:30";
          list_of_list[0][4]="08:30";
          list_of_list[1][0]=2;
          list_of_list[1][1]="Back to Philly";
          list_of_list[1][2]="University of Philadelphia PA";;
          list_of_list[1][3]="10:10";
          list_of_list[1][4]="13:20";
          list_of_list[2][0]=3;
          list_of_list[2][1]="Travel in Philly";
          list_of_list[2][2]="Liberty Bell Philadelphia";
          list_of_list[2][3]="15:30";
          list_of_list[2][4]="19:00";
            
          for (var i=0; i<list_of_list.length; i++)
          {
            marker_list[i] = placeMarker(list_of_list[i]);
          }
        }
       google.maps.event.addDomListener(window, 'load', initialize);