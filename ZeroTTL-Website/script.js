

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



// --------- Login ------- //
//document.getElementById("submitLog").addEventListener("click",OnSubmitLog)

function OnSubmitLog(){
    email = document.getElementById("email-input").value;
    password = document.getElementById("password-input").value
    
    // See if register was selected
    if (document.getElementById("RegisterCheck").value) {RegisterToFB(email,password)}
}
function RegisterToFB(email,password){
    auth.createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    currentUser.uid = user.uid
    console.log(user)
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
    // ..
  });
}

// --------- Contact POST ------- //
document.getElementById("submitContact").addEventListener("click",OnSubmitContact)

function OnSubmitContact(){
  // Get fields from page
  firstName = document.getElementById("inputFirstname").value;
  lastName = document.getElementById("inputLastname").value;
  phoneNumber = document.getElementById("inputPhone").value;
  subject = document.getElementById("inputSubject").value;
  text = document.getElementById("textArea").value;
  ticket = randomNumber(7);

  // Upload to Firebase
  database.ref('Tickets/ticket: '+ticket).set({
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