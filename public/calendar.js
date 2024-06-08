const calendar = document.querySelector(".calendar"),
  date = document.querySelector(".date"),
  daysContainer = document.querySelector(".days"),
  prev = document.querySelector(".prev"),
  next = document.querySelector(".next"),
  todayBtn = document.querySelector(".today-btn"),
  gotoBtn = document.querySelector(".goto-btn"),
  dateInput = document.querySelector(".date-input"),
  eventDay = document.querySelector(".event-day"),
  eventDate = document.querySelector(".event-date"),
  eventsContainer = document.querySelector(".events"),
  addEventBtn = document.querySelector(".add-event"),
  addEventWrapper = document.querySelector(".add-event-wrapper "),
  addEventCloseBtn = document.querySelector(".close "),
  addEventTitle = document.querySelector(".event-name "),
  addEventFrom = document.querySelector(".event-time-from "),
  addEventTo = document.querySelector(".event-time-to "),
  addEventSubmit = document.querySelector(".add-event-btn ");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();
let thisdate;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// const eventsArr = [
//   {
//     day: 31,
//     month: 8,
//     year: 2023,
//     events: [
//       {
//         title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
//         time: "10:00 AM",
//       },
//       {
//         title: "Event 2",
//         time: "11:00 AM",
//       },
//     ],
//   },
// ];

var eventsArr = [];

console.log(eventsArr);

