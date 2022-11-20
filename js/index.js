const localEmail = window.localStorage.getItem("email");

console.log(localEmail);

$(document).ready(function () {
  if (localEmail != null) {
    window.location.assign("./profile.html");
  }
});
