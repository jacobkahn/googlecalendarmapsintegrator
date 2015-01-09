calendarData = new Array();

function populateTime() {
	var now = new Date();
	var dayW = now.getDay();
	var dayS = "";
	if (dayW==0){dayS="Sunday"}else if (dayW==1){dayS="Monday"}else if (dayW==2){dayS="Tuesday"}else if (dayW==3){dayS="Wednesday"}else if (dayW==4){dayS="Thursday"}else if (dayW==5){dayS="Friday"}else if (dayW==6){dayS="Saturday"}else{dayS=""} 
	document.getElementById("day").innerHTML = dayS; 
}

function toggleCheckBox(id, data) {
	console.log("Toggling event tag: #"+id);
	var toggle = document.getElementById(id).checked;
	document.getElementById(id).checked = !toggle;
	buildMap(calendarData);
}

function toggle_mainmapper(data) {
	populateTime();
	window.scroll(0,700);
	$("#initial").fadeOut("slow", function() {
		$("#mapper").fadeIn("slow", function() {});
		$("#revokeButtonTag").fadeIn("slow", function() {});
	});
	document.getElementById("map-canvas").style.height = "350px";
	document.getElementById("directions-panel").style.height = "350px";
	buildMap(data);
}

function toggle_noevents() {
	window.scroll(0,700);
	$("#initial").fadeOut("slow", function() {
		$("#noevents").fadeIn("slow", function () {});
		$("#revokeButtonTag").fadeIn("slow", function() {});
	});
}

function handleData(events) {
	console.log("Incoming OAuth Token:");
	console.log(events);
	var parsedData = parse_full_JSON_object(events);
	console.log("Parsing data...");
	var rankedData = full_json_event_ranker(parsedData);
	console.log("Assigning orders...");
	var eventDetailsList = dictionary_deparser(rankedData);
	console.log("Done!");
	console.log("Final output:");
	console.log(eventDetailsList);
	populateTags(eventDetailsList);
	for (i=0; i<eventDetailsList.length;  i++) {
		calendarData.push(eventDetailsList[i])
	}
	if(eventDetailsList.length > 0) {
		toggle_mainmapper(eventDetailsList);
	}
	else{
		console.log("No events!");
		toggle_noevents();
	}
}

var eventnumber = 1; 
function populateTags (details) {
	var input = details;
	c1tag=""; c2tag=""; c3tag="";
	for(i = 0; i < details.length; i++) {
		var time = details[i][3];
		var name = details[i][1];
		var check = parseInt(time.substring(0,2));
		var tagname = eventnumber;
		if(check < 8) {
			misc = " AM";
			c1tag = c1tag + "<li style=\"cursor: pointer\" onclick=\"toggleCheckBox(\'"+tagname+"\')\"><input type=\"checkbox\" id=\""+tagname+"\" style=\"float: left\" checked=\"checked\"><a>"+name+"</a><span id=\"timeStamp\">"+time+misc+"</span></li>";
		}
		else if((check >= 8) && (check < 16)) {
			misc = " PM"; 
			c2tag = c2tag + "<li style=\"cursor: pointer\" onclick=\"toggleCheckBox(\'"+tagname+"\', \'calendarData\')\"><input type=\"checkbox\" id=\""+tagname+"\" style=\"float: left\" checked=\"checked\"><a>"+name+"</a><span id=\"timeStamp\">"+time+misc+"</span></li>";
		}
		else if(check >= 16) {
			misc = " PM"; 
			c3tag = c3tag + "<li style=\"cursor: pointer\" onclick=\"toggleCheckBox(\'"+tagname+"\')\"><input type=\"checkbox\" id=\""+tagname+"\" style=\"float: left\" checked=\"checked\"><a>"+name+"</a><span id=\"timeStamp\">"+time+misc+"</span></li>";
		} 
		eventnumber += 1;
	}
	document.getElementById("c1").innerHTML = c1tag;
	document.getElementById("c2").innerHTML = c2tag;
	document.getElementById("c3").innerHTML = c3tag;
}