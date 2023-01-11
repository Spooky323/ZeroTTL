

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

document.getElementById("submitLog").addEventListener("click",OnSubmit)

function OnSubmit(){
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