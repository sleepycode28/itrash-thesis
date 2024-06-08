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

//GRID VIEW 
var wrapper = document.getElementById("wrapper");

document.addEventListener("click", function (event) {
  if (!event.target.matches(".list")) return;

  // List view
  event.preventDefault();
  wrapper.classList.add("list");
});

document.addEventListener("click", function (event) {
  if (!event.target.matches(".grid")) return;

  // List view
  event.preventDefault();
  wrapper.classList.remove("list");
});


// Function to load  data

function loadDataGrid() {
  const col = document.querySelector('.wrapper');
  col.classList.add("list"); // Ensure the list layout is applied
  const appendChild = (title, desc, image, key) => {
    col.insertAdjacentHTML('beforeend', `
      <div class="announcement-item" data-key="${key}">
        <h3>${title}</h3>
        <img src="${image}" alt="${title}">
        <p>${desc}</p>
        <button class="dbtn" onclick="deleteData('${key}')">Delete</button>
        <button class="ebtn" onclick="editData('${key}')">Edit</button>
    `);
  }
  
  firebase.database().ref("Donation D").once('value', function(snapshot) {
    snapshot.forEach(function(snapper) {
      const title = snapper.val().dataTitle;
      const desc = snapper.val().dataDesc;
      const image = snapper.val().dataImage;
      const key = snapper.key; // Get the unique key of the announcement

      appendChild(title, desc, image, key);
    });
  });
}



/*Show details when a data in list was clicked
function showDetails(key) {
  const detailsElement = document.querySelector(`.announcement-item[data-key="${key}"] .details`);
  if (detailsElement.classList.contains("show")) {
    detailsElement.classList.remove("show");
    detailsElement.innerHTML = ""; // Clear details when hiding
  } else {
    detailsElement.classList.add("show");
    // Load and display details here
    // You can fetch details from Firebase or use data already available
  }
}
  
  firebase.database().ref("Donation D").orderByChild("dataTitle").equalTo(titleDesc).once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      const title = childSnapshot.val().dataTitle;
      const desc = childSnapshot.val().dataDesc;
      const image = childSnapshot.val().dataImage;

      appendChild(title, desc, image);
    });
  });
*/



//file upload
function uploadData(){
  
  var file = document.getElementById("images").files[0];
  var itemname = document.getElementById("iTitle").value;
  var itemdesc = document.getElementById("idesc").value;
  var ref = firebase.storage().ref('/Donation Images/storage/emulated/0/Download/' + itemname);

  const metadata = {
         contentType: file.type
      };

ref.put(file, metadata)
.then(snapshot => {
    return ref.getDownloadURL()
    .then(url => {
      firebase.database().ref("Donation D").push({
        dataDesc: itemdesc,
        dataImage: url,
        dataTitle: itemname
      })
        alert("Data has been uploaded")
    })
    
})
.then(result =>{
  //add delay to let the notifyUsers() finished
  
    location.reload();
  
})
.catch(error => {
    alert("There has been an error " + error)
    return
  })
}

// Function to delete an announcement
function deleteData(key) {
  // Display a confirmation dialog
  const confirmDelete = confirm("Are you sure you want to delete this announcement?");
  
  // If the user confirms the deletion
  if (confirmDelete) {
    firebase.database().ref("Donation D").child(key).remove()
      .then(function() {
        alert("Data deleted successfully");
        location.reload(); // Refresh the page after deletion
      })
      .catch(function(error) {
        console.error("Error deleting data: ", error);
      });
  }
}


// Function to edit donation data
function editData(title) {
  const newTitle = prompt("Enter new title:");
  const newDesc = prompt("Enter new description:");
  if (newTitle !== null && newDesc !== null) { // Check if the user clicked Cancel
    if (newTitle.trim() !== "" && newDesc.trim() !== "") { // Check if the input fields are not empty
      firebase.database().ref("Donation D").orderByChild("dataTitle").equalTo(title).once("value", function(snapshot) {
        console.log("Snapshot:", snapshot.val()); // Debugging statement
        snapshot.forEach(function(childSnapshot) {
          console.log("Child snapshot:", childSnapshot.val()); // Debugging statement
          childSnapshot.ref.update({
            dataTitle: newTitle,
            dataDesc: newDesc
          });
        });
        alert("Data updated successfully");
        location.reload();
      });
    } else {
      alert("Title and description cannot be empty. Please try again.");
    }
  }
}
