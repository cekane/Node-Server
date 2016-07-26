var express = require('express'); 
var app = express();

var getIP = require('external-ip')();
var cors = require('cors');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var mandrill = require('nodemailer-mandrill-transport');

var emailTemplates = require('email-templates');



app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors());


function createEmail(err, body) {
  if (err) { return res.send(err.status_code ? err.status_code : 500, err); }
  emailTemplates(config.email.templateDir, renderForgotTemplate);
}

// Initialize app with appropriate IP
app.post('/formcontent', function (req, res) {
  const labels = req.body.labels;
  const fields = req.body.fields;
  console.log("LABELS", labels)
  console.log("EMAIL", req.body.email )
  var str = ' '
  Object.keys(req.body.fields).map((k, i)=>{ str = str.concat('<h3>').concat(labels[i]).concat(':').concat(' ').concat(fields[k]).concat('</h3>')})
  console.log(str)
  var transport = nodemailer.createTransport(mandrill({
    auth: {
      apiKey: 'R4a417PLlD_4qZiBoAqjjw'
    }
  }));

  transport.sendMail({
    from: 'Windrush Team <form@windrush.io>',
    to: req.body.email,
    subject: 'Hello',
    html: str
  }, function(err, info) {
    if (err) {
      console.error(err);
    } else {
      console.log(info);
    }
  });
});

getIP(function (err, ip) {
    if (err) {
        // every service in the list has failed
        throw err;
    }
    IP = ip;

    server = app.listen(4000, function () {
      var host = IP
      var port = server.address().port
      console.log('Example app listening at http://%s:%s', host, port)
    });

});