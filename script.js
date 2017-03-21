var txtName = document.getElementById("name");
var txtMessage = document.getElementById("message");
var buttonS = document.getElementById("sendB");
var chatUl = document.getElementById("chatUL");
var logB = document.getElementById("loginB");

buttonS.addEventListener("click",function(){

    var name = txtName.value;
    var message = txtMessage.value;
  
    firebase.database().ref("chat").push({
        name: name, 
        message: message
    });
});

firebase.database().ref("chat")
.on("value", function(snapshot) {

var html = "";

snapshot.forEach(function(i){
var element = i.val();
var name = element.name;
var message = element.message;
html += "<li><b>"+name+": </b>"+message+"</li>";

    });

    chatUl.innerHTML = html;

});

// Log in git //////////////////////////////////////////////////////////////

function gitLog(){
var provider = new firebase.auth.GithubAuthProvider();

firebase.auth().signInWithPopup(provider).then(function(result) {
console.log(result);
}).catch(function(error) {
console.log(error);
});
}


//******************************************************************* */

//Login Button listener ////////////////////////////////////////////////

logB.addEventListener("click", gitLog);

//******************************************************************** */