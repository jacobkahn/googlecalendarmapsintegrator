/** 
	Assign an order value to each event in the list based on StartTime
	Amended and tested by Devesh - good to go.
	Output: Original event list with an 'order' key and pair value.
*/

function full_json_event_ranker(parsed_event_list)
{	
	for (i = 0; i < parsed_event_list.length; i++) {
			parsed_event_list[i]["order"] = i+1;
	}
	return parsed_event_list;
}