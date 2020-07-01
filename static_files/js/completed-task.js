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
                return '<button id="' + row._id + ' "class="btn btn-danger badge-pill delete" data-toggle="modal"  data-id="'+row.id+'"  data-target="#deleteModal" style="margin-left:3px";><span class="fa fa-trash fa-lg"></span></button>';
          }
        }
            ], 
            });

            t.on( 'order.dt search.dt', function () {
            t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
            cell.innerHTML = i+1;
            } );
        } ).draw()
});