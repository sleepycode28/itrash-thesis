var firebaseConfig = {
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
 
 
  function reports() {
    let table = document.getElementById("feedTable");

    // Clear the table first
    table.innerHTML = "<tr><th><b><i>Suggestion | Feedback</i></b></th><th>Date</th><th>Time</th><th>Action</th><th>Status</th></tr>";

    firebase.database().ref("Suggestion|Feedback").once('value', function(snapshot) {
        snapshot.forEach(function(ChildSnapshot) {
            var row = table.insertRow(-1);
            var cel1 = row.insertCell(0); // Cell for Suggestion
            var cel2 = row.insertCell(1); // Cell for Date
            var cel3 = row.insertCell(2); // Cell for Time
            var cel4 = row.insertCell(3); // Cell for Action
            var cel5 = row.insertCell(4); // Cell for Status

            cel1.innerHTML = ChildSnapshot.val().suggestions;
            cel2.innerHTML = ChildSnapshot.val().date;
            cel3.innerHTML = ChildSnapshot.val().time;
            cel5.innerHTML = ChildSnapshot.val().status || ""; // Display status or empty string if not present

            // Add buttons for action
            var doneButton = document.createElement("button");
            doneButton.textContent = "Done";
            doneButton.classList.add("action-button");
            doneButton.style.backgroundColor = "green";
            doneButton.onclick = function() {
                // Perform action for Done
                doneButton.disabled = true;
                cel5.innerHTML = "Done";
                cel5.style.color = "green";

                // Update status in Firebase
                var key = ChildSnapshot.key;
                firebase.database().ref("Suggestion|Feedback/" + key).update({ status: "Done" });
            };
            cel4.appendChild(doneButton);

            var ongoingButton = document.createElement("button");
            ongoingButton.textContent = "Ongoing";
            ongoingButton.classList.add("action-button");
            ongoingButton.style.backgroundColor = "orange";
            ongoingButton.onclick = function() {
                // Perform action for Ongoing
                ongoingButton.disabled = true;
                cel5.innerHTML = "Ongoing";
                cel5.style.color = "orange";

                // Update status in Firebase
                var key = ChildSnapshot.key;
                firebase.database().ref("Suggestion|Feedback/" + key).update({ status: "Ongoing" });
            };
            cel4.appendChild(ongoingButton);

            var deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("action-button");
            deleteButton.style.backgroundColor = "red";
            deleteButton.onclick = function() {
                // Confirmation alert before deletion
                var confirmation = confirm("Are you sure you want to delete this item?");
                if (confirmation) {
                    // Delete the data from Firebase
                    var key = ChildSnapshot.key;
                    firebase.database().ref("Suggestion|Feedback/" + key).remove()
                        .then(function() {
                            // Refresh the table after deletion
                            reports();
                        })
                        .catch(function(error) {
                            console.error("Error removing document: ", error);
                        });
                }
            };
            cel4.appendChild(deleteButton);
        })
    })
}
