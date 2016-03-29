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

function appendAuthorDiv(index) {
  if (index) {
    authorDiv = '<article class="author-div"><img src="' + index.image_url + '"><div><button class="edit">Edit</button><button class="remove">Remove</button><a href="javascript:void(0)"><h3 class="author-link" id="/authors/' + index.id + '">' + index.first_name + ' ' + index.last_name + '</h3></a><br><p>' + index.bio + '</p><div class="author-books" id="' + index.id + '"><p><em>Books:</em></p></div>';
    $('#item-list').append(authorDiv);
  }
}

function addAuthorsToBook (array) {
  var bookAuthors = document.getElementsByClassName('book-authors');
  array.forEach(function(el, ind, arr) {
    for (i = 0; i < bookAuthors.length; i++) {
      var divId = $(bookAuthors[i]).attr('id');
      var bookId = el.book_id;
      if (divId == bookId) {
        var authorDiv = '<p><a href="javascript:void(0)" class="author-link" id="/authors/' + el.id + '">' + el.first_name + ' ' + el.last_name + '</a></p>';
        return $(bookAuthors[i]).append(authorDiv);
      }
    }
  });
}

function addBooksToAuthor (array) {
  var authorBooks = document.getElementsByClassName('author-books');
  array.forEach(function(el, ind, arr) {
    for (i = 0; i < authorBooks.length; i++) {
      var divId = $(authorBooks[i]).attr('id');
      var authorId = el.author_id;
      if (divId == authorId) {
        var bookDiv = '<p><a href="javascript:void(0)" class="book-link" id="/books/' + el.id + '">' + el.title + '</a></p>';
        return $(authorBooks[i]).append(bookDiv);
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

function enablePagesForAuthors (bookData, authorData) {
  $(document).on('click', '.page-link', function() {
    var num = $(this).attr('id');
    $('#author-list').empty();
    if (num === 1) {
      for (i = 0; i < 10; i++) {
        appendAuthorDiv(authorData[i]);
      }
    } else {
      for (i = (num * 10 - 10); i < (num * 10); i++) {
        appendAuthorDiv(authorData[i]);
      }
    }
    addBooksToAuthor(bookData);
  });
}


$('#search-field').on('keyup', function() {
  var searchId = $(this).val();
  var dataString = 'search=' + searchId;
  $.ajax({
    url: '/search',
    data: dataString,
    cache: false,
    method: 'GET',
    success: function(data) {
      $('#item-list').empty();
      $('#page-list').empty();
    }
  });
});

// get all authors when link is clicked
$('#all-authors').on('click', function() {
  $.ajax({
    url: '/authors/all',
    method: 'GET',
    success: function(data) {
      console.log(data);
      $('#item-list').empty();
      $('#page-list').empty();
      var bookData = data.bookData;
      var authorData = data.authorData;
      var numOfPages = ceiling(authorData);
      appendPages(numOfPages);
      for (i = 0; i < 10; i++) {
        console.log(i);
        appendAuthorDiv(authorData[i]);
      }
      addBooksToAuthor(bookData);
      enablePagesForAuthors(bookData, authorData);
    }
  });
});

// get one author when their name is clicked
$(document).on('click', '.author-link', function() {
  var link = $(this).attr('id');
  $.ajax({
    url: link,
    method: 'GET',
    success: function(data) {
      $('#author-list').empty();
      $('#page-list').empty();
      var bookData = data.bookData;
      var authorData = data.authorData;
      console.log(authorData);
      for (i = 0; i < 1; i++) {
        appendAuthorDiv(authorData[i]);
      }
      addBooksToAuthor(bookData);
    }
  });
});

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
        appendBookDiv(bookData[i]);
      }
      addAuthorsToBook(authorData);
    }
  });
});
