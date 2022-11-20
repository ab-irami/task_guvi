const password = document.querySelector("#password");
const email = document.querySelector("#email");
const error = document.querySelector("h5");

const localEmail = window.localStorage.getItem("email");

$(document).ready(function () {
  if (localEmail != null) {
    window.location.assign("./profile.html");
  }

  $("form").submit(function (event) {
    event.preventDefault();

    var data = {
      email: email.value,
      password: password.value,
    };

    $.ajax({
      type: "POST",
      url: "./php/login.php",
      data: data,
      encode: true,
    })
      .done(function (data) {
        if (data === "Logged in!") {
          window.localStorage.setItem("email", email.value);
          Swal.fire({
            icon: "success",
            title: "Successfully Loggedin!",
            showConfirmButton: false,
            timer: 1500,
          });
          window.location.assign("./profile.html");
        } else if (data === "Incorrect Password") {
          error.innerText = "Incorrect password";
        } else if (data == "Unauthenticated User") {
          error.innerText = "Account not created yet. Create one";
        } else {
          error.innerText = "";
        }
      })
      .fail(function (e) {
        alert("Error try again");
      });
  });
});
