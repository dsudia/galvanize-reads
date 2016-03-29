$(document).ready(function () {
  console.log('sanity check');
  //configure header sort/search menu
  var menuToggle = $('#js-mobile-menu').unbind();
  $('#js-navigation-menu').removeClass("show");

  menuToggle.on('click', function(e) {
    e.preventDefault();
    $('#js-navigation-menu').slideToggle(function(){
      if($('#js-navigation-menu').is(':hidden')) {
        $('#js-navigation-menu').removeAttr('style');
      }
    });
  });
  // get all books on page load
  $.ajax({
    url: '/books/all',
    method: 'GET',
    success: function(data) {
      var pageLinkHTML;
      var bookData = data.bookData;
      var authorData = data.authorData;
      var numOfPages = Math.ceil((bookData.length / 10));
      var bookDiv;
      for (i = 1; i <= numOfPages; i++ ){
        pageLinkHTML = '<li><a class="page-link" id="' + i +'" href="javascript:void(0)">' + i + '</a></li>';
        $('#page-list').append(pageLinkHTML);
      }
      for (i = 0; i < 10; i++) {
        bookDiv = '<article class="book-div"><img src="' + bookData[i].image_url + '"><div><button class="edit">Edit</button><button class="remove">Remove</button><a href="javascript:void(0)"><h3 class="book-link" id="/books/' + bookData[i].id + '">' + bookData[i].title + '</h3></a><section class="book-authors" id="' + bookData[i].id + '"></section><p>Genre: <em>' + bookData[i].genre + '</em></p><p>' + bookData[i].description + '</p></div></article>';
        $('#item-list').append(bookDiv);
      }
      var bookAuthors = document.getElementsByClassName('book-authors');
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
      $(document).on('click', '.page-link', function() {
        var num = $(this).attr('id');
        if (num === 1) {
          $('#item-list').empty();
          for (i = 0; i < 10; i++) {
            bookDiv = '<article class="book-div"><img src="' + bookData[i].image_url + '"><div><button class="edit">Edit</button><button class="remove">Remove</button><a href="javascript:void(0)"><h3 class="book-link" id="/books/' + bookData[i].id + '">' + bookData[i].title + '</h3></a><section class="book-authors" id="' + bookData[i].id + '"></section><p>Genre: <em>' + bookData[i].genre + '</em></p><p>' + bookData[i].description + '</p></div></article>';
            $('#item-list').append(bookDiv);
          }
        } else {
          $('#item-list').empty();
          for (i = (num * 10 - 10); i < (num * 10); i++) {
            if (bookData[i]) {
              bookDiv = '<article class="book-div"><img src="' + bookData[i].image_url + '"><div><button class="edit">Edit</button><button class="remove">Remove</button><a href="javascript:void(0)"><h3 class="book-link" id="/books/' + bookData[i].id + '">' + bookData[i].title + '</h3></a><section class="book-authors" id="' + bookData[i].id + '"></section><p>Genre: <em>' + bookData[i].genre + '</em></p><p>' + bookData[i].description + '</p></div></article>';
              $('#item-list').append(bookDiv);
            }
          }
        }
        var bookAuthors = document.getElementsByClassName('book-authors');
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
      });
    }
  });
});
