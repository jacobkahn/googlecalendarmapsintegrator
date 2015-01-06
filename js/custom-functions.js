function populateTime() {
	var now = new Date();
	var dayW = now.getDay();
	var dayS = "";
	if (dayW==0){dayS="Sunday"}else if (dayW==1){dayS="Monday"}else if (dayW==2){dayS="Tuesday"}else if (dayW==3){dayS="Wednesday"}else if (dayW==4){dayS="Thursday"}else if (dayW==5){dayS="Friday"}else if (dayW==6){dayS="Saturday"}else{dayS=""} 
	document.getElementById("day").innerHTML = dayS; 
}

function toggle_visibility() {
   populateTime();
   window.scroll(0,700);
   $("#initial").fadeOut("slow", function() {
	$("#mapper").fadeIn("slow", function() {});
   });
}

function bakeCookie(cookie) {
	//document.cookie = "eventCookie"+ "=" + cookie + "; " + "expires=";
	$.cookie('eventCookie', escape(cookie.join(',')), {expires:1234});
}