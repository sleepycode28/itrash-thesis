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





//file upload
function announce(){
  
  var file = document.getElementById("images").files[0];
  var itemname = document.getElementById("iTitle").value;
  var ref = firebase.storage().ref('/AnnouncementImg/' + itemname);

  const metadata = {
         contentType: file.type
      };

ref.put(file, metadata)
.then(snapshot => {
    return ref.getDownloadURL()
    .then(url => {
      firebase.database().ref("Announcements").push({
        caption: itemname,
        imageURL: url
      })
        alert("Image has been uploaded")
        // notifyUsers(url, itemname);
        notifyUsers(url, itemname);
        
    });
    
})
.then(result =>{
  //add delay to let the notifyUsers() finished
  setTimeout(() => {
    location.reload();
  }, 3000);
})
.catch(error => {
    alert("There has been an error " + error)
    return
  })
}
// Function to dynamically generate announcement items
function appendChild(content, key) {
  const col = document.createElement('div');
  col.classList.add('col');

  const img = document.createElement('img');
  img.src = content;
  img.width = 'auto';
  img.height = '200';
  col.appendChild(img);

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.onclick = function() {
    deleteAnnouncement(key);
  };
  col.appendChild(deleteBtn);

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.onclick = function() {
    editAnnouncement(key);
  };
  col.appendChild(editBtn);

  document.getElementById('wrapper').appendChild(col);
}

// Function to load announcements
function announLoad(){
  // Clear existing content of the wrapper
  document.getElementById('wrapper').innerHTML = '';

  firebase.database().ref("Announcements").once('value', function(snapshot){
    snapshot.forEach(function(snapper){
      const key = snapper.key;
      const column = snapper.val().imageURL;
      appendChild(column, key);
    });
  });
}


// Function to delete an announcement
function deleteAnnouncement(key) {
  // Display confirmation dialog
  if (confirm("Are you sure you want to delete this announcement?")) {
    // User confirmed, proceed with deletion
    firebase.database().ref("Announcements").child(key).remove()
      .then(function() {
        alert("Announcement deleted successfully");
        location.reload();
      })
      .catch(function(error) {
        console.error("Error deleting announcement: ", error);
      });
  } else {
    // User canceled, do nothing
    return;
  }
}


// Function to edit an announcement
function editAnnouncement(key) {
  const newCaption = prompt("Enter new caption:");
  if (newCaption) {
    const newImageInput = document.createElement('input');
    newImageInput.type = 'file';
    newImageInput.accept = 'image/*';
    newImageInput.onchange = function(event) {
      const file = event.target.files[0];
      if (file) {
        const ref = firebase.storage().ref('/AnnouncementImg/' + file.name);
        const metadata = {
          contentType: file.type
        };
        ref.put(file, metadata)
          .then(snapshot => {
            return ref.getDownloadURL();
          })
          .then(url => {
            firebase.database().ref("Announcements").child(key).update({
              caption: newCaption,
              imageURL: url
            })
              .then(function() {
                alert("Announcement updated successfully");
                location.reload();
              })
              .catch(function(error) {
                console.error("Error updating announcement: ", error);
              });
          })
          .catch(error => {
            console.error("Error uploading image: ", error);
          });
      }
    };
    newImageInput.click();
  }
}



//Notify user using fcm topic
function notifyUsers(url, body){
    alert("notify user")
    console.log(url);
    console.log(body);
  $.ajax({
    type: 'POST',
    url: 'https://fcm.googleapis.com/fcm/send',
    headers:{
      Authorization: 'key=AAAAVU4qW5k:APA91bFPB8YhW48tOJnun5cDy0bkqxXyGTgKniOG4Wn_8FF1d5XVBlnI6rUvj-nH6RjF71QzVct4gaMUSemho3ooQBTwZL6R1-zkommjSisEcJD5MLxAOHjEHyQ5NJHbak9BGoUpXPl-'
    },
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
        "to": "/topics/Announcements",
        "priority": "high",
        "notification": {
          "title": "Announcement",
          "body": body,
          "image": url
        }
    }),
    success: function (response) {
      alert("Message sent successfully. Message ID: " + response.message_id);
    },
    error: function (xhr, status, error) {
      alert("Error sending FCM message. Status: " + status + ", Error: " + error);
    }
  });
} 
