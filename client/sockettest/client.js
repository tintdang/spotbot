// Not sure yet where to put this -------

// when we capture a chat message event we'll include it in the page.
// the total client-side js code now amounts to:
<script>
  $(function () {
    var socket = io();
    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
    socket.on('chat message', function(msg){
      $('#messages').append($('<li>').text(msg));
    });
  });
</script>