// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var  firebaseConfig = {
  apiKey: "AIzaSyCW_CS4Cqm5IK_v6UDqIuQn6SLWnQ1nqBo",
  authDomain: "itrash-waste-management.firebaseapp.com",
  databaseURL: "https://itrash-waste-management-default-rtdb.firebaseio.com",
  projectId: "itrash-waste-management",
  storageBucket: "itrash-waste-management.appspot.com",
  messagingSenderId: "366383618969",
  appId: "1:366383618969:web:f94399f5ef9d82add7d108",
  measurementId: "G-E7KW2CSHPN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();



document.addEventListener("DOMContentLoaded", function() {
  // Add event listener to the login button
  document.querySelector('.login-button').addEventListener('click', login);
  
  // Call the function to set the profile details
  setProfileDetails();
});

// Define the login function
function login() {
  // Get all our input fields
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // Validate input fields
  if (!validate_email(email) || !validate_password(password)) {
      alert('Email or Password is invalid!');
      return;
  }

  // Attempt to sign in
  auth.signInWithEmailAndPassword(email, password)
      .then(function() {
          // Declare user variable
          var user = auth.currentUser;
          // Done
          alert('User Logged In');
          window.location.href = "main.html";
      })
      .catch(function(error) {
          // Handle errors
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
      });
}

