
var eventData = [
    { eventName: "HFMA's Annual Conference", location: "Las Vegas, NV", calendar: 'HFMA', color: 'green', startDate: new Date('2018-06-25'), endDate: new Date('2018-06-27'), date: []},
    { eventName: 'Oregon HFMA Summer Conference', location: 'Welches, OR', calendar: 'HFMA', color: 'green', startDate: new Date('2018-07-18'), endDate: new Date('07/20/2018'), date:[]},
    { eventName: 'HFMA Kentucky Summer Institute', location: 'Louisville, KY', calendar: 'HFMA', color: 'green', startDate: new Date('2018-07-19'), endDate: new Date('07/20/2018'), date:[]},
    { eventName: 'Texas HFMA Summer Conference', location: 'Austin, TX', calendar: 'HFMA', color: 'green', startDate: new Date('2018-07-21'), endDate: new Date('07/24/2018'), date:[]},
    { eventName: 'HFMA Oklahoma Summer Meeting', location: 'Monkey Island, OK', calendar: 'HFMA', color: 'green', startDate: new Date('2018-07-26'), endDate: new Date('07/27/2018'), date:[]},
    { eventName: 'HFMA Region 8 MidAmerica Summer Institute', location: 'Kansas City, MO', calendar: 'HFMA', color: 'green', startDate: new Date('2018-08-06'), endDate: new Date('08/08/2018'), date:[]},
    { eventName: 'Northeastern Pennsylvania HFMA R3 Summit', location: 'Wilkes-Barre, PA', calendar: 'HFMA', color: 'green', startDate: new Date('2018-08-12'), endDate: new Date('08/14/2018'), date:[]},
    { eventName: 'Idaho HFMA Summer Conference', location: 'McCall, ID', calendar: 'HFMA', color: 'green', startDate: new Date('2018-08-16'), endDate: new Date('08/17/2018'), date:[]},
    { eventName: 'MS HFMA Summer Workshop', location: 'Philadelphia, MS', calendar: 'HFMA', color: 'green', startDate: new Date('2018-08-19'), endDate: new Date('08/21/2018'), date:[]},
    { eventName: 'First Illinois HFMA Golf Outing', location: 'Geneva, IL', calendar: 'HFMA', color: 'green', startDate: new Date('2018-08-20'), endDate: new Date('08/20/2018'), date:[]},
    { eventName: 'North Carolina HFMA Summer Conference', location: 'Myrtle Beach, SC', calendar: 'HFMA', color: 'green', startDate: new Date('2018-08-22'), endDate: new Date('08/24/2018'), date:[]},
    { eventName: 'HFMA Arkansas Summer Conference', location: 'Hot Springs, AR', calendar: 'HFMA', color: 'green', startDate: new Date('2018-08-22'), endDate: new Date('08/24/2018'), date:[]},
    { eventName: 'LA HFMA Summer Institute', location: 'Shreveport, LA', calendar: 'HFMA', color: 'green', startDate: new Date('2018-08-26'), endDate: new Date('08/27/2018'), date:[]},
    { eventName: 'HFMA Florida Fall Conference', location: 'Hollywood Beach, FL', calendar: 'HFMA', color: 'green', startDate: new Date('2018-09-05'), endDate: new Date('09/07/2018'), date:[]},
    { eventName: 'HFMA Virginia/DC Fall Conference', location: 'Virginia Beach, VA', calendar: 'HFMA', color: 'green', startDate: new Date('2018-09-19'), endDate: new Date('09/21/2018'), date:[]},
    { eventName: 'HFMA\'s Region 7 Fall Conference', location: 'South Bend, IL', calendar: 'HFMA', color: 'green', startDate: new Date('2018-09-26'), endDate: new Date('09/28/2018'), date:[]},
    { eventName: 'HFMA Maryland Fall Conference', location: 'Cambridge, MD', calendar: 'HFMA', color: 'green', startDate: new Date('2018-10-03'), endDate: new Date('10/03/2018'), date:[]},
    { eventName: 'HFMA Tenessee Fall Institute', location: 'Gatlinburg, TN', calendar: 'HFMA', color: 'green', startDate: new Date('2018-10-17'), endDate: new Date('10/19/2018'), date:[]},
    { eventName: 'Metro NY HFMA Fall Conference', location: 'Verona, NY', calendar: 'HFMA', color: 'green', startDate: new Date('2018-10-17'), endDate: new Date('10/19/2018'), date:[]},
    { eventName: 'Show Me Chapter - HFMA Fall Canference', location: 'Branson, MO', calendar: 'HFMA', color: 'green', startDate: new Date('2018-10-18'), endDate: new Date('10/19/2018'), date:[]},
    { eventName: 'HFMA First Illinois Fall Summit', location: 'Oakbrook, IL', calendar: 'HFMA', color: 'green', startDate: new Date('2018-10-23'), endDate: new Date('10/24/2018'), date:[]},
    { eventName: 'AzHHA 2018 Annual Leadership Conference', location: 'Marana, AZ', calendar: 'HFMA', color: 'green', startDate: new Date('2018-10-24'), endDate: new Date('10/25/2018'), date:[]}
  ];

var fs = require('fs')
var myData = JSON.stringify(eventData);
fs.writeFile(__dirname + '/public/events.json', myData , function (err) {
  if (err) return console.log(err);
  console.log('File written');
});
