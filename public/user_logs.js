//ADD USER/ADMIN
const btn = document.getElementById('addBtn');

btn.addEventListener('click', ()=>{
        const form = document.getElementById('create_form');

        if (form.style.display === 'none') {
            // 👇️ this SHOWS the form
            form.style.display = 'block';
        } else {
            // 👇️ this HIDES the form
            form.style.display = 'none';
        }
    });


    function tbl() {
      let table = document.getElementById("userTable");
    
      // Fetching and displaying Users
      firebase.database().ref('Users').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var row = table.insertRow(-1);
          var cel1 = row.insertCell(0);
          var cel2 = row.insertCell(1);
          var cel3 = row.insertCell(2);
          var cel4 = row.insertCell(3);
          var cel5 = row.insertCell(4); // Cell for delete button
          
          cel1.innerHTML = childSnapshot.val().email;
          cel2.innerHTML = childSnapshot.val().splace;
          cel3.innerHTML = childSnapshot.val().sbrgy;
          cel4.innerHTML = "User";
          
          // Create delete button
          var deleteButton = document.createElement("button");
          deleteButton.innerHTML = "Delete";
          deleteButton.className = "deleteButton"; // Add class for styling
          deleteButton.onclick = function() {
            deletethis('Users', childSnapshot.key); // Pass the key of the user to be deleted
          };
          cel5.appendChild(deleteButton);
        });
      });
    
      // Fetching and displaying Admins
      firebase.database().ref('Admin').once('value', function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var row = table.insertRow(-1);
          var cel1 = row.insertCell(0);
          var cel2 = row.insertCell(1);
          var cel3 = row.insertCell(2);
          var cel4 = row.insertCell(3);
          var cel5 = row.insertCell(4); // Cell for delete button
          
          cel1.innerHTML = childSnapshot.val().email;
          cel2.innerHTML = childSnapshot.val().splace;
          cel3.innerHTML = childSnapshot.val().sbrgy;
          cel4.innerHTML = "Admin";
          
          // Create delete button
          var deleteButton = document.createElement("button");
          deleteButton.innerHTML = "Delete";
          deleteButton.className = "deleteButton"; // Add class for styling
          deleteButton.onclick = function() {
            deletethis('Admin', childSnapshot.key); // Pass the key of the admin to be deleted
          };
          cel5.appendChild(deleteButton);
        });
      });
    }
    

// Updated create function to get selected value from Barangay dropdown
function create() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let name = document.getElementById("name").value;
  let loc = document.getElementById("municipality");
  var selectedloc = loc.options[loc.selectedIndex].text;
  let brgy = document.getElementById("barangay");
  var selectedbrgy = brgy.options[brgy.selectedIndex].text;
  let role = document.getElementById("roles");
  var selectedrole = role.options[role.selectedIndex].text;
  let firebaseemail = email.replace(/\%/g, '%25')
    .replace(/\./g, '_')
    .replace(/\#/g, '_')
    .replace(/\$/g, '_')
    .replace(/\//g, '_')
    .replace(/\[/g, '_')
    .replace(/\]/g, '_');

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!');
    return; // Don't continue running the code
  } else {
    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
      if (selectedrole === "SuperAdmin") {
        alert("Super Admin created");
      } else {
        firebase.database().ref(selectedrole).once('value', function(snapshot){
          firebase.database().ref("/" + selectedrole +"/"+ firebaseemail).set({
            email: email,
            name: name,
            password: password,
            sbrgy: selectedbrgy,
            splace: selectedloc
          });
        });
        alert("Account created");
      }
      location.reload();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
  }
}

function deletethis(userType, userId) {
  var isConfirmed = confirm("Are you sure you want to delete this user/admin?");
  if (isConfirmed) {
    firebase.database().ref(userType + '/' + userId).remove()
      .then(function() {
        console.log("User/admin deleted successfully!");
        location.reload(); // Refresh the page after deletion
      })
      .catch(function(error) {
        console.error("Error deleting user/admin: ", error);
      });
  }
}

function encodeAsFirebaseKey(email) {
  return email.replace(/\%/g, '%25')
    .replace(/\./g, '_')
    .replace(/\#/g, '_')
    .replace(/\$/g, '_')
    .replace(/\//g, '_')
    .replace(/\[/g, '_')
    .replace(/\]/g, '_');
};

// Validate Functions
function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    if (password < 6) {
      return false
    } else {
      return true
    }
  }
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }
 

  function loadBarangays() {
    var municipalityDropdown = document.getElementById("municipality");
    var selectedMunicipalityIndex = municipalityDropdown.selectedIndex;
    var selectedMunicipality = municipalityDropdown.options[selectedMunicipalityIndex].text;
    console.log("Selected Municipality:", selectedMunicipality); // Log selected municipality
    
    var barangayDropdown = document.getElementById("barangay");
    barangayDropdown.innerHTML = "<option value='barangay'>Select Barangay</option>"; // Clear previous options
  
    // Define firebaseRef inside the function
    var firebaseRef = firebase.database().ref("Spinner Data / Municipalities /" + " "+selectedMunicipality);
  
    firebaseRef.once("value").then(function(snapshot) {
      console.log("Snapshot:", snapshot.val()); // Log snapshot data
      snapshot.forEach(function(childSnapshot) {
        var barangay = childSnapshot.val().barangay;
        var option = document.createElement("option");
        option.value = barangay;
        option.text = barangay;
        barangayDropdown.add(option);
      });
    }).catch(function(error) {
      console.error("Error loading barangays: " + error);
    });
  }
  
  

  
   