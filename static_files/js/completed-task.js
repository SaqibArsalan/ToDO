$(document).ready(function() {
                               
    var t =  $('#dataTable').DataTable( { 
         "columnDefs": [ {
                "searchable": true,
                "orderable": true,
                "targets": 0
                } ],
        "order": [[ 1, 'asc' ]],  
        "ajax": {         
                type :'GET',
                url : '/toDo/completed',
                dataType: 'json',                                              
        }, 
        "columns": [
                
  
            {"data": "_id"},
            { "data":'title'},
            {"data":"_id","render": function (data, type, row, meta ) {
                return '<button id="' + row._id + ' "class="btn btn-danger badge-pill delete" data-toggle="modal"  data-id="'+row._id+'"  data-target="#deleteModal" style="margin-left:3px";><span class="fa fa-trash fa-lg"></span></button>';
          }
        }
            ], 
            });

            t.on( 'order.dt search.dt', function () {
            t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
            } );
        } ).draw();

        $("#deleteModal").on('show.bs.modal', function (e) {
            var triggerLink = $(e.relatedTarget);
            var task_id = triggerLink.data("id");  
            console.log("task id is ", task_id);      
            
            $("#del-task").click(function(e){
      
            $.ajax({
                    url:"/toDo/" + task_id,
                    type: "DELETE",
                    success: function(data) {         
                    window.location.reload();
            }
              
            });
            e.preventDefault();
        } );
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