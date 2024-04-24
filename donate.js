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


//load grid
function loadDataGrid(){
  const col = document.querySelector('.wrapper')
  const appendChild = (title, desc, image) => {
    col.insertAdjacentHTML('beforeend', `
    <div class="row" onclick='showDetails("${title}")' style="margin: 15px;" > 
      <h3 style="background-color: white; text-align: center; margin: 10px; margin-bottom: -10px;">${title}</h3>
      <div class="col">
        <img src=${image} width: auto; max-height: auto;>
      </div>
    </div>
`)
  }
  
  firebase.database().ref("Donation D").once('value', function(snapshot){
    snapshot.forEach(function(snapper){
      const title = snapper.val().dataTitle;
      const desc = snapper.val().dataDesc;
      const image = snapper.val().dataImage;
      appendChild(title, desc, image);
    })
  })
  

}

//Show details when a data in list was clicked
function showDetails(titleDesc){
  console.log("show details")
  const colDetails = document.querySelector('.details')
  console.log(colDetails); 
  colDetails.innerHTML = '';
  const appendChild = (title, desc, image) => {
    colDetails.insertAdjacentHTML('beforeend', `
      <div class="rowDetails announce box" style="background-color: white; text-align: center; margin: 20px; border: 1px solid #ccc; border-radius: 8px; padding: 20px;"> 
        <h3 style="font-size: 24px; font-weight: bold; margin-bottom: 10px;">${title}</h3>
        <div class="col">
          <img src="${image}" style="width: 100%; max-height: 200px; object-fit: cover; border-radius: 8px;">
        </div>
        <p style="font-size: 18px; margin-top: 20px;">${desc}</p>
      </div>
    `);
  }
  
  
  firebase.database().ref("Donation D").once('value', function(snapshot) {
    snapshot.forEach(function(snapper) {
      const title = snapper.val().dataTitle;
      const desc = snapper.val().dataDesc;
      const image = snapper.val().dataImage;

      // Check if the title contains the ttile
      if (typeof title === 'string' && title.includes(titleDesc)) {
        appendChild(title, desc, image);
      }
    });
  });
}


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

