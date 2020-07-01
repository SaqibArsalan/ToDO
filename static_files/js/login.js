
// to modify front end.

const inputs = document.querySelectorAll(".input");


function addcl(){
	let parent = this.parentNode.parentNode;
	parent.classList.add("focus");
}

function remcl(){
	let parent = this.parentNode.parentNode;
	if(this.value == ""){
		parent.classList.remove("focus");
	}
}


inputs.forEach(input => {
	input.addEventListener("focus", addcl);
	input.addEventListener("blur", remcl);
});



// ajax request for login.

$(document).ready(()=>{
    $('#form').submit(function(e){
        e.preventDefault();
        console.log("the username is ", $("#username").val());
        var self = this;
        $.ajax({
            url: '/users/login',
            type: 'POST',
            data: {
                username: $('#username').val(),
                password: $('#password').val()
            }
        }).done(function(result){
            console.log("the result is ", result);
            if (result.token){
                console.log("Token information: " + result.token);
                // window.localStorage.clear();
                // window.localStorage.setItem('token', result.token);
                self.submit();
                
            }
            else $('#error').text("Login Unsuccessful! Please Try again");

            
        }).fail(function() {
            window.alert('Login Unsuccessful! Please Try again ');
        });
    });
});





