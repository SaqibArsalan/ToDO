$(document).ready(function(){

    $("#form-submit").submit(function(e) {
        var emp_id = $("#employee").val();
        var formData = {
            'username' : $("#email").val(),
            'password': $("#password").val()
        }
        if($('#password').val() ==  $('#confirm_password').val()) {

        $.ajax({
            url: '/users/signup',
            type: 'POST',
            data: formData,
            dataType: 'json',
            success: (data) => {
                window.location.reload();

            }				
        });
        }
        else {
            $("#checkpass").html("Password does not match");
        }
        e.preventDefault();
    });  

});

	