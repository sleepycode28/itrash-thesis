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


const col = document.querySelector('.wrapper')
//load grid
function loadDataGrid(refDatabase){
col.innerHTML = ''; // Clear previous content
const appendChild = (title, desc, image) => {
  col.insertAdjacentHTML('beforeend', `
  <div class="row"> 
    <h3 style="background-color: white; text-align: center; margin: 10px; margin-bottom: -10px;">${title}</h3>
    <div class="col">
      <img src=${image} width="auto" height="200">
    </div>
  </div>
`)
}

firebase.database().ref(refDatabase).once('value', function(snapshot){
  snapshot.forEach(function(snapper){
    const title = snapper.val().dataTitle;
    const desc = snapper.val().dataDesc;
    const image = snapper.val().dataImage;
    appendChild(title, desc, image);
  })
})

}


//file upload
function uploadData(refDatabase, storagePath, iTitle, idesc, images){
  console.log(refDatabase + ' ' + storagePath)
  console.log(iTitle + ' ' + idesc)

var file = document.getElementById(images).files[0];
var itemname = document.getElementById(iTitle).value;
var itemdesc = document.getElementById(idesc).value;
var ref = firebase.storage().ref(storagePath + itemname);

const metadata = {
       contentType: file.type
    };

ref.put(file, metadata)
.then(snapshot => {
  return ref.getDownloadURL()
  .then(url => {
    firebase.database().ref(refDatabase).push({
      dataDesc: itemdesc,
      dataImage: url,
      dataTitle: itemname
    })
      alert("Data has been uploaded")
  })
  
})
.then(result =>{
      location.reload();
})
.catch(error => {
  alert("There has been an error " + error)
  return
})
}


//BIODEGRADABLE BUTTON
const divContainer = document.querySelector('#biodegradable');
let isClicked = true;

let showorHide = function(){
  if(isClicked){
      divContainer.style.display ='block';
      isClicked=false;

      // hide other div
      divContainer1.style.display ='none';
      divContainer2.style.display ='none';
      divContainer3.style.display ='none';
      issClicked=true;
      isssClicked=true;
      isClicked1=true;
  }else{
      divContainer.style.display ='none';
      isClicked=true;
      
      setTimeout(() => {
          location.reload();
      }, 100);
  }
}

//RECYCLING BUTTON
const divContainer1 = document.querySelector('#recycling');
let issClicked = true;

let recshoworHide = function(){
  if(issClicked){
      divContainer1.style.display ='block';
      issClicked=false;

      // hide other div
      divContainer.style.display ='none';
      divContainer2.style.display ='none';
      divContainer3.style.display ='none';
      isClicked=true;
      isssClicked=true;
      isClicked1=true;
  }else{
      divContainer1.style.display ='none';
      issClicked=true;
      setTimeout(() => {
          location.reload();
      }, 100);
  }
}

//RESIDUAL BUTTON
const divContainer2 = document.querySelector('#residual');
let isssClicked = true;

let resshoworHide = function(){
  if(isssClicked){
      divContainer2.style.display ='block';
      isssClicked=false;

      // hide other div
      divContainer.style.display ='none';
      divContainer1.style.display ='none';
      divContainer3.style.display ='none';
      issClicked=true;
      isClicked=true;
      isClicked1=true;
  }else{
      divContainer2.style.display ='none';
      isssClicked=true;
      setTimeout(() => {
          location.reload();
      }, 100);
  }
}
//SPECIAL BUTTON
const divContainer3 = document.querySelector('#special');
let isClicked1 = true;

let specshoworHide = function(){
  if(isClicked1){
      divContainer3.style.display ='block';
      isClicked1=false;

      // hide other div
      divContainer.style.display ='none';
      divContainer1.style.display ='none';
      divContainer2.style.display ='none';
      issClicked=true;
      isClicked=true;
      isssClicked=true;
  }else{
      divContainer3.style.display ='none';
      isClicked1=true;
      setTimeout(() => {
          location.reload();
      }, 100);
  }
}





