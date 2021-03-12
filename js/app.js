const container = document.querySelector(".container");
var x = document.createElement("AUDIO");

function Playsong(file) {
    x.src=file;
    x.play();
}
function StartApp() {
    var objDate = new Date();
    var hours = objDate.getHours();
    console.log(hours);
    Playsong("/audio/1 AM.mp3");
}


// document.addEventListener("DOMContentLoaded", StartApp);
document.querySelector("#NewLeafArt").onclick(StartApp);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
