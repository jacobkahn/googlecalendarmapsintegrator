function statusChangeCallback(response) {
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    getEvents();
  } else if (response.status === 'not_authorized') {
    // The person is logged into Facebook, but not your app.
    console.log('Logged into Facebook but not into the app.');
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    console.log('Not logged into Facebook.');
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
FB.init({
  appId      : '523989121076071',
  cookie     : true,  // enable cookies to allow the server to access 
                      // the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.1' // use version 2.1
});

FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});

};

// Load the SDK asynchronously
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function getUserInfo() {
     FB.api('/me', function(response) {});
 }

var sort_by = function(field, reverse, primer) {

var key = primer ?
  function(x) {return primer(x[field])} :
  function(x) {return x[field]};

reverse = [-1, 1][+!!reverse];

return function (a, b) {
  return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
}

}

function primerFunction(string) {
return new Date(string);
}

function getEvents()
{
  var fb_events = [];
  var event_num = 0;
  //console.log('Welcome!  Fetching your information.... ');
  FB.api(
      "/me/events",
      function (response) {
        event_num = response.data.length;
        for (var i = 0; i < event_num; i++)
        {
            fb_events[i] = [];  
            fb_events[i].push(i);
            fb_events[i].push(response.data[i].name);
            fb_events[i].push(response.data[i].location);
            fb_events[i].push(response.data[i].start_time);
            fb_events[i].push(response.data[i].end_time); 
            fb_events[i].push(response.data[i].id);    
        }
		var count = 1;
        //sort the events by starting time
        fb_events.sort(sort_by(3, true, primerFunction));
        var date_now = new Date(2015, 1, 16, 1,1,1,1);
        var date_now_date = String(date_now.getDate());
        var date_now_month = String(date_now.getMonth());
        if (date_now_month.length ===1) {
          date_now_month = "0" + date_now_month;
        }
        if (date_now_date.length === 1) {
          date_now_date = "0" + date_now_date;
        }
        var date_now_year = String(date_now.getYear()+1900);
        var today_fb_events = [];
        //console.log(event_num);
        for (var i = 0; i < event_num; i++)
        {
          myDate = fb_events[i][3].substring(0,10);
          myDate = myDate.split("-");
          var eventYear = myDate[0];
          var eventMonth = myDate[1];
          var eventDate = myDate[2];
          if ((eventYear === date_now_year)
            && (eventMonth === date_now_month)
             && (eventDate === date_now_date))
          {
              // console.log(response.data[i].start_time);
              var start_datetime = new Date(response.data[i].start_time);
              var end_datetime = new Date(response.data[i].end_time);
              var start_minute = String(start_datetime.getMinutes());
              var start_hour = String(start_datetime.getHours());
              if (start_hour.length ===1) {
                  start_hour = "0" + start_hour;
                }
              if (start_minute.length ===1) {
                  start_minute = "0" + start_minute;
                }
              var mystarttime = String(start_hour)+':'+String(start_minute);
              var end_minute = String(end_datetime.getMinutes());
              var end_hour = String(end_datetime.getHours());
              if (end_hour.length ===1) {
                  end_hour = "0" + end_hour;
                }
              if (end_minute.length ===1) {
                  end_minute = "0" + end_minute;
                }
              var myendtime = String(end_hour)+':'+String(end_minute);
                //return today's events
              fb_events[i][3] = mystarttime;
              fb_events[i][4] = myendtime;              
			  fb_events[i][0] = count;
			  count += 1;
              today_fb_events.push(fb_events[i]);
          }
        }
        console.log(today_fb_events); 
		updatePageWithCalendarData(today_fb_events);
      }               
  );
  /*
  if ($("#choosedate").datepicker("getDate") == null) {
    console.log("No custom specified date. Using default.");
    var date_now = new Date();
  }
  else {
      var date_now = $("#choosedate").datepicker("getDate");
      console.log("Using custom date: " + date_now);
  }*/

}
