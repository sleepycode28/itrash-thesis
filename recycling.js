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
  const appendChild = (title, image) => {
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
      const title = snapper.val().caption;
      const image = snapper.val().imageURL;
      appendChild(title, image);
    })
  })

}


//file upload
function uploadData(refDatabase, storagePath, iTitle, images){
    console.log(refDatabase + ' ' + storagePath)
    console.log(iTitle)
  
  var file = document.getElementById(images).files[0];
  var itemname = document.getElementById(iTitle).value;
  var ref = firebase.storage().ref(storagePath + itemname);

  const metadata = {
         contentType: file.type
      };

ref.put(file, metadata)
.then(snapshot => {
    return ref.getDownloadURL()
    .then(url => {
      firebase.database().ref(refDatabase).push({
        caption: itemname,
        imageURL: url
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






















//PAPER BUTTON
//Im confused kapag hindi biodegradable nilagay ko nababliw ui
//same case sa 2 sa baba
const papContainer = document.querySelector('#biodegradable');
let paClicked = true;

let papershowhide = function(){
    if(paClicked){
        papContainer.style.display ='block';
        paClicked=false;

        // hide other div
        plasContainer.style.display ='none';
        glasContainer.style.display ='none';
        glClicked=true;
        plClicked=true;
    }else{
        papContainer.style.display ='none';
        paClicked=true;
    }
}

//PLASTIC BUTTON
//Same case sa una
const plasContainer = document.querySelector('#recycling');
let plClicked = true;

let plasshoworHide = function(){
    if(plClicked){
        plasContainer.style.display ='block';
        plClicked=false;

        // hide other div
        papContainer.style.display ='none';
        paClicked=true;
        glasContainer.style.display ='none';
        glClicked=true;
    }else{
        plasContainer.style.display ='none';
        plClicked=true;
    }
}

//GLASS  BUTTON
//Same case sa una
const glasContainer = document.querySelector('#residual');
let glClicked = true;

let glasshoworHide = function(){
    if(glClicked){
        glasContainer.style.display ='block';
        glClicked=false;

        // hide other div
        papContainer.style.display ='none';
        paClicked=true;
        plasContainer.style.display ='none';
        plClicked=true;
    }else{
        glasContainer.style.display ='none';
        glClicked=true;
    }
}