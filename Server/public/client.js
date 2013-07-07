
var socket = io.connect();
socket.on('plantSuccessful', function (data) {
    $('#intro').append(data);
});

$(function() {
    $( "input[type=submit], a, button" )
	.button()
	.click(function( event ) {
            socket.emit('plant');
	});
    
    
    //Counter
    counter = 0;
    //Make element draggable
    $(".tree").draggable({
        helper:'clone',
        containment: 'gamezone',
	
        //When first dragged
        stop:function(ev, ui) {
            var pos=$(ui.helper).offset();
            objName = "#clonediv"+counter
            $(objName).css({"left":pos.left,"top":pos.top});
            $(objName).removeClass("tree");
	    
	    
            //When an existiung object is dragged
            $(objName).draggable({
		containment: 'parent',
		stop:function(ev, ui) {
		    var pos=$(ui.helper).offset();
		}
            });
	}
    });
    //Make element droppable
    $("#gamezone").droppable({
	drop: function(ev, ui) {
	    counter++;
	    var element=$(ui.draggable).clone();
	    element.addClass("tempclass");
	    $(this).append(element);
	    $(".tempclass").attr("id","clonediv"+counter);
	    $("#clonediv"+counter).removeClass("tempclass");
	    
	    //Get the dynamically item id
	    draggedNumber = ui.helper.attr('id').search(/tree([0-9])/)
	    itemDragged = "dragged" + RegExp.$1
	    
	    $("#clonediv"+counter).addClass(itemDragged);
        }
    });
});