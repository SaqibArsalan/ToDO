
$(document).ready(()=>{
    $('#add-task').submit(function(e){
        console.log("the task is ", $("#task").val());

        $.ajax({
            type :'POST',
            url : '/toDo/',
            data: {
                title: $('#task').val()
            },
            dataType: 'json',
            success:(data) =>{
                    window.location.reload();

            }

    });
    e.preventDefault();
    });

    $('#logout').click(function(e){

        $.ajax({
            type :'GET',
            url : '/logout',
            success:(data) =>{
                if(data.status) {
                    console.log("logout completed");
                    window.location.href = "/login.html"
                }                
            }

    });
    e.preventDefault();
    });              
        
});
