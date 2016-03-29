// add scripts

$(document).on('ready', function() {
  console.log('sanity check!');
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
        bookDiv =  '<article class="book-div"><img src="' + bookData[i].image_url + '"><div><button class="edit">Edit</button><button class="remove">Remove</button><h3>' + bookData[i].title + '</h3><section class="book-authors" id="' + bookData[i].id + '"></section><p>Genre: <em>' + bookData[i].genre + '</em></p><p>' + bookData[i].description + '</p></div></article>';
        $('#book-list').append(bookDiv);
      }
      $(document).on('click', '.page-link', function() {
        var num = $(this).attr('id');
        if (num === 1) {
          $('#book-list').empty();
          for (i = 0; i < 10; i++) {
            bookDiv = '<article class="book-div"><img src="' + bookData[i].image_url + '"><div><button class="edit">Edit</button><button class="remove">Remove</button><h3>' + bookData[i].title + '</h3><section class="book-authors" id="' + bookData[i].id + '"></section><p>Genre: <em>' + bookData[i].genre + '</em></p><p>' + bookData[i].description + '</p></div></article>';
            $('#book-list').append(bookDiv);
          }
        } else {
          $('#book-list').empty();
          for (i = (num * 10 - 10); i < (num * 10); i++) {
            if (bookData[i]) {
              console.log(i);
              bookDiv = '<article class="book-div"><img src="' + bookData[i].image_url + '"><div><button class="edit">Edit</button><button class="remove">Remove</button><h3>' + bookData[i].title + '</h3><section class="book-authors" id="' + bookData[i].id + '"></section><p>Genre: <em>' + bookData[i].genre + '</em></p><p>' + bookData[i].description + '</p></div></article>';
              $('#book-list').append(bookDiv);
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

  // get all books when option is clicked
  $('#all-books').on('click', function() {
    $.ajax({
      url: '/books/all',
      method: 'GET',
      success: function(data) {
        $('#book-list').empty();
        $('#page-list').empty();
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
          bookDiv =  '<article class="book-div"><img src="' + bookData[i].image_url + '"><div><button class="edit">Edit</button><button class="remove">Remove</button><h3>' + bookData[i].title + '</h3><section class="book-authors" id="' + bookData[i].id + '"></section><p>Genre: <em>' + bookData[i].genre + '</em></p><p>' + bookData[i].description + '</p></div></article>';
          $('#book-list').append(bookDiv);
        }
        $(document).on('click', '.page-link', function() {
          var num = $(this).attr('id');
          if (num === 1) {
            $('#book-list').empty();
            for (i = 0; i < 10; i++) {
              bookDiv = '<article class="book-div"><img src="' + bookData[i].image_url + '"><div><button class="edit">Edit</button><button class="remove">Remove</button><h3>' + bookData[i].title + '</h3><section class="book-authors" id="' + bookData[i].id + '"></section><p>Genre: <em>' + bookData[i].genre + '</em></p><p>' + bookData[i].description + '</p></div></article>';
              $('#book-list').append(bookDiv);
            }
          } else {
            $('#book-list').empty();
            for (i = (num * 10 - 10); i < (num * 10); i++) {
              if (bookData[i]) {
                console.log(i);
                bookDiv = '<article class="book-div"><img src="' + bookData[i].image_url + '"><div><button class="edit">Edit</button><button class="remove">Remove</button><h3>' + bookData[i].title + '</h3><section class="book-authors" id="' + bookData[i].id + '"></section><p>Genre: <em>' + bookData[i].genre + '</em></p><p>' + bookData[i].description + '</p></div></article>';
                $('#book-list').append(bookDiv);
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

  // list books by genre when genre name is clicked
  $(document).on('click', '.genre-link', function() {
    var link = $(this);
    var genre = link.attr('id');
    $('#page-list').empty();
    $.ajax({
      url: '/books/' + genre,
      method: 'GET',
      success: function(data) {
        $('#book-list').empty();
        var bookData = data.bookData;
        var authorData = data.authorData;
        var bookAuthors = document.getElementsByClassName('book-authors');
        var numOfPages = Math.ceil((bookData.length / 10));
        var bookDiv;
        for (i = 1; i <= numOfPages; i++ ){
          pageLinkHTML = '<li><a class="page-link" id="' + i +'" href="javascript:void(0)">' + i + '</a></li>';
          $('#page-list').append(pageLinkHTML);
        }
        for (i = 0; i < 10; i++) {
          if ( bookData[i] ) {
            bookDiv =  '<article class="book-div"><img src="' + bookData[i].image_url + '"><div><button class="edit">Edit</button><button class="remove">Remove</button><h3>' + bookData[i].title + '</h3><section class="book-authors" id="' + bookData[i].id + '"></section><p>Genre: <em>' + bookData[i].genre + '</em></p><p>' + bookData[i].description + '</p></div></article>';
            $('#book-list').append(bookDiv);
          }
        }
        $(document).on('click', '.page-link', function() {
          var num = $(this).attr('id');
          if (num === 1) {
            $('#book-list').empty();
            for (i = 0; i < 10; i++) {
              bookDiv = '<article class="book-div"><img src="' + bookData[i].image_url + '"><div><button class="edit">Edit</button><button class="remove">Remove</button><h3>' + bookData[i].title + '</h3><section class="book-authors" id="' + bookData[i].id + '"></section><p>Genre: <em>' + bookData[i].genre + '</em></p><p>' + bookData[i].description + '</p></div></article>';
              $('#book-list').append(bookDiv);
            }
          } else {
            $('#book-list').empty();
            for (i = (num * 10 - 10); i < (num * 10); i++) {
              if (bookData[i]) {
                console.log(i);
                bookDiv = '<article class="book-div"><img src="' + bookData[i].image_url + '"><div><button class="edit">Edit</button><button class="remove">Remove</button><h3>' + bookData[i].title + '</h3><section class="book-authors" id="' + bookData[i].id + '"></section><p>Genre: <em>' + bookData[i].genre + '</em></p><p>' + bookData[i].description + '</p></div></article>';
                $('#book-list').append(bookDiv);
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

  // handle dropdown menus in sorting bar
  var menuToggle = $('#js-centered-navigation-mobile-menu').unbind();
  $('#js-centered-navigation-menu').removeClass("show");

  menuToggle.on('click', function(e) {
    e.preventDefault();
    $('#js-centered-navigation-menu').slideToggle(function(){
      if($('#js-centered-navigation-menu').is(':hidden')) {
        $('#js-centered-navigation-menu').removeAttr('style');
      }
    });
  });
});
