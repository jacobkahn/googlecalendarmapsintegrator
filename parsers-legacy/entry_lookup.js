
// calendarList = {"dictionary returned by basic calendar call to get email address"}



function parse_calendar_name(calendarList)
{
	var calendarRequestList = [];


	if (calendarList.kind == "calendar#calendarList")
	{
		for (i = 0; i < (calendarList.items.length - 1); i++)
		{
			if (calendarList.items[i].id != "#contacts@group.v.calendar.google.com" || calendarList.item[i].id != "en.usa#holiday@group.v.calendar.google.com")
			{
				calendarRequestList.push(calendarList.items[i].id);
				console.log(calendarRequestList);

			}
			else {
				console.log("Error - invalid calendarList JSON object.");
				break;
			}
			
		}
		var firstRequestListItem = calendarRequestList[0];
		return firstRequestListItem;

	}
	
}