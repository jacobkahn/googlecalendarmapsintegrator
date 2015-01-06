function getDay() {
	var Dtime = new Date();
	var dayW = Dtime.getDay();
	var dayS = "";
	if (dayW=1){dayS="Sunday"}else if (dayW=2){dayS="Monday"}else if (dayW=3){dayS="Tuesday"}else if (dayW=4){dayS="Wednesday"}else if (dayW=5){dayS="Thursday"}else if (dayW=6){dayS="Friday"}else if (dayW=7){dayS="Saturday"}else{dayS=""} 
	document.getElementById("day").innerHTML = dayS; 
}

function toggle_visibility() {
   getDay();
   window.scroll(0,700);
   $("#initial").fadeOut("slow", function() {
	$("#mapper").fadeIn("slow", function() {});
   });
}

function bakeCookie(cookie) {
	//document.cookie = "eventCookie"+ "=" + cookie + "; " + "expires=";
	$.cookie('eventCookie', escape(cookie.join(',')), {expires:1234});
}