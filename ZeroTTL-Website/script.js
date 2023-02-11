

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

User = {};
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const storage = firebase.storage();
const database = firebase.database();


// --------- Check if logged ------- //
if(localStorage.getItem('user') != null){
  console.log("test");
  const logout = document.createElement('a');
  logout.href = "#"
  logout.className = "nav-link";
  logout.innerHTML = "Sign out"
  logout.onclick = function(){Logout()}
  document.getElementById('loginbtn').replaceWith(logout);

  // check if user is Niv
  if (localStorage.getItem('user') == "pC0OSe8TMoZYQ72Os5rHg0BfT8n2"){
    const control = document.createElement('a');
    control.href = "control.html"
    control.className = "nav-link";
    control.innerHTML = "Control"
    document.getElementById("navul").appendChild(control);
  }
}

// --------- Login ------- //
try{
  document.getElementById("submitLog").addEventListener("click",OnSubmitLog)
}catch(e){}

function OnSubmitLog(){
    localStorage.removeItem('user');
    email = document.getElementById("email-input").value;
    password = document.getElementById("password-input").value
    
    // See if register was selected
    if (document.getElementById("RegisterCheck").checked) {
      RegisterToFB(email,password)}
    else{
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user.uid;
          console.log("Logged ",user);
          localStorage.setItem('user',user);
          refreshPage();
          // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
      });
    
    }
}
function RegisterToFB(email,password){
    auth.createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    refreshPage();
    user = userCredential.user.uid;
    localStorage.setItem('user',user);
    console.log(user)
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
    // ..
  });
}
function Logout(){
  firebase.auth().signOut().then(() => {
    localStorage.removeItem("user");
    document.getElementById('loginbtn')
    refreshPage();
  }).catch((error) => {
    console.log(error);
  })
}
// --------- Contact POST ------- //

try{
  document.getElementById("submitContact").addEventListener("click",OnSubmitContact)
}catch(e){}

function OnSubmitContact(){
  // Get fields from page
  firstName = document.getElementById("inputFirstname").value;
  lastName = document.getElementById("inputLastname").value;
  phoneNumber = document.getElementById("inputPhone").value;
  subject = document.getElementById("inputSubject").value;
  text = document.getElementById("textArea").value;
  ticket = randomNumber(7);

  // Upload to Firebase
  database.ref('Website/Tickets/ticket: '+ticket).set({
    firstName : firstName,
    lastName : lastName,
    phoneNumber : phoneNumber,
    subject : subject,
    text: text
  }).catch((error) =>{
    console.log(error);
  })
}

// --------- Misc ------- //
function randomNumber(length) {
  return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}
function refreshPage(){
  window.location.reload();
}