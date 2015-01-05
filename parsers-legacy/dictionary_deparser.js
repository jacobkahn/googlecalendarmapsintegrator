//takes the already-generated dictionaries 
//and converts them to meta list for summer

function dictionary_deparser(sorted_event_dictionary)
{
	var temp_dict_convert = [];
	var maps_compatible_event_list = [];
	for (i = 0; i < sorted_event_dictionary.length; i++)
	{
		temp_dict_convert = [sorted_event_dictionary[i]["name"], sorted_event_dictionary[i]["location"],sorted_event_dictionary[i]["start"], sorted_event_dictionary[i]["end"], sorted_event_dictionary[i]["rank"]];
		maps_compatible_event_list.push(temp_dict_convert);
		temp_dict_convert = [];
	}
return maps_compatible_event_list;
}