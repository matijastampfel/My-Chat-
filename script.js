var txtMessage = document.getElementById("message");
var buttonS = document.getElementById("sendB");
var chatUl = document.getElementById("chatUL");
var logB = document.getElementById("loginB");
specialB ();

buttonS.addEventListener("click", function () {

    var name = localStorage.getItem("logInUser");
    var message = txtMessage.value;

    firebase.database().ref("chat/").push({
        name: name,
        message: message
    });
});

firebase.database().ref("chat/")
    .on("value", function (snapshot) {

        var html = "";

        snapshot.forEach(function (i) {
            var element = i.val();
            var name = element.name;
            var message = element.message;
            html += "<li><b>" + name + ": </b>" + message + "</li>";

        });

        chatUl.innerHTML = html;

    });

// Log in git //////////////////////////////////////////////////////////////

function gitLog() {
    var provider = new firebase.auth.GithubAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {
        console.log(result);
        userSave(result);
    }).catch(function (error) {
        console.log(error);
    });
}


//******************************************************************* */

//Login Button listener ////////////////////////////////////////////////

logB.addEventListener("click", gitLog);

//******************************************************************** */

//Save user data //////////////////////////////////////////////////////////

function userSave(result) {

    var user = result.user.providerData[0];
    var userObj = {
        id: user.uid,
        name: user.displayName
    };

    firebase.database().ref("users/" + user.uid).set(userObj);


    firebase.database().ref('users/' + user.uid).once('value', function (snapshot) {
        var data = snapshot.val();

        var user = result.user.providerData[0];

        if (data === null) {

            var userObj = {
                id: user.uid,
                name: user.displayName
            };

            firebase.database().ref("users/" + user.uid).set(userObj);
        } else {
            alert("Hi " + user.displayName);
        }
console.log(data);

let obj = {
    name: user.displayName,
    ID: user.uid
}

localStorage.setItem("logInUser",JSON.stringify(obj));
    specialB ()
    });





}


//*********************************************************************** */

// Hidden ///////////////////////////////////////////////////////////

function specialB (){
    var user = JSON.parse(localStorage.getItem("logInUser"));
    var secretbutton = getElementById("secret");
    if(user.ID == 21656636) {
        secretbutton.style.display = "block";
    }
}

// ********************************************************************//