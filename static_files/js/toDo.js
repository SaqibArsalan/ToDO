
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
        
});