// Function to validate email
function validate_email(email) {
  var expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

// Function to validate password
function validate_password(password) {
  return password.length >= 6;
}

// Define the login function
function login() {
  // Get all our input fields
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // Validate input fields
  if (!validate_email(email) || !validate_password(password)) {
      alert('Email or Password is invalid!');
      return;
  }

  // Check if the user's email exists under the "Users" path
  firebase.database().ref("Users").orderByChild("email").equalTo(email).once('value', function(snapshot) {
      if (snapshot.exists()) {
          // If the user exists under the "Users" path, deny login
          alert('Access Denied. You do not belong here!.');
      } else {
          // Attempt to sign in
          auth.signInWithEmailAndPassword(email, password)
              .then(function() {
                  // Declare user variable
                  var user = auth.currentUser;
                  // Done
                  alert('User Logged In');
                  window.location.href = "main.html";
              })
              .catch(function(error) {
                  // Handle errors
                  var errorCode = error.code;
                  var errorMessage = error.message;
                  alert(errorMessage);
              });
      }
  });
}

// Function to validate email
function validate_email(email) {
  var expression = /^[^@]+@\w+(\.\w+)+\w$/;
  return expression.test(email);
}

// Function to validate password
function validate_password(password) {
  return password.length >= 6;
}


  

//Index.html Account Logs table
function uLogs(){
  window.setInterval(function(){
    //reloads page
    var date = new Date();
    if(date.getMinutes() === 0 || date.getMinutes() === 30){
      location.reload(); 
    }
  }, 60000);

  var table = document.getElementById("myTable");

  firebase.database().ref('Users').once('value', function(snapshot){
    snapshot.forEach(function(ChildSnapshot){
        var row = table.insertRow(-1);
        var cel1 = row.insertCell(0);
        var cel2 = row.insertCell(1);
        var cel3 = row.insertCell(2);
        var cel4 = row.insertCell(3);
       //var cel5 = row.insertCell(4)
        cel1.innerHTML =ChildSnapshot.val().name;
        cel2.innerHTML = ChildSnapshot.val().email;
        cel3.innerHTML = ChildSnapshot.val().splace;
        //cel4.innerHTML = ChildSnapshot.val().sbgry;
        cel4.innerHTML = ChildSnapshot.val().Time;
        

        //API();
    })
})
}

//schedule page - dropdowns
function dropdowns(){
  let wastedd = document.getElementById("wroles");
  let brngy = document.getElementById("brnroles");
  var fireref = firebase.database().ref('Spinner Data ');

  fireref.child(' Type of Waste Input').once('value', function(snapshot){
    snapshot.forEach(function(ChildSnapshot){
      let x = ChildSnapshot.val();
      var option = document.createElement("option");
      option.value = x;
      option.text = x;
      wastedd.add(option)

    })
  })

  fireref.child(' Barangay Input').once('value', function(snapshot){
    snapshot.forEach(function(ChildSnapshot){
      let x = ChildSnapshot.val();
      var option = document.createElement("option");
      option.value = x;
      option.text = x;
      brngy.add(option)
    })
  })
}

function calendars(){
  let eventsContainer = document.querySelector(".thisbox");
  let events = "";

  
  let ref = firebase.database().ref('Garbage Collection Schedule')
  //console.log(dt)

  ref.once('value', function(snapshot){
    snapshot.forEach(function(Childsnapshot){
      
        events += `<div class="event-time">
                <h3 class="event-title">${Childsnapshot.val().datetext}</h3>
                <span class="event-title">${Childsnapshot.val().starttime}</span> -
                <span class="event-time">${Childsnapshot.val().timetext}</span>
            </div>
            <div class="add-event-input">${Childsnapshot.val().dwastetype}</span>
              </div>
          <div class="add-event-input">${Childsnapshot.val().brgytext}</span>`;

  eventsContainer.innerHTML = events;
  
})
  })
}

function index(){
  let users = document.getElementById("usernmb")

  let usrref = firebase.database().ref("Users")
  usrref.once("value", function(snapshot){
    users.innerHTML = snapshot.numChildren();
  })

  let sched = document.getElementById("schd")  
  let schdref = firebase.database().ref("Garbage Collection Schedule")
  schdref.once("value", function(snapshot){
    sched.innerHTML = snapshot.numChildren();
  })

  let reports = document.getElementById("rprts")
  let repref = firebase.database().ref("Suggestion|Feedback")
  repref.once("value", function(snapshot){
    reports.innerHTML = snapshot.numChildren();
  })
}

function mncplDD(){
  let mnc = document.getElementById("municipality")
  let refmnc = firebase.database().ref('Spinner Data ')
  refmnc.child(" Municipality").once('value', function(snapshot){
    snapshot.forEach(function(Childsnapshot){
      let x = Childsnapshot.val();
      var option = document.createElement("option");
      option.value = x;
      option.text = x;
      mnc.add(option)
    })
  })
}

function reports(){
  let table = document.getElementById("feedTable")

  firebase.database().ref("Suggestion|Feedback").once('value', function(snapshot){
    snapshot.forEach(function(ChildSnapshot){
        var row = table.insertRow(-1);
        var cel1 = row.insertCell(0);
        // var cel2 = row.insertCell(1);
        // var cel3 = row.insertCell(2);
        cel1.innerHTML = ChildSnapshot.val().suggestions
    })
  })
}

//Add Setting load
function tbl() {
  // Reference to the table
  let table = document.getElementById("userTable");

  // Clear existing table content
  table.innerHTML = "<tr><th>Municipality</th><th>Barangay</th><th>Action</th></tr>";

  // Reference to the database
  let databaseRef = firebase.database().ref('Spinner Data / Municipalities ');

  // Fetch data from the database
  databaseRef.once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      // Get data from each child
      var municipality = childSnapshot.key;
      var barangays = childSnapshot.val();

      // Create a new row for each barangay under the municipality
      for (var barangayKey in barangays) {
        var barangay = barangays[barangayKey].barangay;
        var row = table.insertRow(-1);
        var cel1 = row.insertCell(0);
        var cel2 = row.insertCell(1);
        var cel3 = row.insertCell(2);

        // Populate the row with data
        cel1.innerHTML = municipality;
        cel2.innerHTML = barangay;
        
        // Create delete button
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button"); // Add the CSS class
        deleteButton.onclick = function() {
          // Confirmation dialog
          if (confirm("Are you sure you want to delete '" + barangay + "'?")) {
            // Handle delete functionality
            var dataRef = databaseRef.child(municipality).child(barangayKey);
            dataRef.remove()
              .then(function() {
                // Remove row from table
                row.remove();
                console.log("Remove succeeded.");
              })
              .catch(function(error) {
                console.log("Remove failed: " + error.message);
              });
          }
        };
        cel3.appendChild(deleteButton);
      }
    });
  });
}

function togglePasswordVisibility() {
  var passwordInput = document.getElementById("passwordInput");
  var togglePassword = document.getElementById("togglePassword");

  if (passwordInput.type === "password") {
      passwordInput.type = "text";
      togglePassword.innerHTML = '<i class="fa fa-eye-slash"></i>';
  } else {
      passwordInput.type = "password";
      togglePassword.innerHTML = '<i class="fa fa-eye"></i>';
  }
}
