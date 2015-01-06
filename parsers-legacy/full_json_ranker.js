/** 
	Assign an order value to each event in the list based on StartTime
	Amended and tested by Devesh - good to go.
	Output: Original event list with an 'order' key and pair value.
*/

function full_json_event_ranker(parsed_event_list)
{
	var sorted_event_dictionary = parsed_event_list.sort(function(a,b) { 
		return parseFloat(a["start"]) - parseFloat(b["start"]) 
	});
	
	for (i = 0; i < sorted_event_dictionary.length; i++) {
			sorted_event_dictionary[i]["order"] = i+1;
	}
	return sorted_event_dictionary;
}