// Initial API call and client initialization (still needs a bit of repair) is currently in index.html

function getLiveCalendarIDs(response) {}
	var calendar_ids = [];
	for (var i = 0; i < response['data'].length; i++) {
		// Have to blacklist calendars by name because holiday/calendar IDs aren't consistent accross accounts
		if (response['data'][i]['name'] !== "US Holidays" && response['data'][i]['name'] !== "Birthday calendar") {
			calendar_ids.push(response['data'][i]['id']);
		}
	}
	return calendar_ids;
}

function onReadCalendar(calendar_ids) {
    var liveEvents = [];
    WL.login({
        scope: "wl.calendars_update"
    }).then(
    	for (var i = 0; i < response['data'].length; i++) {
	        function (response) {
	            WL.api({
	                path: calendar_ids[i] + "/events",
	                method: "GET"
	            }).then(
	                function (response) {
	                	for (var j = 0; j < response['data'].length; i++) {
	                		liveEvents.push(response['data'][j]);
	                	}
	                },
	                function (responseFailed) {
	                    console.log("Error calling API: " + responseFailed.error.message);
	                }
	            );
	        },
	        function (responseFailed) {
	            console.log("Error signing in: " + responseFailed.error_description);
	        }
	    }
    );
    return liveEvents;
}

function parseTodayLiveEvents(liveEvents) {
	var parsed_event_list = [], date_now = new Date(), current_month = date_now.getMonth() + 1;
	if (current_month < 10) {
		current_month = "0" + current_month;
	}
	var current_day = date_now.getDate();
	if (current_day < 10) {
		current_day = "0" + current_day;
	}
	var current_year = date_now.getFullYear();
	var current_date = current_year + "-" + current_month + "-" + current_day;
	console.log("Today's date: " + current_date);
	for (var i = 0; i < liveEvents.length; i++) {
		var event_start_date = liveEvents[i]["start_time"].substring(0, 10);
		var event_number = i + 1;
		if ((event_start_date === current_date) && (!liveEvents[i]["is_all_day_event"]) {
			console.log("Event #" + event_number + " in this calendar is today. Extracting event data...");
			var event_details = {};
			event_details["name"] = liveEvents[i]["name"];
			//check substring based on API consistency?
			event_details["start"] = liveEvents[i]["start_time"].substring(11, 19);
			event_details["end"] = liveEvents[i]["end_time"].substring(11, 19);
			event_details["location"] = liveEvents[i]["location"];
			parsed_event_list.push(event_details);
		}
	}
}