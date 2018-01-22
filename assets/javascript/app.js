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



  var STATE = {
    OPEN: 1,
    JOINED: 2,
    PLAYING: 3,
    FINISHED: 4,
  }

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
      $("#userProfile").html(displayName);

      var value1
      var value2

      var playerref = firebase.database().ref("/game");
     playerref.on("value",function(snapshot){

  if(snapshot.val().player1.name){
    var player1 = snapshot.val().player1.name;
    $("#player1Id").text(player1);
    console.log(player1);
    if(displayName === player1){

       
           $("#rps").append($("<button>").text("rock").attr("id","rock"));
           $("#rps").append($("<button>").text("paper").attr("id","paper"));
           $("#rps").append($("<button>").text("sicsors").attr("id","sicsors"));
            $("#rock").on("click", function(){
              value1 = $(this).text();
              console.log(value1);
            })
             $("#paper").on("click", function(){
              value1 = $(this).text();
              console.log(value1);
            })
              $("#sicsors").on("click", function(){
              value1 = $(this).text();
              console.log(value1);
            })
              
              




      }
  }

    if(snapshot.val().player2.name){
  var player2 = snapshot.val().player2.name;
  $("#player2Id").text(player2);
  }
  });


function gameapick(){
  ref = firebase.database().ref("/game");
 
  console.log(messageField);

  ref.push().set({
    name: firebase.auth().currentUser.displayName,
    message: messageField
  });
};






//endifonlogin
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

function gameset1(){
  ref = firebase.database().ref("/game/player1");
  playerID = $("#player1Button").attr("data-name");
  console.log(playerID);

  ref.set({
    name: firebase.auth().currentUser.displayName,
    playerID: playerID
  });
};
function gameset2(){
  ref = firebase.database().ref("/game/player2");
  playerID = $("#player2Button").attr("data-name");
  console.log(playerID);

  ref.set({
    name: firebase.auth().currentUser.displayName,
    playerID: playerID
  });
};
function gameclear(){
  firebase.database().ref("/game/player2").remove();
  firebase.database().ref("/game/player1").remove();
};


// function updateName(){

// }


// function creategame(){
//   ref = firebase.database().ref("/games");
//   var user = firebase.auth().currentUser ;
//   var currentGame ={
//     creator:{uid: user.uid, displayName: user.displayName},
//     state: STATE.OPEN,
//   };
//   ref.push().set(currentGame);
// };

// function joinGame(key){
//   var user = firebase.auth().currentUser ;
//   var gameref = ref.child(key);
//   gameref.transaction(function(gamee){
//     if(!game.joiner){
//       game.state = STATE.PLAYING;
//       game.joiner = {uid: user.uid, displayName: user.displayName};
//     }
//   });

// };



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

$("#player1Button").on("click",function(){
  alert("test");
  // updateName();
  gameset1();
});
$("#player2Button").on("click",function(){
  alert("test");
  gameset2();
});
$("#cleargame").on("click",function(){
gameclear();
});


var chatref = firebase.database().ref("/chat"); 
  chatref.on("child_added",function(snapshot){
    var message = snapshot.val();
    addChatMessage = (message.name + ":" + message.message +"<br>");
    $("#chat").append(addChatMessage);
  });


onLogIn();









//end ready 
});