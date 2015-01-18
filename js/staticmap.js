    var renderer = new google.maps.DirectionsRenderer({
        map: map,
        polylineOptions:{
            strokeColor: '#ff0000'
        }
    });

    function updateStaticMap(){
        var st = new GMapToStatic(map);
        // test markers converting
        for (var i = 0; i < list_of_markers.length; i++)
        {
            st.markers.addGoogleMarker(list_of_markers[i]);
            console.log(list_of_markers[i]);
        }
        // render route based on Google Maps 
        st.route.setRenderer(renderer);
        st.event.addListener('onurlprepared', function(url){
            staticMap.src = url;
            console.log("Static Image URL: "+ url);
            encodedImageUrl(url);
        });
        st.prepareUrl();
}
