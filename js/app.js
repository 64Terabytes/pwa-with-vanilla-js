// Variables
const container = document.querySelector(".container");
var x = document.getElementById("MyAudio");
x.loop = true;
var SongLength = 999;
var CurrentHour = 999;

// x.addEventListener("ended", function(){
//      x.currentTime = 0;
//      console.log("ended");
//      StartApp();
// });

x.onloadedmetadata = function() {
    console.log("duration = " + x.duration);
    // Check the songs length and set timeout
    SongLength = x.duration * 1000;
    setTimeout(StartApp,SongLength);
}

// Plays the song
function Playsong(file) {
    x.src=file;
    x.play();
}

function StartApp() {
    var objDate = new Date();
    var hours = objDate.getHours();
    console.log(hours);
    if(CurrentHour == hours) {
        console.log("Hour hasn't changed, restarting timeout.");
        console.log(SongLength);
        setTimeout(StartApp,SongLength);
        return;
    }
    else {
        console.log("Hour changed, changing songs.");
        CurrentHour = hours;
    }
    var FileName = "";
    if(hours <= 12) {
        FileName = hours + " AM.mp3";
    }
    else {
        FileName = (hours - 12) + " PM.mp3";
    }
    console.log(FileName);
    Playsong("/audio/" + FileName);
}


// document.addEventListener("DOMContentLoaded", StartApp);
// document.getElementById("NewLeafArt").onclick(StartApp);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err));
  });
}
