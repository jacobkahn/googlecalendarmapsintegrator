// Create a function to log the response from the Mandrill API
function log(obj) {
    console.log(JSON.stringify(obj));
}

// create a new instance of the Mandrill class with your API key
var m = new mandrill.Mandrill('lvh8hM4-xC_Yh4OiVaLUXg');

// create a variable for the API call parameters
var params = {
    "message": {
        "from_email":"calendarmapper@gmail.com",
        "to":[{"email":"yyue@seas.upenn.edu"},{"email":"jacokahn@wharton.upenn.edu"}],
        "subject": "Testing Mandrill",
        "html": "<h1 style=\"font-size: 3em\">YUTING</h1>",
		"auto_text": "null",
    }
};

function sendTheMail() {
    m.messages.send(params, function(res) {
        log(res);
    }, function(err) {
        log(err);
    });
}