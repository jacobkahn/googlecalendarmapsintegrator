function full_json_event_ranker(parsed_event_list)
{
	//var sorted_date_event_dictionary = parsed_event_list.sort(function(a,b) { return parseFloat(a["start"].substring(0,10)) - parseFloat(b["start"].substring(0,10)) });
	//var sorted_event_dictionary_no_rank = parsed_date_event_list.sort(function(a,b) { return parseFloat(a["start"].substring(12,20)) - parseFloat(b["start"].substring(12,20)) });
	var alphabet_appender = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
	var sorted_event_dictionary = parsed_event_list.sort(function(a,b) { return parseFloat(a["start"]) - parseFloat(b["start"]) } );

	for (i = 0; i < sorted_event_dictionary.length; i++)
	{
			sorted_event_dictionary[i]["rank"] = alphabet_appender[i];
	
	}
	return sorted_event_dictionary;
}