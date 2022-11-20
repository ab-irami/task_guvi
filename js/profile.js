const userData = document.querySelector("#getUser");
const userFullName = document.querySelector("#name");
const mail = document.querySelector("#mail");
const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const dob = document.querySelector("#dob");
const address = document.querySelector("#address");
const phoneNumber = document.querySelector("#contactNumber");
const logOut = document.querySelector("#logOut");
const error = document.querySelector("#error");
const updateBtn = document.querySelector("#update");
const formControl = document.querySelector(".form-control");

const localEmail = window.localStorage.getItem("email");

let getUserData;

$(document).ready(function () {
  if (localEmail == null) {
    window.location.assign("./login.html");
  }

  $.ajax({
    type: "GET",
    url: "./php/profile.php",
    data: {
      email: localEmail,
    },
  })
    .done(function (data) {
      getUserData = JSON.parse(data);
      userFullName.innerText = `${getUserData.firstName} ${getUserData.lastName}`;
      mail.innerText = getUserData.email;
      fname.value = getUserData.firstName;
      lname.value = getUserData.lastName;
      dob.value = getUserData.dob;
      phoneNumber.value = getUserData.contact_number;
      address.value = getUserData.address;
    })
    .fail(function (e) {
      alert("Error try again");
    });

  formControl.addEventListener("click", function () {
    formControl.readOnly = false;
    updateBtn.disabled = false;
  });

  updateBtn.addEventListener("click", function () {
    $.ajax({
      type: "PUT",
      url: "./php/profile.php",
      data: {
        email: mail.innerText,
        firstName: fname.value,
        lastName: lname.value,
        dob: dob.value,
        contactNumber: phoneNumber.value,
        address: address.value,
      },
    }).done(function (data) {
      if (data == "Success") {
        Swal.fire({
          icon: "success",
          title: "Your Profile update was successful",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  });

  logOut.addEventListener("click", function () {
    Swal.fire({
      title: "Are you sure?",
      text: "To log out",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#82CD47",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "Successfully logged out",
          showConfirmButton: false,
          timer: 1500,
        });
        window.localStorage.clear();
        window.location.assign("./");
      }
    });
  });
});
