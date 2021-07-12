//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyDC770JrzGj6613uSZZwCImRjwR5fT6n-M",
      authDomain: "kwitter-1da97.firebaseapp.com",
      databaseURL: "https://kwitter-1da97-default-rtdb.firebaseio.com",
      projectId: "kwitter-1da97",
      storageBucket: "kwitter-1da97.appspot.com",
      messagingSenderId: "324072713629",
      appId: "1:324072713629:web:5801b9c43e114c46449374"
    };
firebase.initializeApp(firebaseConfig);
user_name=localStorage.getItem("user_name");
room_name=localStorage.getItem("room_name");
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
         name=message_data['name'];
         like=message_data['like'];
         message=message_data['message'];
         name_with_tag="<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
         message_with_tag="<h4 class='message_h4'>"+message+"</h4>";
         like_button="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
         span_with_tag="<span class='glyphicon glyphicon-thumbs-up'>Like: "+like+"</span></button><hr>";
         row=name_with_tag+message_with_tag+like_button+span_with_tag;
         document.getElementById("output").innerHTML+=row;
      } });  }); }
getData();
function updateLike(message_id){
      console.log("clicked on like button"+message_id);
      button_id=message_id;
      likes=document.getElementById(button_id).value;
      update_likes=Number(likes)+1;
      console.log(update_likes);
      firebase.database().ref(room_name).child(message_id).update({
            like: update_likes
      });
}
function logout(){
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location="index.html";
}
function send(){
      msg=document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value="";
}