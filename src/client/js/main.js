// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
  $.ajax({
    url: '/books/all',
    method: 'GET',
    success: function(data) {
      console.log(data);
    }
  });
});
