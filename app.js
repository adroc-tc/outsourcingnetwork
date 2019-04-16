/*jslint node: true */
/* eslint-env node */

var bodyParser      = require("body-parser"),
    formidable      = require("formidable"),
    nodemailer      = require("nodemailer"),
    response        = require("response"),
    express         = require("express"),
    moment          = require("moment"),
    request         = require("request"),
    path            = require("path"),
    ejs             = require("ejs"),
    fs              = require("fs"),
    app             = express();

app.set("view engine", "ejs");
app.locals.moment = require("moment");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let smtpConfig = {
  // host: '199.184.85.73',
  // port: 25,
  // secure: false,
  // auth: {
  //   user: 'emailnotifications@internal.hon',
  //   pass: 'q4hd)5q#E05O2>L'
  // },
  service: 'gmail',
  auth: {
        user: 'dedywahyuditc@gmail.com',
        pass: 'Lunark1d'
    }
  // tls: {
  //   // do not fail on invalid certs
  //   rejectUnauthorized: false
  // }
};

console.log("User!!! " + smtpConfig.auth.user);
console.log("PASS!!! " + smtpConfig.auth.pass);

var transporter = nodemailer.createTransport(smtpConfig);

// verify connection configuration
transporter.verify(function(error, success) {
   if (error) {
        console.log(error);
   } else {
        console.log('Server is ready to take our messages');
   }
});

app.use((req, res, next) => {
  const test = /\?[^]*\//.test(req.url);
  if (req.url.substr(-1) === '/' && req.url.length > 1 && !test)
    res.redirect(301, req.url.slice(0, -1));
  else
    next();
});

app.get("/test", function(req, res){
  res.render("home");
});

app.get("/test/about", function(req, res){
  res.render("about");
});

// "about" pages
app.get("/test/about/affiliates", function(req, res){
  res.render("about/affiliates");
});

app.get("/test/about/feedback", function(req, res){
  res.render("about/feedback");
});

app.get("/test/about/mission", function(req, res){
  res.render("about/mission");
});

app.get("/test/about/relationships", function(req, res){
  res.render("about/relationships");
});

app.get("/test/about/values", function(req, res){
  res.render("about/values");
});
// End of "about" pages


// Leadership Main
app.get("/test/leadership", function(req, res){
  res.render("leadership");
});

// *****************************************
// ******* Leadership pages *******
// "Team Summit"
app.get("/test/groups/summit", function(req, res){
  res.render("groups/leaders")
});

// "Black Diamond Groomers"
app.get("/test/groups/groomers", function(req, res){
  res.render("groups/ambassadors")
});

// "The Gold Miners"
app.get("/test/groups/miners", function(req, res){
  res.render("groups/tech")
});

// "Pathfinders"
app.get("/test/groups/pathfinders", function(req, res){
  res.render("groups/seekers")
});

// "Team Shackleton"
app.get("/test/groups/shackleton", function(req, res){
  res.render("groups/cheerleaders")
});

// "First Tracks Team"
app.get("/test/groups/team", function(req, res){
  res.render("groups/first_impressions_team")
});
// ******* End of Leadership pages *******
// *****************************************

app.get("/test/services", function(req, res){
  res.render("services");
});

// *****************************************
// ******* Service pages *******
// "Training Quality Assurance"
app.get("/test/services/training", function(req,res){
  res.render("services/training");
});

// "Quality Assurance"
app.get("/test/services/qa", function(req,res){
  res.render("services/qa");
});

// "Patient Balance Management"
app.get("/test/services/balanceMgt", function(req,res){
  res.render("services/early");
});

// "Insurance Follow-up"
app.get("/test/services/insurance", function(req,res){
  res.render("services/insurance");
});

// "Virtual Agents With Artificial Intelligence"
app.get("/test/services/intelligence", function(req,res){
  res.render("services/virtual");
});

// "Data Analytics"
app.get("/test/services/analytics", function(req,res){
  res.render("services/analytics");
});

// "Robotic Process Automation (RPA)"
app.get("/test/services/rpa", function(req,res){
  res.render("services/rpa");
});

// "Call Center Support/Patient Survey"
app.get("/test/services/callCenter", function(req,res){
  res.render("services/call_center");
});

// "Benchmarking"
app.get("/test/services/benchmarking", function(req,res){
  res.render("services/benchmark");
});
// ******* End of Service pages *******
// *****************************************

// *****************************************
// Technology Section
app.get("/test/technology", function(req, res){
  res.render("technology");
});
// Technology Pages
// "Operating System"
app.get("/test/technologies/platform", function(req, res){
  res.render("technologies/os")
});

// "Telephone System"
app.get("/test/technologies/telephone", function(req, res){
  res.render("technologies/telephone");
});

// "Business Intelligent Reporting"
app.get("/test/technologies/reporting", function(req, res){
  res.render("technologies/report");
});

// "Advanced Technology"
app.get("/test/technologies/advanced", function(req, res){
  res.render("technologies/advanced");
});
// ******** End of Technology Pages ********
// *****************************************

app.get("/test/contact", function(req, res){
  res.render("contact");
});


