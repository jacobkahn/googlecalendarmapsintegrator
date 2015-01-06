/** MAIN JSON TOKEN PARSER */
function parse_full_JSON_object(events)
{
	var parsed_event_dict = [];
	var date_now = new Date();
	var current_month_false = date_now.getMonth();
	var current_month_false = current_month_false + 1;
	if (current_month_false < 10)
	{
		current_month = "0" + current_month_false;
	} else {
		current_month = current_month_false;
	}
	var current_day = date_now.getDate();
	var current_year = date_now.getFullYear();
	var current_date = current_year + "-" + current_month + "-" + current_day;

	for (i = 0; i < events.items.length; i++) 
	{   
		if (events["items"][i]["kind"] == "calendar#event")
		{
			if (events["items"][i]["start"]["dateTime"].substring(0,10) == current_date)
			{
				var event_name = events["items"][i]["summary"];
				var start_time_pre_parse = events["items"][i]["start"]["dateTime"];
				var end_time_pre_parse = events["items"][i]["end"]["dateTime"];
				var start_time = start_time_pre_parse.substring(12,20);
				var end_time = end_time_pre_parse.substring(12,20);
				var event_location = events["items"][i]["location"];
				parsed_event_dict.push({key:"name", value:event_name},{key:"start", value:start_time},{key:"end",value:end_time},{key:"location",value:event_location});
			}	
		}	
	}
	console.log(parsed_event_dict);
	return parsed_event_dict;
}