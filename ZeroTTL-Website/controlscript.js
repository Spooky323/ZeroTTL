
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



// function GetIP(cameraNumber){
//     database.ref(`/IOT/TelAviv/${cameraNumber}`).child('IP').get().then((snapshot) =>{
//         if (snapshot.exists()) {
//             console.log(`IP for camera ${cameraNumber} : ${snapshot.val()}`);
//             return snapshot.val();
//         }
//         else{
//             console.log(`Error Retiriving IP for camera ${camerNumber}`);
//         }
//     })
// }

// function preload() {
//   //classifier = ml5.objectDetector('cocossd');
// }



// function setup() {
//   createCanvas(640,480);
//   console.log(GetIP('2'));
//   video = createVideo("img/trafic.mp4",() =>{
//     video.loop();
//   })
//   img = loadImage('http://127.0.0.1:5500/control.html')
//   //classifier.detect(video, OnDetect);
// }

//  function draw(){
//      image(image,0,0);
//      results.forEach(result => {
//          stroke(0,255,0);
//          strokeWeight(4);
//          noFill();
//          rect(result.x,result.y,result.width,result.height);
//          noStroke();
//          fill(0);
//          textSize(24);
//          text(result.label,result.x + 10, result.y - 24);
//      });
//  }


// // A function to run when we get any errors and the results
// function OnDetect(error, detections) {
//   // Display error in the console
//   if (error) {
//     console.error(error);
//   } else {
//     results = detections;
//   classifier.detect(video, OnDetect);
// }
// }

let objectDetector;
let status;
let objects = [];
let canvas, ctx;
const width = 320;
const height = 240;

async function make() {
  img = new Image();
  img.crossOrigin='anonymous'
  img.src = 'http://10.100.102.197:81/stream';
  img.width = width;
  img.height = height;

  objectDetector = await ml5.objectDetector('cocossd', startDetecting)

  canvas = createCanvas(width, height);
  ctx = canvas.getContext('2d');
}

// when the dom is loaded, call make();
window.addEventListener('DOMContentLoaded', function () {
  make();
});

function startDetecting() {
    setTimeout(function () {
        objectDetector.detect(img, detect);
        startDetecting()
    },200);
}

function detect(err,results) {
    if (err) {
      console.log(err);
      return
    }
    objects = results;

    if (objects) {
      draw();
    }
    objectDetector.detect(img, detect);
}

function draw() {
  // Clear part of the canvas
  ctx.fillStyle = "#000000"
  ctx.fillRect(0, 0, width, height);

  ctx.drawImage(img, 0, 0);
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
  document.body.appendChild(canvas);
  return canvas;
}