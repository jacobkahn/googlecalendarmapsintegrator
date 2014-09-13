import json
from django.http import HttpResponse



event = service.events().get(calendarId='primary', eventId='eventId').execute()

print event['summary']



class object_deserializer(object):
	def __init__(self, obj):
		json.dump(// API callback
insertAgenda({"version":"1.0","encoding":"UTF-8","feed":
		{"xmlns":"http://www.w3.org/2005/Atom",
		"xmlns$openSearch":"http://a9.com/-/spec/opensearchrss/1.0/",
		"xmlns$gCal":"http://schemas.google.com/gCal/2005",
		"id":
			{"$t":"https://www.google.com/calendar/feeds/developer-calendar%40google.com/public/full"},
		"updated":
			{"$t":"2014-09-13T01:13:26.000Z"},
		"category":
			[{"scheme":"http://schemas.google.com/g/2005#kind","term":
			"http://schemas.google.com/g/2005#event"}],
		"title":
			{"$t":"Official Google External Developer Events","type":"text"},
		"subtitle":
			{"$t":"The calendar contains information about upcoming developer conferences at which Google will be speaking, along with other developer-related events.","type":"text"},	
		"link":[{"rel":"alternate","type":"text/html","href":"http://www.google.com/calendar/embed?src=developer-calendar%40google.com"},{"rel":"http://schemas.google.com/g/2005#feed","type":"application/atom+xml","href":"http://www.google.com/calendar/feeds/developer-calendar%40google.com/public/full"},{"rel":"http://schemas.google.com/g/2005#batch","type":"application/atom+xml","href":"http://www.google.com/calendar/feeds/developer-calendar%40google.com/public/full/batch"},{"rel":"self","type":"application/atom+xml","href":"http://www.google.com/calendar/feeds/developer-calendar%40google.com/public/full?alt=json-in-script&max-results=15&singleevents=true&futureevents=true&sortorder=ascending&orderby=starttime"}],
		"author":[{"name":{"$t":"Google Developer Calendar"},"email":{"$t":"developer-calendar@google.com"}}],
		"generator":{"$t":"Google Calendar","version":"1.0","uri":"https://www.google.com/calendar"},"openSearch$totalResults":{"$t":0},"openSearch$startIndex":{"$t":1},"openSearch$itemsPerPage":{"$t":15},
		"gCal$timezone":
			{"value":"America/Los_Angeles"},
			"gCal$timesCleaned":{"value":0}}});)

response_data = {}
response_data = ['result'] = 'stuff'




return HttpResponse(json.dumps(response_data), content_type="application/json")

# path to the json information that we need: 
# we go to the following keywords
# feed
# title
# subtitle
 # author -> name
 # gGal$timezone -> value