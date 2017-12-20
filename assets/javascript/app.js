  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDpuT_WxvvLu-Y1ff1kwYuE1pWVoBNsTrY",
    authDomain: "broshambo-16d3a.firebaseapp.com",
    databaseURL: "https://broshambo-16d3a.firebaseio.com",
    projectId: "broshambo-16d3a",
    storageBucket: "broshambo-16d3a.appspot.com",
    messagingSenderId: "868792743809"
  };
  firebase.initializeApp(config); 


  var player1 
  var player2


function newAccount(){
  var displayName = $("#userName").val().trim();
  console.log(displayName);
  var password = $("#password").val();
  var email = $("#email").val().trim();
  console.log(email);

  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
    user.updateProfile({displayName: displayName});

  });
};

function signIn(){  
  var email = $("#loginEmail").val();
  var password = $("#loginPassword").val();

firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);


        });
};

function onLogIn(){
  firebase.auth().onAuthStateChanged(function(user) {
    //all the loginshit goes here game.onlogin

    if(user){
      var displayName = user.displayName;
      var email = user.email;
      // var profiles = ("welcome " + displayName  " " + email);
      $("#userProfile").html(displayName);
    }
     
    

  });
};

function signOut(){
  firebase.auth().signOut();
  location.reload();
}


function sendChat(){
  ref = firebase.database().ref("/chat");
  messageField = $("#chatBox").val();
  console.log(messageField);

  ref.push().set({
    name: firebase.auth().currentUser.displayName,
    message: messageField
  });
};

$(document).ready(function(){

$("#registerButton").on("click", function(event){
  event.preventDefault();
  newAccount();
})
$("#loginButton").on("click", function(event){
  event.preventDefault();
  signIn();
  setTimeout(function(){
    location.reload();
  },1000);
});
$("#logoutButton").on("click",function(){
  signOut();
});
$("#chatBoxSubmit").on("click",function(event){
  event.preventDefault();
  sendChat();
})

var chatref = firebase.database().ref("/chat"); 
  chatref.on("child_added",function(snapshot){
    var message = snapshot.val();
    addChatMessage = (message.name + ":" + message.message +"<br>");
    $("#chat").append(addChatMessage);
  });

onLogIn();

//end ready 
});