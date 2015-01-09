<?php
require 'class.iCalReader.php';
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
$FileType = pathinfo($target_file,PATHINFO_EXTENSION);

/* Check file size
if ($_FILES["fileToUpload"]["size"] > 500000) {
    echo "Sorry, your file is too large.";
    $uploadOk = 0;
}*/
// Allow certain file formats
if($FileType != 'ics') {
    echo "Sorry, only ics files are allowed.";
    $uploadOk = 0;
}
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
    echo "Sorry, your file was not uploaded.";
// if everything is ok, try to upload file
} 
else {
    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
		$ical   = new ICal('event_calendar.ics');
		$events = $ical->events();

		$date = $events[0]['DTSTART'];

		echo "The number of events: ";
		echo $ical->event_count;
		echo "<br/>";

		foreach ($events as $event) {
		    echo "SUMMARY: ".$event['SUMMARY']."<br/>";
		    echo "DTSTART: ".$event['DTSTART'].$ical->iCalDateToUnixTimestamp($event['DTSTART'])."<br/>";
		    echo "DTEND: ".$event['DTEND']."<br/>";
		    echo "LOCATION: ".$event['LOCATION']."<br/>";
		    echo "<hr/>";
		}
    } else {
        echo "Sorry, there was an error uploading your file.";
    }
}
?>