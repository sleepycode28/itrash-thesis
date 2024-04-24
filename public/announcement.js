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

//announcement load grid
function announLoad(){
  const col = document.querySelector('.wrapper')
  const appendChild = (content) => {
    col.insertAdjacentHTML('beforeend', `
        <div class="col"> <img src=${content} width="auto" height="200"></div>
    `)
  }

  firebase.database().ref("Announcements").once('value', function(snapshot){
    snapshot.forEach(function(snapper){
            const column = snapper.val().imageURL;
            appendChild(column);
    })
  })

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



