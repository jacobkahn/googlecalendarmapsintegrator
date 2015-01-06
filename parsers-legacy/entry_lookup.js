
// Returns first main calendar name 
function parse_calendar_name(calendarList)
{
	var calendarRequestList = [];
	if (calendarList.kind == "calendar#calendarList")
	{
		for (i = 0; i < (calendarList.items.length - 1); i++)
		{
			if (calendarList.items[i].id != "#contacts@group.v.calendar.google.com" || calendarList.items[i].id != "en.usa#holiday@group.v.calendar.google.com")
			{
				calendarRequestList.push(calendarList.items[i].id);
			}
			else {
				console.log("Error - invalid calendarList JSON object.");
				break;
			}
		}
		var firstRequestListItem = calendarRequestList[0];
		console.log(firstRequestListItem);
		return firstRequestListItem;
	}
	
}