// ********************************************************************************************
// **************************************** Event Data ****************************************


app.get("/test/events", function(req, res){
  var eventData = [];
  var currentDate = moment();
  console.log("today? --> " + currentDate.format("MM/DD/YYYY"));

  fs = require('fs')
  fs.readFile(__dirname + '/public/events.json', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    eventData = JSON.parse(data);
    res.render("events", {events: eventData,
                       currentDate: currentDate});
  });
});


app.get("/test/recap", function(req, res){
  res.render("reCAPTCHA_testing");
});

app.post("/captcha", function(req, res){
  if(req.body['g-recaptcha-response'] === undefined || req.body['g-recaptcha-response'] === '' || req.body['g-recaptcha-response'] === null){
    // they somehow submitted without performing reCAPTCHA
    // replace below with an error message
    return res.json({"responseError" : "Please select captcha first"});
  }
  const secretKey = "6LfRAVEUAAAAACdbR_B5fsm-drSlCME1EaA2ykiZ";
  const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + req.body['g-recaptcha-response'] + "&remoteip=" + req.connection.remoteAddress;

  request(verificationURL,function(error,response,body){
    body = JSON.parse(body);
    if(body.success !== undefined && !body.success){
      // reCAPTCHA was not successfull or not captured
      // Replace line below with a redirect to a "retry" message
      // return res.json({"responseError" : "Failed captcha verification"});
    }
    // Process the returned data, because reCAPTCHA is good.
    res.json({"responseSuccess" : "Sucess"});
  });
});

app.get("/test/hire", function(req, res){
  res.render("hire");
});

app.post("/test/hire", function(req, res){
  var captchaResponse;
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if(err) {
      console.log(err);
    }
    console.log(fields);
    console.log("files: " + JSON.stringify(files, null, 4));
    var myAttachments = [];
    for(var fileUpload in files){
      console.log("file:                 " + fileUpload);
      console.log("files['" + fileUpload + "']: " + files[fileUpload]);
      console.log("files['" + fileUpload + "'].name: " + files[fileUpload].name);
      console.log("strigify(fileUpload): " + JSON.stringify(fileUpload, null, 4));
      if(files[fileUpload].name){
        if(files[fileUpload].type == 'application/pdf' || files[fileUpload].type == 'application/msword' || files[fileUpload].type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || files[fileUpload].type == 'text/plain'){
          myAttachments.push({
            filename: files[fileUpload].name,
            path: files[fileUpload].path,
            contentType: files[fileUpload].type
          });
        }
      }
    };
    console.log(fields['g-recaptcha-response']);
    captchaResponse = fields['g-recaptcha-response'];

    if(captchaResponse === undefined || captchaResponse === '' || captchaResponse === null){
      // they somehow submitted without performing reCAPTCHA
      // replace below with an error message
      return res.json({"responseError" : "Please select captcha first"});
    }
    const secretKey = "6LfRAVEUAAAAACdbR_B5fsm-drSlCME1EaA2ykiZ";
    const verificationURL = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + captchaResponse + "&remoteip=" + req.connection.remoteAddress;

    request(verificationURL,function(error,response,body){
      body = JSON.parse(body);
      if(body.success !== undefined && !body.success){
        // reCAPTCHA was not successfull or not captured
        // Replace line below with a redirect to a "retry" message
        // return res.json({"responseError" : "Failed captcha verification"});
      }
      // Process the returned data, because reCAPTCHA is good.

      var mailOptions = {
        from: 'emailnotifications@internal.hon',
        to: 'jkirsopp@healthout.com',
        subject: 'Online Application Form Submitted',
        attachments: myAttachments
      };

      //formatting dates
      fields['docDate'] = moment(fields['docDate']).format("MM/DD/YYYY");         // required
      fields['start-date'] = moment(fields['start-date']).format("MM/DD/YYYY");   // required
      if(fields['startDate1']) {
        fields['startDate1'] = moment(fields['startDate1']).format("MM/YYYY");
      }
      if(fields['startDate2']) {
        fields['startDate2'] = moment(fields['startDate2']).format("MM/YYYY");
      }
      if(fields['startDate3']) {
        fields['startDate3'] = moment(fields['startDate3']).format("MM/YYYY");
      }
      if(fields['endDate1']) {
        fields['endDate1'] = moment(fields['endDate1']).format("MM/YYYY");
      }
      if(fields['endDate2']) {
        fields['endDate2'] = moment(fields['endDate2']).format("MM/YYYY");
      }
      if(fields['endDate3']) {
        fields['endDate3'] = moment(fields['endDate3']).format("MM/YYYY");
      }

      ejs.renderFile("./views/application2.ejs", fields, {}, function(err, str){
        if(err) {
          console.log("Error occured trying to create HTML: " + err);
          mailOptions.text = "Oops! No HTML for you";
        }
        mailOptions.html = str;
      });

      transporter.sendMail(mailOptions, function(error, info){
        if(error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.json({"responseSuccess" : "Sucess"});
    });
  });
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function(){
  console.log("The Server is Running and Listening");
  console.log(__dirname);
});
