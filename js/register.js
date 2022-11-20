const password = document.querySelector("#password");
const rePassword = document.querySelector("#re-password");
const email = document.querySelector("#email");
const result = document.querySelector("p");
const formSubmitButton = document.querySelector("button");
const registerNode = document.querySelector("#registration");
const userDetailsNode = document.querySelector("#userDetails");
const error = document.querySelector("h5");

const firstName = document.querySelector("#fname");
const lastName = document.querySelector("#lname");
const dateOfBirth = document.querySelector("#dob");
const contactNumber = document.querySelector("#contactNumber");
const address = document.querySelector("#address");
const userProfileBtn = document.querySelector("#profileBtn");

const localEmail = window.localStorage.getItem("email");

$(document).ready(function () {
  if (localEmail != null) {
    window.location.assign("./profile.html");
  }

  rePassword.addEventListener("input", () => {
    if (password.value != rePassword.value) {
      result.innerText = "Password does not match";
      formSubmitButton.disabled = true;
    } else {
      result.innerText = "";
      formSubmitButton.disabled = false;
    }
  });

  $("#reg_form").submit(function (event) {
    event.preventDefault();

    var data = {
      email: email.value,
      password: rePassword.value,
    };

    $.ajax({
      type: "POST",
      url: "./php/register.php",
      data: data,
      encode: true,
    })
      .done(function (data) {
        if (data === "Registration success") {
          registerNode.remove();
          userDetailsNode.classList.remove("d-none");
          userDetailsNode.classList.add("d-block");
        } else if (data === "User exists already") {
          error.innerText = "User exists already";
        }
      })
      .fail(function (e) {
        alert("Error try again");
      });
  });

  $("#user_form").submit(function (event) {
    event.preventDefault();

    var userData = {
      email: email.value,
      fname: firstName.value,
      lname: lastName.value,
      dob: dateOfBirth.value,
      address: address.value,
      contactNumber: contactNumber.value,
    };

    $.ajax({
      type: "POST",
      url: "./php/profile.php",
      data: userData,
      encode: true,
    })
      .done(function (data) {
        if (data === "Success") {
          userProfileBtn.disabled = true;
          window.localStorage.setItem("email", email.value);
          Swal.fire({
            icon: "success",
            title: "Account created Successfully!",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.assign("./login.html");
        }
      })
      .fail(function (e) {
        alert("Error try again");
      });
  });
});
