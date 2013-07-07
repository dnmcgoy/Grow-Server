var socket = io.connect();
socket.on('plantSuccessful', function (data) {
    $('#intro').append(data);
});

