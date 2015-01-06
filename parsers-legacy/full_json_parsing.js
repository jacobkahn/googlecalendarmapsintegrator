/** 
	MAIN JSON TOKEN PARSER 
	Rewritten and tested by Devesh - it's good to go.
	Output: Name, StartTime, EndTime, Location
*/

function parse_full_JSON_object(events)
{
	var parsed_event_dict_list = [];
	var date_now = new Date();
	var current_month = date_now.getMonth() + 1;
	if (current_month < 10)
	{
		current_month = "0" + current_month;
	}
	var current_day = date_now.getDate();
	if (current_day < 10){
		current_day = "0" + current_day;
	}
	var current_year = date_now.getFullYear();
	var current_date = current_year + "-" + current_month + "-" + current_day;
	console.log("Today's date: " + current_date);
	for (i = 0; i < events.items.length; i++) 
	{   
		if (events["items"][i]["kind"] == "calendar#event")
		{
			if (events["items"][i]["start"]["dateTime"].substring(0,10) == current_date)
			{
				console.log("Event #"+i+" in this calendar is today. Extracting event data...");
				var event_name = events["items"][i]["summary"];
				var event_location = events["items"][i]["location"];
				var start_time_pre_parse = events["items"][i]["start"]["dateTime"];
				var end_time_pre_parse = events["items"][i]["end"]["dateTime"];
				var start_time = start_time_pre_parse.substring(12,19);
				var end_time = end_time_pre_parse.substring(12,19);
				var event_details = {};
				event_details["Name"] = event_name;
				event_details["start"] = start_time;
				event_details["end"] = end_time;
				event_details["location"] = event_location;
				parsed_event_dict_list.push(event_details);
			}	
		}	
	}
	return parsed_event_dict_list;
}