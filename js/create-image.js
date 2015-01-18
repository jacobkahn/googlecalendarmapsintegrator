    function createimage(locs,t_zoom)
    {
        var counter = 1;
        var url = "http://maps.google.com/maps/api/staticmap?center="+String((locs[0].lat()))+","+String((locs[0].lng()))+"&zoom="+t_zoom+"&size=600x400&maptype=roadmap";
        var i = 0;
        while (i < locs.length)
        {
            var my_rank = String.fromCharCode(counter + 64);
            url = url + "&markers=color:green%7Clabel:"+my_rank+"%7C";
            url = url + (locs[i].lat())+","+(locs[i].lng());
            i++;
            counter ++;
        }
        encodedImageUrl(url);
    }

    function convertImgToBase64URL(url, callback, outputFormat){
        var canvas = document.createElement('CANVAS'),
            ctx = canvas.getContext('2d'),
            img = new Image;
        img.crossOrigin = 'Anonymous';
        img.onload = function(){
            var dataURL;
            canvas.height = img.height;
            canvas.width = img.width;
            ctx.drawImage(img, 0, 0);
            dataURL = canvas.toDataURL(outputFormat);
            callback.call(this, dataURL);
            canvas = null; 
        };
        img.src = url;
    }


    function hereComeTheMarkers(markerList, zoomLevel) {
        var locationList = [];
        for (var i = 0; i < markerList.length; i++)
        {
            locationList.push(markerList[i].getPosition());
        }
        convertImgToBase64URL(createimage(locationList, 5), function(base64Img){
        	console.log(base64Img);
        });
    }


    /*var test = [];
    test.push(new google.maps.LatLng(39.952338, 23));
    test.push(new google.maps.LatLng(39.952338, 20));
    test.push(new google.maps.LatLng(39.952338, 19));
    //console.log(createimage(test,6));
    convertImgToBase64URL(createimage(test,2), function(base64Img){
        console.log(base64Img);*/
    //});