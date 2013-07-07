

$(document).ready(function(){

    //Counter
    counter = 0;
    //Make element draggable
    $(".drag").draggable({
        helper:'clone',
        containment: 'frame',

        //When first dragged
        stop:function(ev, ui) {
            var pos=$(ui.helper).offset();
            objName = "#clonediv"+counter
            $(objName).css({"left":pos.left,"top":pos.top});
            $(objName).removeClass("drag");


            //When an existing object is dragged
            $(objName).draggable({
                containment: 'parent',
                stop:function(ev, ui) {
                    var pos=$(ui.helper).offset();
		    
                    //console.log($(this).attr("id"));
		    //console.log(pos.left)
                    //console.log(pos.top)
                }
            });
        }
    });
    //Make element droppable
    $("#frame").droppable({
	drop: function(ev, ui) {
	    if (ui.helper.attr('id').search(/drag[0-9]/) != -1){
		var pos = $(ui.draggable).offset();
		socket.emit('plant', {x : pos.left, y:  pos.top });
	    
		counter++;
		var element=$(ui.draggable).clone();
		element.addClass("tempclass");
		$(this).append(element);
		$(".tempclass").attr("id","clonediv"+counter);
		$("#clonediv"+counter).removeClass("tempclass");

		//Get the dynamically item id
		draggedNumber = ui.helper.attr('id').search(/drag([0-9])/)
		itemDragged = "dragged" + RegExp.$1
		//console.log(itemDragged)

		$("#clonediv"+counter).addClass(itemDragged);
	    }
        }
    });

    socket.on("treeCreated", function(data) {
	$('#intro').append("Something");
	counter++;
	var element=$("#drag1").clone();
	element.addClass("tempclass");
	$(this).append(element);
	$(".tempclass").attr("id","clonediv"+counter);
	$("#clonediv"+counter).removeClass("tempclass")
	$("#clonediv"+counter).addClass("dragged1");

	objName = "#clonediv"+counter
        $(objName).css({"left":data.x,"top":data.y});
        $(objName).removeClass("drag");
    });

});
