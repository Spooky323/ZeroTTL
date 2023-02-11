
// -------------  FIREBASE ------------
// Initialize the FirebaseUI Widget using Firebase.
const firebaseConfig = {
    apiKey: "AIzaSyD4bmqBwnEphlkqsHhUS1ViM0s61UfD4oY",
    authDomain: "test22-6d29d.firebaseapp.com",
    databaseURL: "https://test22-6d29d-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "test22-6d29d",
    storageBucket: "test22-6d29d.appspot.com",
    messagingSenderId: "445953245581",
    appId: "1:445953245581:web:d00046d9742a1eb035fdc4"
  };

currentUser = {};
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();
const database = firebase.database();


if(localStorage.getItem('user') != null){
  console.log("test");
  const logout = document.createElement('a');
  logout.href = "#"
  logout.className = "nav-link";
  logout.innerHTML = "Sign out"
  logout.onclick = function(){Logout()}
  document.getElementById('loginbtn').replaceWith(logout);
}

function Logout(){
  firebase.auth().signOut().then(() => {
    localStorage.removeItem("user");
    window.location.replace("index.html");
  }).catch((error) => {
    console.log(error);
  })
}

CameraDict = {};
let objectDetector;
let status;
let objects = [];
let canvas, ctx;
const width = 550;
const height = 330;
let CurrentCamera;
let NavIndx = 1;

// Get Camera Elements
try{
  CameraDict["1"] = document.getElementById("camera1");
  CameraDict["2"] = document.getElementById("camera2");
  CameraDict["3"] = document.getElementById("camera3");
} catch(e){console.log("Failed To fetch Camera Display elment");}


// Fetch IPS from RTDB and Update IPs
var Cam1Ref = firebase.database().ref('/IOT/TelAviv/1/IP');
var Cam2Ref = firebase.database().ref('/IOT/TelAviv/2/IP');
var Cam3Ref = firebase.database().ref('/IOT/TelAviv/3/IP');
Cam1Ref.on('value', (snapshot) => {
  const data = snapshot.val();
  console.log("Changed Camera 1 IP to ",data);
  if (CameraDict){
    refreshImage(1,data);
  }
});
Cam2Ref.on('value', (snapshot) => {
  const data = snapshot.val();
  console.log("Changed Camera 2 IP to ",data);
  if (CameraDict) {
    refreshImage(2,data);
  }
});

// Cam3Ref.on('value', (snapshot) => {
//   console.log("Changed Camera 3 IP to ",data);
//   if (camera3) {
//     camera3.src = data
//   }
// });


function make() {
  CurrentCamera = CameraDict[NavIndx];
  objectDetector = ml5.objectDetector('cocossd', startDetecting)

  canvas = createCanvas(width, height);
  ctx = canvas.getContext('2d');
  
}

// when the dom is loaded, call make();
window.addEventListener('DOMContentLoaded', function () {
  make();
});

function startDetecting() {
  console.log('model ready')
  detect();
}

function detect() {
  objectDetector.detect(CurrentCamera, function (err, results) {
    if (err) {
      console.log(err);
    }
    objects = results;
    if (objects) {
      draw()
    }
    detect();
  });
}

function draw() {
  // Clear part of the canvas
  ctx.fillStyle = "#000000"
  ctx.fillRect(0, 0, width, height);

  ctx.drawImage(camera1, 0, 0);
  for (let i = 0; i < objects.length; i += 1) {

    ctx.font = "16px Arial";
    ctx.fillStyle = "green";
    ctx.fillText(objects[i].label, objects[i].x + 4, objects[i].y + 16);

    ctx.beginPath();
    ctx.rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    ctx.strokeStyle = "green";
    ctx.stroke();
    ctx.closePath();
  }
}
function createCanvas(w, h) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  document.getElementById('CameraDispalyDiv').appendChild(canvas);
  return canvas;
}

// --------- Buttons Nav ------- //
function MvNav(index){
  var change;
  if (index == 0){
    NavIndx--;
    MvNav(NavIndx);
    return;
  }
  if (index == 4){
    NavIndx++;
    MvNav(NavIndx);
    return;
  }
   if (index != 0 || index != 4){
    for (let i = 1; i <= 3; i++) {
      var nav = document.getElementById("nav-btn-"+i)
      nav.classList.remove('active');
      if(index == i){
        change = nav;
      }
    }
    change.classList.add("active")
  }
  switch (index){
    case 1:
      NavIndx = 1;
      document.getElementById('nav-btn-0').classList.add("disabled");
      document.getElementById('nav-btn-4').classList.remove("disabled");
      DisplayCamera(1)
      break;
    case 2:
      NavIndx = 2;
      document.getElementById('nav-btn-0').classList.remove("disabled");
      document.getElementById('nav-btn-4').classList.remove("disabled");
      DisplayCamera(2)
      break;
    case 3:
      NavIndx = 3;
      document.getElementById('nav-btn-0').classList.remove("disabled");
      document.getElementById('nav-btn-4').classList.add("disabled");
      DisplayCamera(3)
      break;
  }
}

// --------- Cameras Display ------- //

function DisplayCamera(CameraNumber){
  CurrentCamera = CameraDict[CameraNumber];
}


// Refresh Image Elment After IP change
function refreshImage(cameraIndex, imgURL){    
  // create a new timestamp 
  var timestamp = new Date().getTime();  
  var queryString = "?t=" + timestamp;    
  CameraDict[cameraIndex].src = imgURL + queryString;    
}