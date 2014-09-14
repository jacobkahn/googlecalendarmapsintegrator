
// gicalendarList = {"dictionary returned by basic calendar call to get email address"}



function parse_calendar_name(calendarList)
{
	var calendarRequestList = [];

	if (calendarList.kind == "calendar#calendarList")
	{
		for (i = 0; i < (calendarList.items.length - 1); i++)
		{
			if (calendarList.items[i].id != "#contacts@group.v.calendar.google.com" || calendarList.item[i].id != "en.usa#holiday@group.v.calendar.google.com")
			{
				calendarRequestList[calendarList.length] = calendarList.items[i].id;

			}
			else {
				console.log("Error - invalid calendarList JSON object.");
				break;
			}
			
		}

		return (String) calendarRequestList[0];

	}
	
}

// The result calendarRequestList can be put into the different 
// requests by Natasha (this will return strings)


function parse_full_JSON_object(eventList)
{
	parsed_event_list = [];

	for (i = 0; i < eventList.length; i++) 
	{   
		if (eventList.items[i].kind == "calendar#event")
		{
			var event_name = eventList.items[i].summary;
			var start_time = eventList.items[i].start.datetime;
			var end_time = eventList.item[i].end.datetime;
			var location = eventList.item[i].location;
		}
		
	}
	return parsed_event_list;
}
