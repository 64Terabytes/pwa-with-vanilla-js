const container = document.querySelector(".container");
var x = document.createElement("AUDIO");

function Playsong(file) {
    x.src=file;
    x.play();
}
function StartApp() {
    Playsong("/audio/1 AM.mp3");
}


document.addEventListener("DOMContentLoaded", StartApp);
document.querySelector("#NewLeafArt")

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
