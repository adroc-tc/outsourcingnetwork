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
    console.log("====== \"Sizing\" Calendar =======");
    console.log("First? " + myFirst.format("MM - DD - YYYY"));
    var myLast = myFirst.clone();
    myLast.add(1, "months").subtract(1, "days");
    console.log("Last? " + myLast.format("MM - DD - YYYY"));
    
    var numWeeks = myLast.week() - myFirst.week();
      if(numWeeks < 0){
      numWeeks = 52 + numWeeks;
    }
    
    console.log("Number of  weeks = " + numWeeks);  
    setHeight(numWeeks);
  }

  Calendar.prototype.drawMonth = function() {
    var self = this;
    
    this.events.forEach(function(ev) {
      //console.log("Checking logic of !(ev.eventDate)" + (!ev.eventDate) );
      if(!ev.eventDate){
        //No Date information, we're doing random        
        ev.date = self.current.clone().date(Math.random() * (29 - 1) + 1);
       // console.log("rando date: " + ev.date);
      } else {        
        ev.date = moment(ev.eventDate);
        ev.date.add(1, 'd');
      //  console.log("non-rando date: " + ev.date.format("MMM DD YYYY h:mm a"));
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
        if(ev.date.isSame(day, 'day')) {
          memo.push(ev);
        }
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
      if(ev.date.isSame(day, 'day')) {
        memo.push(ev);
      }
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
      span.innerHTML = (ev.eventName);

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
  console.log("height calculated: " + totHeight);
  console.log("=========================");
  var myCalendar = document.querySelector("#calendar");
  myCalendar.style.height = totHeight + "px";
}

!function() {
  var data = [
    { eventName: '2018 HFMA WA Chapter Conference  @ Seattle, WA ', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-02-23')},
    { eventName: '2018 HFMA WA Chapter Conference @ Seattle, WA', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-02-22')},
    { eventName: '2018 HFMA WA Chapter Conference @ Seattle, WA', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-02-24')},
    { eventName: '2018 Oregon Winter Conference @ Portland, OR', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-02-14')},
    { eventName: '21st Annual Revenue Cycle Conference @ Foxborough, MA', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-01-18')},
    { eventName: 'AAHAM Legislative Event  @ Washington, DC ', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-03-27')},
    { eventName: 'AAHAM Legislative Event @ Washington, DC', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-03-26')},
    { eventName: 'AMGA  @ Arizona ', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-03-08')},
    { eventName: 'AMGA @ Arizona', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-03-07')},
    { eventName: 'AMGA @ Arizona', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-03-09')},
    { eventName: 'AMGA @ Arizona', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-03-10')},
    { eventName: 'Annual Spring Conference ACHE @ Sacramento, CA', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-03-26')},
    { eventName: 'HFMA Alabama Chapter @ Birmingham, AL', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-01-11')},
    { eventName: "HFMA Kentucky 2018 Inspire Women's Event @ Louisville, KY", calendar: 'HFMA', color: 'green', eventDate: new Date('2018-03-07')},
    { eventName: 'HFMA Kentucky Spring Conference 2018 @ Louisville, KY ', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-03-29')},
    { eventName: 'HFMA Kentucky Spring Conference 2018 @ Louisville, KY', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-03-28')},
    { eventName: 'HFMA KY Educational Event  @ Kentucky', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-03-29')},
    { eventName: 'HFMA KY Educational Event @ Kentucky', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-03-28')},
    { eventName: 'HFMA Nebraska Spring Annual Meeting @ Omaha, NE', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-03-21')},
    { eventName: 'HFMA Virginia/DC Spring Payer Summit  @ Richmond, VA', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-03-15')},
    { eventName: 'HFMA Virginia/DC Spring Payer Summit @ Richmond, VA', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-03-14')},
    { eventName: 'HFMA Virginia/DC Spring Payer Summit @ Richmond, VA', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-03-16')},
    { eventName: 'HFMA Women in Leadership Chapter Event @ Connecticut', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-03-01')},
    { eventName: "HFMA's Annual Conference  @ Las Vegas, NV", calendar: 'HFMA', color: 'green', eventDate: new Date('2018-06-25')},
    { eventName: "HFMA's Annual Conference @ Las Vegas, NV", calendar: 'HFMA', color: 'green', eventDate: new Date('2018-06-24')},
    { eventName: "HFMA's Annual Conference @ Las Vegas, NV", calendar: 'HFMA', color: 'green', eventDate: new Date('2018-06-26')},
    { eventName: "HFMA's Annual Conference @ Las Vegas, NV", calendar: 'HFMA', color: 'green', eventDate: new Date('2018-06-27')},
    { eventName: "HFMA's Revenue Cycle Conference  @ Denver, CO", calendar: 'HFMA', color: 'green', eventDate: new Date('2018-10-22')},
    { eventName: "HFMA's Revenue Cycle Conference @ Denver, CO", calendar: 'HFMA', color: 'green', eventDate: new Date('2018-10-21')},
    { eventName: "HFMA's Revenue Cycle Conference @ Denver, CO", calendar: 'HFMA', color: 'green', eventDate: new Date('2018-10-23')},
    { eventName: 'Multi Chapter Texas State Conference @ Austin, TX', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-04-22')},
    { eventName: 'NAHAM Elevating Patient Access Annual Conference  @ Denver, CO ', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-05-04')},
    { eventName: 'NAHAM Elevating Patient Access Annual Conference @ Denver, CO', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-05-03')},
    { eventName: 'NAHAM Elevating Patient Access Annual Conference @ Denver, CO', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-05-05')},
    { eventName: 'NAHAM Elevating Patient Access Annual Conference @ Denver, CO', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-05-06')},
    { eventName: 'Northern California Annual Spring Conference @ Sacramento, CA', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-03-27')},
    { eventName: 'Northern California Annual Spring Conference @ Sacramento, CA', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-03-28')},
    { eventName: 'Northern California Annual Spring Conference @ Sacramento, CA', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-03-29')},
    { eventName: 'Regional HFMA Dixie Event Multi State  @ Tampa, FL', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-02-26')},
    { eventName: 'Regional HFMA Dixie Event Multi State @ Tampa, FL', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-02-25')},
    { eventName: 'Regional HFMA Dixie Event Multi State @ Tampa, FL', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-02-27')},
    { eventName: 'Regional HFMA Dixie Event Multi State @ Tampa, FL', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-02-28')},
    { eventName: 'Revenue Cycle Academy - HFMA @ Connecticut', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-02-13')},
    { eventName: 'Winter Meeting Illinois, McMahon HFMA Chapter Event @ McMahon, IL', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-01-25')},
    { eventName: 'Winter Meeting Illinois, McMahon HFMA Chapter Event @ McMahon, IL', calendar: 'HFMA', color: 'green', eventDate: new Date('2018-01-26')}
  ];

    //console.log("data[0].eventDate:" + data[0].eventDate);
  

  function addDate(ev) {
    
  }

  var calendar = new Calendar('#calendar', data);

}();
