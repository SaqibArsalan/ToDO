
$(document).ready(()=>{
    $('#form-submit').submit(function(e){
        e.preventDefault();
        console.log("the username is ", $("#username").val());
        var self = this;

        $.ajax({
            url: '/users/signup',
            type: 'POST',
            data: {
                username: $('#username').val(),
                password: $('#password').val()
            }
        }).done(function(result){
            console.log("the result is ", result);
            if (result.success){
                self.submit();
                console.log("everything is good!");
                
            }
            else $('#error').text("SignUp Unsuccessful! Please Try again");

            
        }).fail(function() {
            window.alert('SignUp Unsuccessful! Please Try again ');
        });
    
    });
});
	