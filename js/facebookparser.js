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
  console.log('Welcome!  Fetching your information.... ');
  FB.api(
      "/me/events",
      function (response) {
        if ($("#choosedate").datepicker("getDate") == null) {
        console.log("No custom specified date. Using default.");
        var date_now = new Date();
        }
        else {
            var date_now = $("#choosedate").datepicker("getDate");
        console.log("Using custom date: " + date_now);
        }
        var current_month = date_now.getMonth() + 1;
        if (current_month < 10) {
          current_month = "0" + current_month;
        }
        var current_day = date_now.getDate();
        if (current_day < 10) {
          current_day = "0" + current_day;
        }
        var current_year = date_now.getFullYear();
        var current_date = current_year + "-" + current_month + "-" + current_day;
        //vent_num = response.data.length;
        console.log(response.data);
        console.log(response["data"][1]["location"]);
        //var object_list = response.data;
        var facebook_object_list = [];
        var facebook_event_object = {};
        // console.log(current_date);
        // console.log(response["data"][1]["start_time"].substring(0, 10));
        for (var i = 0; i < response.data.length; i++) {
          var event_start_date = response["data"][i]["start_time"].substring(0, 10);
          if (String(event_start_date) === current_date) {
          //console.log(response["data"][i]["end_time"]);
            if ((response["data"][i]["end_time"] !== undefined)) {
              var facebook_event_object = {};
              // var facebook_event_object = {"summary" : "", "location" : "", "kind" : "", "id" : "", "start" : {"datetime" : ""}, "end" : {"datetime" : ""}};
              facebook_event_object["name"] = response["data"][i]["name"];
              facebook_event_object["location"] = response["data"][i]["location"];
              facebook_event_object["end"] = response["data"][i]["end_time"].substring(11,16);
              facebook_event_object["start"] = response["data"][i]["start_time"].substring(11,16);
              facebook_event_object["id"] = response["data"][i]["id"];

              // facebook_event_object["summary"] = response.data[i].name;
              // facebook_event_object["location"] = object_list[i]["location"];
              // facebook_event_object["kind"] = "calendar#event";
              // facebook_event_object["id"] = object_list[i]["id"];
              // facebook_event_object["start"]["dateTime"] = object_list[i]["start_time"]
              // facebook_event_object["end"]["dateTime"] = object_list[i]["end_time"]
              facebook_object_list.push(facebook_event_object);
            }
          }
        // var facebook_calendar_hashlist = Object.keys(object_list);
        // var facebook_aggregate_event_list = [];
        // for (var i = 0; i < facebook_calendar_hashlist.length; i++) {
        //   var temp_hash = facebook_calendar_hashlist[i];
        //   var temp_event_list =
        }
        var rankedFacebookData = [];
        var rankedFacebookData = full_json_event_ranker(facebook_object_list);
        console.log("Assigning orders...");
        var eventDetailsListFB = [];
        var eventDetailsListFB = dictionary_deparser(rankedFacebookData);
        console.log("Done!");
        console.log("WHAT WE WANT:");
        console.log(eventDetailsListFB);
        updatePageWithCalendarData(eventDetailsListFB);
        console.log("Final output:");
        console.log(eventDetailsListFB);
      })}
//         // object  = {
//         //   items => { summary => 
//         //     location => 
//         //     kind => "calendar#event"
//         //     id => facebook event id
//         //     start => datetime =>
//         //     end => datetime =>
//         //   }
//         // }
//         for (var i = 0; i < event_num; i++)
//         {
//             fb_events[i] = [];  
//             fb_events[i].push(i);
//             fb_events[i].push(response.data[i].name);
//             fb_events[i].push(response.data[i].location);
//             fb_events[i].push(response.data[i].start_time);
//             fb_events[i].push(response.data[i].end_time); 
//             fb_events[i].push(response.data[i].id);    
//         }
// 		var count = 1;
//         //sort the events by starting time
//         fb_events.sort(sort_by(3, false, primerFunction));
//         var date_now = new Date(2015, 1, 16, 1,1,1,1);
//         var date_now_date = String(date_now.getDate());
//         var date_now_month = String(date_now.getMonth());
//         if (date_now_month.length ===1) {
//           date_now_month = "0" + date_now_month;
//         }
//         if (date_now_date.length === 1) {
//           date_now_date = "0" + date_now_date;
//         }
//         var date_now_year = String(date_now.getYear()+1900);
//         var today_fb_events = [];
//         //console.log(event_num);
//         for (var i = 0; i < event_num; i++)
//         {
//           myDate = fb_events[i][3].substring(0,10);
//           myDate = myDate.split("-");
//           var eventYear = myDate[0];
//           var eventMonth = myDate[1];
//           var eventDate = myDate[2];
//           if ((eventYear === date_now_year)
//             && (eventMonth === date_now_month)
//              && (eventDate === date_now_date))
//           {
//               // console.log(response.data[i].start_time);
//               var start_datetime = new Date(response.data[i].start_time);
//               var end_datetime = new Date(response.data[i].end_time);
//               var start_minute = String(start_datetime.getMinutes());
//               var start_hour = String(start_datetime.getHours());
//               if (start_hour.length ===1) {
//                   start_hour = "0" + start_hour;
//                 }
//               if (start_minute.length ===1) {
//                   start_minute = "0" + start_minute;
//                 }
//               var mystarttime = String(start_hour)+':'+String(start_minute);
//               var end_minute = String(end_datetime.getMinutes());
//               var end_hour = String(end_datetime.getHours());
//               if (end_hour.length ===1) {
//                   end_hour = "0" + end_hour;
//                 }
//               if (end_minute.length ===1) {
//                   end_minute = "0" + end_minute;
//                 }
//               var myendtime = String(end_hour)+':'+String(end_minute);
//                 //return today's events
//               fb_events[i][3] = mystarttime;
//               fb_events[i][4] = myendtime;              
// 			  fb_events[i][0] = count;
// 			  count += 1;
//               today_fb_events.push(fb_events[i]);
//           }
//         }
//         console.log(today_fb_events); 
// 		updatePageWithCalendarData(today_fb_events);
//       }               
//   );
//   /*
//   if ($("#choosedate").datepicker("getDate") == null) {
//     console.log("No custom specified date. Using default.");
//     var date_now = new Date();
//   }
//   else {
//       var date_now = $("#choosedate").datepicker("getDate");
//       console.log("Using custom date: " + date_now);
//   }*/

// }