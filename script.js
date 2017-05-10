var txtMessage = document.getElementById("message");
var buttonS = document.getElementById("sendB");
var chatUl = document.getElementById("chatUL");
var logB = document.getElementById("loginB");


buttonS.addEventListener("click", function () {

    var user = JSON.parse(localStorage.getItem("logInUser"));
    var message = txtMessage.value;

if (user !== null) {
    firebase.database().ref("chat/").push({
        name: user.name,
        message: message
    });
    } else {
        alert("You did not login, now assassins are after you :D");
    }
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
        if(loginB.textContent === "Log in Button"){
            userSave(result);
            specialB ();
            loginB.textContent = "Logout in Button";
        }else if(loginB.textContent === "Logout in Button"){
            firebase.auth().signOut().then(()=>{
                loginB.textContent = "Log in Button";
                localStorage.clear();
            }) 
            .catch(function(error) {
                console.log(error);
            });
            
        }

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
    var secretbutton = document.getElementById("secret");
    if(user.ID == 21656636) {
        secretbutton.style.display = "block";
    }
}

// ********************************************************************//