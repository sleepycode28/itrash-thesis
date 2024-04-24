document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById('addBtn');
  const form = document.getElementById('create_form');

  btn.addEventListener('click', () => {
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
  });

  // Load municipalities for user roles
  loadMunicipalitiesForUserRoles();

  // Event listener for municipality dropdown change
  document.getElementById("municipality").addEventListener("change", function () {
    loadBarangaysForUserRoles();
  });

  function loadBarangaysForUserRoles() {
    const selectedMunicipality = document.getElementById("municipality").value;
    const barangayDropdown = document.getElementById("barangay");

    // Clear existing options
    barangayDropdown.innerHTML = '<option value="barangay">Select Barangay</option>';

    // Load barangays based on the selected municipality
    if (selectedMunicipality !== "muni") {
      firebase.database().ref("Spinner Data / Municipalities /" +selectedMunicipality).once('value', function (snapshot) {
        if (snapshot.exists()) {
          snapshot.forEach(function (childSnapshot) {
            var option = document.createElement("option");
            option.value = childSnapshot.val().barangay;
            option.text = childSnapshot.val().barangay;
            barangayDropdown.appendChild(option);
          });
        } else {
          console.log("No data found for barangays in " + selectedMunicipality + " for user roles.");
        }
      });
    }
  }

  
});