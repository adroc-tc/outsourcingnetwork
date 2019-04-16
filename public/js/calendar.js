!function () {

  var today = moment();

  function Calendar(selector, events) {
    this.el = document.querySelector(selector);
    this.events = events;
    this.current = moment().date(1);
    this.draw();
    var current = document.querySelector('.today');
    if(current) {
      var self = this;
      window.setTimeout(function() {
        self.openDay(current);
      }, 500);
    }
  }

  Calendar.prototype.draw = function() {
    //Create Header
    this.drawHeader();

    //Draw Month
    this.drawMonth();

    this.drawLegend();
    //setHeight();
  }


  Calendar.prototype.drawHeader = function() {
    var self = this;
    if(!this.header) {
      //Create the header elements
      this.header = createElement('div', 'header');
      this.header.className = 'header';

      this.title = createElement('h1');

      var right = createElement('div', 'right');
      right.addEventListener('click', function() { self.nextMonth(); });

      var left = createElement('div', 'left');
      left.addEventListener('click', function() { self.prevMonth(); });

      //Append the Elements
      this.header.appendChild(this.title);
      this.header.appendChild(right);
      this.header.appendChild(left);
      this.el.appendChild(this.header);
    }

    this.title.innerHTML = this.current.format('MMMM YYYY');

    var myMonth = this.current.month()
    var myYear  = this.current.year();
    var myFirst = this.current.clone();
    myFirst.date(1);
//    console.log("====== \"Sizing\" Calendar =======");
//    console.log("First? " + myFirst.format("MM - DD - YYYY"));
    var myLast = myFirst.clone();
    myLast.add(1, "months").subtract(1, "days");
//    console.log("Last? " + myLast.format("MM - DD - YYYY"));

    var numWeeks = myLast.week() - myFirst.week();
      if(numWeeks < 0){
      numWeeks = 52 + numWeeks;
    }

//    console.log("Number of  weeks = " + numWeeks);
    setHeight(numWeeks);
  }

  Calendar.prototype.drawMonth = function() {
    var self = this;

    this.events.forEach(function(ev) {
      // console.log("Checking logic of !(ev.eventDate)" + (!ev.eventDate) );
      if(!ev.startDate){
        // No startDate information, check for eventDate
        if(!ev.eventDate) {
          // No date information found, we're doing random
          ev.date = self.current.clone().date(Math.random() * (29 - 1) + 1);
        } else {
          ev.date = moment(ev.eventDate);
          ev.date.add(1, 'd');
        }
      } else { // We have (at least) a startDate
        var tryDate = moment(ev.startDate);
        var endDate = moment(ev.endDate);
        tryDate.add(7, 'h'); // 'fix' date (converting Date to moment object is weird)
        endDate.add(7, 'h'); // 'fix' date (converting Date to moment object is weird)
//        console.log("Before 'while' loop: ");
//        console.log("tryDate: " + tryDate.format("MMM DD YYYY"));
//        console.log("endDate: " + endDate.format("MMM DD YYYY"));
        while(tryDate.isBefore(endDate, 'day') || tryDate.isSame(endDate, 'day')){
          ev.date.push(moment(tryDate));
          tryDate.add(1, 'd');
//          console.log("[in 'while' loop] tryDate: " + tryDate.format("MMM DD YYYY"));
        }
//        console.log("Exited 'while' loop");
//        console.log("ev.date: " + ev.date);
      }
    });


    if(this.month) {
      //console.log("Old Month Code Started");
      this.oldMonth = this.month;
      //console.log("just ran: 'this.oldMonth = this.month;'");
      this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');
      //console.log("just ran: 'this.oldMonth.className = 'month out ' + (self.next ? 'next' : 'prev');'");
      this.oldMonth.addEventListener('animationend', function() {
        //console.log("just ran: 'this.oldMonth.addEventListener('webkitAnimationEnd', function() {'");
        self.oldMonth.parentNode.removeChild(self.oldMonth);
        //console.log("Attempting to remove all old month child elements");
        self.month = createElement('div', 'month');
        //console.log("Created 'month' div");
        self.backFill();
        //console.log("adding in the 'backfill' dates");
        self.currentMonth();
        //console.log("adding the current month's days");
        self.fowardFill();
        //console.log("adding in next month's dates to fill out the last week");
        self.el.appendChild(self.month);
        window.setTimeout(function() {
          self.month.className = 'month in ' + (self.next ? 'next' : 'prev');
        }, 32);
      });
    } else {
        this.month = createElement('div', 'month');
        this.el.appendChild(this.month);
        this.backFill();
        this.currentMonth();
        this.fowardFill();
        this.month.className = 'month new';
    }
  }

  Calendar.prototype.backFill = function() {
    var clone = this.current.clone();
    var dayOfWeek = clone.day();

    if(!dayOfWeek) { return; }

    clone.subtract(dayOfWeek+1, 'days');

    for(var i = dayOfWeek; i > 0 ; i--) {
      //console.log("day of week - " + dayOfWeek);
      //console.log("day being \"drawn\" - " + clone.add(1, 'days').format("MMM DD YYYY"));
      //clone.subtract(1, 'days');
      this.drawDay(clone.add(1, 'days'));
    }
  }

  Calendar.prototype.fowardFill = function() {
    var clone = this.current.clone().add(1, 'months').subtract(1, 'days');
    var dayOfWeek = clone.day();

    if(dayOfWeek === 6) { return; }

    for(var i = dayOfWeek; i < 6 ; i++) {
      this.drawDay(clone.add(1, 'days'));
    }
  }

  Calendar.prototype.currentMonth = function() {
    var clone = this.current.clone();

    while(clone.month() === this.current.month()) {
      this.drawDay(clone);
      clone.add(1, 'days');
    }
  }

  Calendar.prototype.getWeek = function(day) {
    if(!this.week || day.day() === 0) {
      this.week = createElement('div', 'week');
      this.month.appendChild(this.week);
    }
  }

  Calendar.prototype.drawDay = function(day) {
    var self = this;
    this.getWeek(day);

    //Outer Day
    var outer = createElement('div', this.getDayClass(day));
    outer.addEventListener('click', function() {
      self.openDay(this);
    });

    //Day Name
    var name = createElement('div', 'day-name', day.format('ddd'));

    //Day Number
    var number = createElement('div', 'day-number', day.format('DD'));


    //Events
    var events = createElement('div', 'day-events');
    this.drawEvents(day, events);

    outer.appendChild(name);
    outer.appendChild(number);
    outer.appendChild(events);
    this.week.appendChild(outer);
  }

  Calendar.prototype.drawEvents = function(day, element) {
    if(day.month() === this.current.month()) {
      var todaysEvents = this.events.reduce(function(memo, ev) {
        var evDateFound = false;
        ev.date.forEach(function(myEventDate){
          if(myEventDate.isSame(day, 'day') && !(evDateFound)){
            memo.push(ev);
            evDateFound = true;
          }
        });
        return memo;
      }, []);

      todaysEvents.forEach(function(ev) {
        var evSpan = createElement('span', ev.color);
        element.appendChild(evSpan);
      });
    }
  }

  Calendar.prototype.getDayClass = function(day) {
    classes = ['day'];
    if(day.month() !== this.current.month()) {
      classes.push('other');
    } else if (today.isSame(day, 'day')) {
      classes.push('today');
    }
    return classes.join(' ');
  }

  Calendar.prototype.openDay = function(el) {
    var details, arrow;
    var dayNumber = +el.querySelectorAll('.day-number')[0].innerText || +el.querySelectorAll('.day-number')[0].textContent;
    var day = this.current.clone().date(dayNumber);

    var currentOpened = document.querySelector('.details');

    //Check to see if there is an open detais box on the current row
    if(currentOpened && currentOpened.parentNode === el.parentNode) {
      details = currentOpened;
      arrow = document.querySelector('.arrow');
    } else {
      //Close the open events on differnt week row
      //currentOpened && currentOpened.parentNode.removeChild(currentOpened);
      if(currentOpened) {
        currentOpened.addEventListener('webkitAnimationEnd', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('oanimationend', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('msAnimationEnd', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.addEventListener('animationend', function() {
          currentOpened.parentNode.removeChild(currentOpened);
        });
        currentOpened.className = 'details out';
      }

      //Create the Details Container
      details = createElement('div', 'details in');

      //Create the arrow
      var arrow = createElement('div', 'arrow');

      //Create the event wrapper

      details.appendChild(arrow);
      el.parentNode.appendChild(details);
    }

    var todaysEvents = this.events.reduce(function(memo, ev) {
      //console.log("Date Being Processed: " + day.format("MMM DD YYYY"));
      if(ev.date){
      //  console.log("Event's Date: " + ev.date.format("MMM DD YYYY"));
      } else {
      //  console.log("No Event Date");
      }
      var evDateFound = false;
      ev.date.forEach(function(myEventDate){
        if(myEventDate.isSame(day, 'day') && !(evDateFound)){
          memo.push(ev);
          evDateFound = true;
        }
      });
//      if(ev.date.isSame(day, 'day')) {
//        memo.push(ev);
//      }
      return memo;
    }, []);

    this.renderEvents(todaysEvents, details);

    arrow.style.left = el.offsetLeft - el.parentNode.offsetLeft + 27 + 'px';
  }

  Calendar.prototype.renderEvents = function(events, ele) {
    //Remove any events in the current details element
    var currentWrapper = ele.querySelector('.events');
    var wrapper = createElement('div', 'events in' + (currentWrapper ? ' new' : ''));

    events.forEach(function(ev) {
      var div = createElement('div', 'event');
      var square = createElement('div', 'event-category ' + ev.color);
      var span = createElement('span', '');
      span.innerHTML = (ev.eventName + '<br>' + ev.location);

      div.appendChild(square);
      div.appendChild(span);
      wrapper.appendChild(div);
    });

    if(!events.length) {
      var div = createElement('div', 'event empty');
      var span = createElement('span', '', 'No Events');

      div.appendChild(span);
      wrapper.appendChild(div);
    }

    if(currentWrapper) {
      currentWrapper.className = 'events out';
      currentWrapper.addEventListener('webkitAnimationEnd', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('oanimationend', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('msAnimationEnd', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
      currentWrapper.addEventListener('animationend', function() {
        currentWrapper.parentNode.removeChild(currentWrapper);
        ele.appendChild(wrapper);
      });
    } else {
      ele.appendChild(wrapper);
    }
  }

  Calendar.prototype.drawLegend = function() {
    var legend = createElement('div', 'legend');
    var calendars = this.events.map(function(e) {
      return e.calendar + '|' + e.color;
    }).reduce(function(memo, e) {
      if(memo.indexOf(e) === -1) {
        memo.push(e);
      }
      return memo;
    }, []).forEach(function(e) {
      var parts = e.split('|');
      var entry = createElement('span', 'entry ' +  parts[1], parts[0]);
      legend.appendChild(entry);
    });
    this.el.appendChild(legend);
  }

  Calendar.prototype.nextMonth = function() {
    this.current.add(1, 'months');
    this.next = true;
    this.draw();
    //setHeight();
  }

  Calendar.prototype.prevMonth = function() {
    this.current.subtract(1, 'months');
    this.next = false;
    this.draw();
    //setHeight();
  }

  window.Calendar = Calendar;

  function createElement(tagName, className, innerText) {
    var ele = document.createElement(tagName);
    if(className) {
      ele.className = className;
    }
    if(innerText) {
      ele.innderText = ele.textContent = innerText;
    }
    return ele;
  }
}();

//window.addEventListener("load", setHeight, false);

  // =====================================
  // = Trying to set the height properly =
  // =====================================

function setHeight(numWeeks) {
  numWeeks++;
  var weekHeight   = 89 * numWeeks;
  var headerHeight = 50;
  var infoHeight   = 125;
  var legendHeight = 30;
  var totHeight    = weekHeight + headerHeight + infoHeight + legendHeight;
//  console.log("height calculated: " + totHeight);
//  console.log("=========================");
  var myCalendar = document.querySelector("#calendar");
  myCalendar.style.height = totHeight + "px";
}

!function() {
  var data = [
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

    //console.log("data[0].eventDate:" + data[0].eventDate);


  function addDate(ev) {

  }

  var calendar = new Calendar('#calendar', data);

}();
