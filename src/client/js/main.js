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
});

// establish global variables
var pageLinkHTML;
var bookDiv;
var authorDiv;

// helper functions
function ceiling (array) {
  return Math.ceil((array.length) / 10);
}

function appendPages (num) {
  for (i = 1; i <= num; i++ ){
    pageLinkHTML = '<li><a class="page-link" id="' + i +'" href="javascript:void(0)">' + i + '</a></li>';
    $('#page-list').append(pageLinkHTML);
  }
}

function appendBookDiv (index) {
  if (index) {
    bookDiv = '<article class="book-div"><img src="' + index.image_url + '"><div><button class="edit">Edit</button><button class="remove">Remove</button><a href="javascript:void(0)"><h3 class="book-link" id="/books/' + index.id + '">' + index.title + '</h3></a><section class="book-authors" id="' + index.id + '"></section><p>Genre: <em>' + index.genre + '</em></p><p>' + index.description + '</p></div></article>';
    $('#item-list').append(bookDiv);
  }
}

function addAuthorsToBook (array) {
  var bookAuthors = document.getElementsByClassName('book-authors');
  array.forEach(function(el, ind, arr) {
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

function enablePagesForBooks (bookData, authorData) {
  $(document).on('click', '.page-link', function() {
    var num = $(this).attr('id');
    $('#item-list').empty();
    if (num === 1) {
      for (i = 0; i < 10; i++) {
        appendBookDiv(bookData[i]);
      }
    } else {
      for (i = (num * 10 - 10); i < (num * 10); i++) {
        appendBookDiv(bookData[i]);
      }
    }
    addAuthorsToBook(authorData);
  });
}

// get all books when option is clicked
$('#all-books').on('click', function() {
  $.ajax({
    url: '/books/all',
    method: 'GET',
    success: function(data) {
      $('#item-list').empty();
      $('#page-list').empty();
      var bookData = data.bookData;
      var authorData = data.authorData;
      var numOfPages = ceiling(bookData);
      appendPages(numOfPages);
      for (i = 0; i < 10; i++) {
        appendBookDiv(bookData[i]);
      }
      addAuthorsToBook(authorData);
      enablePagesForBooks(bookData, authorData);
    }
  });
});

// list books by genre when genre name is clicked
$(document).on('click', '.genre-link', function() {
  var link = $(this);
  var genre = link.attr('id');
  $('#page-list').empty();
  $.ajax({
    url: '/books/genres/' + genre,
    method: 'GET',
    success: function(data) {
      $('#book-list').empty();
      var bookData = data.bookData;
      var authorData = data.authorData;
      var bookAuthors = document.getElementsByClassName('book-authors');
      var numOfPages = ceiling(bookData);
      appendPages(numOfPages);
      for (i = 0; i < 10; i++) {
        appendBookDiv(bookData[i]);
      }
      addAuthorsToBook(authorData);
      enablePagesForBooks(bookData, authorData);
    }
  });
});

// get one book when its title is clicked
$(document).on('click', '.book-link', function() {
  var link = $(this).attr('id');
  $.ajax({
    url: link,
    method: 'GET',
    success: function(data) {
      $('#item-list').empty();
      $('#page-list').empty();
      var bookData = data.bookData;
      var authorData = data.authorData;
      for (i = 0; i < 1; i++) {
        console.log(bookData[i]);
        appendBookDiv(bookData[i]);
      }
      addAuthorsToBook(authorData);
    }
  });
});
