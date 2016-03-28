// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
  $.ajax({
    url: '/books/all',
    method: 'GET',
    success: function(data) {
      var bookData = data.bookData;
      var authorData = data.authorData;
      var bookAuthors = document.getElementsByClassName('book-authors');
      bookData.forEach(function(el, ind, arr) {
        var bookDiv =  '<article><img src="' + el.image_url + '"><div><button class="edit">Edit</button><button class="remove">Remove</button><h3>' + el.title + '</h3><section class="book-authors" id="' + el.id + '"></section><p>Genre: <em>' + el.genre + '</em></p><p>' + el.description + '</p></div></article>';
        return $('#book-list').append(bookDiv);
      });
      authorData.forEach(function(el, ind, arr) {
        for (i = 0; i < bookAuthors.length; i++) {
          var divId = $(bookAuthors[i]).attr('id');
          var bookId = el.book_id;
          if (divId == bookId) {
            var authorDiv = '<p>' + el.first_name + ' ' + el.last_name + '</p>';
            return $(bookAuthors[i]).append(authorDiv);
          }
        }
      });
    }
  });
});