//function to add days in days with class day and prev-date next-date on previous month and next month days and active on today
function initCalendar() {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const prevLastDay = new Date(year, month, 0);
  const prevDays = prevLastDay.getDate();
  const lastDate = lastDay.getDate();
  const day = firstDay.getDay();
  const nextDays = 7 - lastDay.getDay() - 1;

  date.innerHTML = months[month] + " " + year;

  let days = "";

  for (let x = day; x > 0; x--) {
    days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDate; i++) {
    //check if event is present on that day
    let event = false;
    eventsArr.forEach((eventObj) => {
      if (
        eventObj.day === i &&
        eventObj.month === month + 1 &&
        eventObj.year === year
      ) {
        event = true;
      }
    });
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      activeDay = i;
      getActiveDay(i);
      updateEvents(i);
      if (event) {
        days += `<div class="day today active event">${i}</div>`;
      } else {
        days += `<div class="day today active">${i}</div>`;
      }
    } else {
      if (event) {
        days += `<div class="day event">${i}</div>`;
      } else {
        days += `<div class="day ">${i}</div>`;
      }
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="day next-date">${j}</div>`;
  }
  daysContainer.innerHTML = days;
  addListner();
}

//function to add month and year on prev and next button
function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  initCalendar();
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//function to add active on day
function addListner() {
  const days = document.querySelectorAll(".day");
  days.forEach((day) => {
    day.addEventListener("click", (e) => {
      getActiveDay(e.target.innerHTML);
      updateEvents(Number(e.target.innerHTML));
      activeDay = Number(e.target.innerHTML);
      //remove active
      days.forEach((day) => {
        day.classList.remove("active");
      });
      //if clicked prev-date or next-date switch to that month
      if (e.target.classList.contains("prev-date")) {
        prevMonth();
        //add active to clicked day afte month is change
        setTimeout(() => {
          //add active where no prev-date or next-date
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("prev-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else if (e.target.classList.contains("next-date")) {
        nextMonth();
        //add active to clicked day afte month is changed
        setTimeout(() => {
          const days = document.querySelectorAll(".day");
          days.forEach((day) => {
            if (
              !day.classList.contains("next-date") &&
              day.innerHTML === e.target.innerHTML
            ) {
              day.classList.add("active");
            }
          });
        }, 100);
      } else {
        e.target.classList.add("active");
      }
    });
  });
}

todayBtn.addEventListener("click", () => {
  today = new Date();
  month = today.getMonth();
  year = today.getFullYear();
  initCalendar();
});

dateInput.addEventListener("input", (e) => {
  dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
  if (dateInput.value.length === 2) {
    dateInput.value += "/";
  }
  if (dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0, 7);
  }
  if (e.inputType === "deleteContentBackward") {
    if (dateInput.value.length === 3) {
      dateInput.value = dateInput.value.slice(0, 2);
    }
  }
});

gotoBtn.addEventListener("click", gotoDate);

function gotoDate() {
  console.log("here");
  const dateArr = dateInput.value.split("/");
  if (dateArr.length === 2) {
    if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
      month = dateArr[0] - 1;
      year = dateArr[1];
      initCalendar();
      return;
    }
  }
  alert("Invalid Date");
}

//function get active day day name and date and update eventday eventdate
function getActiveDay(date) {
  const day = new Date(year, month, date);
  const dayName = day.toString().split(" ")[0];
  eventDay.innerHTML = dayName;
  eventDate.innerHTML = date + " " + months[month] + " " + year;
}

//schedule page - event adding
function addEvents(){

  let wastedd = document.getElementById("wroles");
  let brngy = document.getElementById("brnroles");
  let months = month + 1;

  let dt = months + "_" + activeDay + "_"  + year;
 
  console.log(activeDay)
  //var schedule = month + "_" + day + "_" + year;

  var wastepick = wastedd.options[wastedd.selectedIndex].text;
  var brngypick = brngy.options[brngy.selectedIndex].text;
  var eventStart = document.getElementById("start").value;
  var eventEnd = document.getElementById("finish").value;

  firebase.database().ref('Garbage Collection Schedule').once('value', function(snapshot){
      var x = snapshot.val();
      console.log("x value: "+x)
      var dataref = snapshot.ref;
      //var ref = dataref.child(dt);
      var ref = dataref.push();
      ref.set({
        brgytext: brngypick,
        datetext: months+"/"+activeDay+"/"+year,
        dwastetype: wastepick,
        starttime: eventStart,
        timetext: eventEnd
      })
      alert("Schedule Sent")
      //notifyUsers();


      
        location.reload();
      
      return
    })
}

//function update events when a day is active
function updateEvents(date) {
  let events = "";
  let dt = month + 1 + "/" + date + "/" + year;
  let ref = firebase.database().ref('Garbage Collection Schedule');

  ref.once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      if (dt === childSnapshot.child('datetext').val()) {
        events += `<div class="event" data-key="${childSnapshot.key}" data-date="${dt}">
            <div class="event-time">
                <i class="fas fa-circle"></i>
                <h3 class="event-title">${childSnapshot.val().starttime}</h3>
                <span class="event-time">${childSnapshot.val().timetext}</span>
            </div>
            <div class="add-event-input">${childSnapshot.val().dwastetype}</div>
            <button class="edit-event">Edit</button>
            <button class="delete-event">Delete</button>
          </div>`;
      }
    });

    if (events === "") {
      events = `<div class="no-event">
            <h3>No Events</h3>
        </div>`;
    }

    eventsContainer.innerHTML = events;
    // Add event listeners for delete and edit buttons
    addEventListeners();
  });
}


// Function to add event listeners
// Add event listeners for dynamically added delete and edit buttons
// Add event listeners for dynamically added delete and edit buttons
function addEventListeners() {
  document.querySelectorAll(".delete-event").forEach((btn) => {
    btn.addEventListener("click", handleDeleteEvent);
  });

  document.querySelectorAll(".edit-event").forEach((btn) => {
    btn.addEventListener("click", handleEditEvent);
  });
}

// Function to handle event deletion
function handleDeleteEvent(e) {
  const eventElement = e.target.closest(".event");
  // Implement event deletion logic here
}

// Function to handle event editing
function handleEditEvent(e) {
  const eventElement = e.target.closest(".event");
  // Implement event editing logic here
}

// Event delegation for dynamically added event buttons
document.querySelector(".events").addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-event")) {
    handleDeleteEvent(e);
  } else if (e.target.classList.contains("edit-event")) {
    handleEditEvent(e);
  }
});

function defineProperty() {
  var osccred = document.createElement("div");
  osccred.style.position = "absolute";
  osccred.style.bottom = "0";
  osccred.style.right = "0";
  osccred.style.fontSize = "10px";
  osccred.style.color = "#ccc";
  osccred.style.fontFamily = "sans-serif";
  osccred.style.padding = "5px";
  osccred.style.background = "#fff";
  osccred.style.borderTopLeftRadius = "5px";
  osccred.style.borderBottomRightRadius = "5px";
  osccred.style.boxShadow = "0 0 5px #ccc";
  document.body.appendChild(osccred);
}

defineProperty();

//allow only time in eventtime from and to
addEventFrom.addEventListener("input", (e) => {
  addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
  if (addEventFrom.value.length === 2) {
    addEventFrom.value += ":";
  }
  if (addEventFrom.value.length > 5) {
    addEventFrom.value = addEventFrom.value.slice(0, 5);
  }
});

addEventTo.addEventListener("input", (e) => {
  addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
  if (addEventTo.value.length === 2) {
    addEventTo.value += ":";
  }
  if (addEventTo.value.length > 5) {
    addEventTo.value = addEventTo.value.slice(0, 5);
  }
});

//function to add event to eventsArr
addEventSubmit.addEventListener("click", () => {
  const eventTitle = addEventTitle.value;
  const eventTimeFrom = addEventFrom.value;
  const eventTimeTo = addEventTo.value;
  if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
    alert("Please fill all the fields");
    return;
  }

  //check correct time format 24 hour
  const timeFromArr = eventTimeFrom.split(":");
  const timeToArr = eventTimeTo.split(":");
  if (
    timeFromArr.length !== 2 ||
    timeToArr.length !== 2 ||
    timeFromArr[0] > 23 ||
    timeFromArr[1] > 59 ||
    timeToArr[0] > 23 ||
    timeToArr[1] > 59
  ) {
    alert("Invalid Time Format");
    return;
  }

  const timeFrom = convertTime(eventTimeFrom);
  const timeTo = convertTime(eventTimeTo);

  //check if event is already added
  let eventExist = false;
  eventsArr.forEach((event) => {
    if (
      event.day === activeDay &&
      event.month === month + 1 &&
      event.year === year
    ) {
      event.events.forEach((event) => {
        if (event.title === eventTitle) {
          eventExist = true;
        }
      });
    }
  });
  if (eventExist) {
    alert("Event already added");
    return;
  }
  const newEvent = {
    title: eventTitle,
    time: timeFrom + " - " + timeTo,
  };
  console.log(newEvent);
  console.log(activeDay);
  let eventAdded = false;
  if (eventsArr.length > 0) {
    eventsArr.forEach((item) => {
      if (
        item.day === activeDay &&
        item.month === month + 1 &&
        item.year === year
      ) {
        item.events.push(newEvent);
        eventAdded = true;
      }
    });
  }

  if (!eventAdded) {
    eventsArr.push({
      day: activeDay,
      month: month + 1,
      year: year,
      events: [newEvent],
    });
  }

  console.log(eventsArr);
  addEventWrapper.classList.remove("active");
  addEventTitle.value = "";
  addEventFrom.value = "";
  addEventTo.value = "";
  updateEvents(activeDay);
  //select active day and add event class if not added
  const activeDayEl = document.querySelector(".day.active");
  if (!activeDayEl.classList.contains("event")) {
    activeDayEl.classList.add("event");
  }
});

// Event delegation for dynamically added event buttons
eventsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-event")) {
    const eventElement = e.target.closest(".event");
    const eventDate = eventElement.dataset.date;
    const eventTitle = eventElement.querySelector(".event-title").innerText;
    
    // Ask for confirmation before deleting the event
    if (confirm("Are you sure you want to delete this event?")) {
      // Proceed with deletion if confirmed
      firebase.database().ref('Garbage Collection Schedule').once('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
          if (childSnapshot.val().datetext === eventDate && childSnapshot.val().starttime === eventTitle) {
            childSnapshot.ref.remove()
              .then(function() {
                alert("Event deleted successfully");
                updateEvents(activeDay);
              })
              .catch(function(error) {
                console.error("Error deleting event: ", error);
                alert("An error occurred while deleting the event");
              });
          }
        });
      });
    }
  } else if (e.target.classList.contains("edit-event")) {
    const eventElement = e.target.closest(".event");
    const eventDate = eventElement.dataset.date;
    const eventTitle = eventElement.querySelector(".event-title").innerText;
    
    // Ask for confirmation before editing the event
    if (confirm("Are you sure you want to edit this event?")) {
      // Proceed with editing if confirmed
      editEvent(activeDay, month + 1, year, eventTitle);
    }
  }
});

// Function to delete an event
function deleteEvent(day, month, year, title) {
  if (confirm("Are you sure you want to delete this event?")) {
    firebase.database().ref('Garbage Collection Schedule').once('value', function(snapshot){
      snapshot.forEach(function(childSnapshot){
        const eventDate = childSnapshot.val().datetext;
        const eventTitle = childSnapshot.val().starttime + " - " + childSnapshot.val().timetext;
        if (eventDate === `${month}/${day}/${year}` && eventTitle === title) {
          childSnapshot.ref.remove()
            .then(function() {
              alert("Event deleted successfully");
              updateEvents(day);
            })
            .catch(function(error) {
              console.error("Error deleting event: ", error);
              alert("An error occurred while deleting the event");
            });
        }
      });
    });
  }
}

// Function to edit an event
function editEvent(day, month, year, title) {
  const newTitle = prompt("Enter new title:");
  const newTimeFrom = prompt("Enter new start time:");
  const newTimeTo = prompt("Enter new end time:");
  if (newTitle !== null && newTimeFrom !== null && newTimeTo !== null) {
    // Check if the user clicked Cancel
    if (newTitle.trim() !== "" && newTimeFrom.trim() !== "" && newTimeTo.trim() !== "") {
      firebase.database().ref('Garbage Collection Schedule').once('value', function(snapshot){
        snapshot.forEach(function(childSnapshot){
          const eventDate = childSnapshot.val().datetext;
          const eventTitle = childSnapshot.val().starttime + " - " + childSnapshot.val().timetext;
          if (eventDate === `${month}/${day}/${year}` && eventTitle === title) {
            childSnapshot.ref.update({
              starttime: newTimeFrom,
              timetext: newTimeTo
            })
            .then(function() {
              alert("Event updated successfully");
              updateEvents(day);
            })
            .catch(function(error) {
              console.error("Error updating event: ", error);
              alert("An error occurred while updating the event");
            });
          }
        });
      });
    } else {
      alert("Title and time fields cannot be empty. Please try again.");
    }
  }
}




function convertTime(time) {
  let timeArr = time.split(":");
  let timeHour = parseInt(timeArr[0], 10);
  let timeMin = timeArr[1];
  let timeFormat = timeHour >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  timeHour = timeHour % 12 || 12;
  
  // Pad single-digit hour with leading zero
  timeHour = timeHour < 10 ? "0" + timeHour : timeHour;

  time = timeHour + ":" + timeMin + " " + timeFormat;
  return time;
}
