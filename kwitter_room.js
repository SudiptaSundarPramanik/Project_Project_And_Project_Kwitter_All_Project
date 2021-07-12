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
document.getElementById("user_name").innerHTML="Welcome " + user_name;
function addRoom(){
      room_name=document.getElementById("room_name").value;
      firebase.database().ref("/").child(room_name).update({
            purpose: "adding roomname"
      });
      localStorage.setItem("room_name",room_name);
      window.location="kwitter_page.html";
}
function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
       row="<div class='room_name' id="+Room_names+" onclick='redirectToRoomName(this.id)' >#"+Room_names+"</div><hr>";
       document.getElementById("output").innerHTML += row;
      });});}
getData();
function redirectToRoomName(name){
      localStorage.setItem("room_name",name);
      window.location="kwitter_page.html";
}
function logout(){
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location="index.html";
}