var socket = io.connect();
socket.on('plantSuccessful', function (data) {
    $('#intro').append(data);
});

socket.on("treeCreated", function(data) {
    $('#intro').append("Something");
    $('#frame').append($("#drag1").clone());
});
