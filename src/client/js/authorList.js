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

  // get all authors on page load
  $.ajax({
    url: '/authors/all',
    method: 'GET',
    success: function(data) {
      var pageLinkHTML;
      var bookData = data.bookData;
      var authorData = data.authorData;
      var numOfPages = Math.ceil((bookData.length / 10));
      var authorDiv;
      for (i = 1; i <= numOfPages; i++ ){
        pageLinkHTML = '<li><a class="page-link" id="' + i +'" href="javascript:void(0)">' + i + '</a></li>';
        $('#page-list').append(pageLinkHTML);
      }
      for (i = 0; i < 10; i++) {
        if (authorData[i]) {
          authorDiv = '<article class="author-div"><img src="' + authorData[i].image_url + '"><div><button class="edit">Edit</button><button class="remove">Remove</button><a href="javascript:void(0)"><h3 class="author-link" id="/authors/' + authorData[i].id + '">' + authorData[i].first_name + ' ' + authorData[i].last_name + '</h3></a><br><p>' + authorData[i].bio + '</p><div class="author-books" id="' + authorData[i].id + '"><p><em>Books:</em></p></div>';
          $('#item-list').append(authorDiv);
        }
      }
      var authorBooks = document.getElementsByClassName('author-books');
      bookData.forEach(function(el, ind, arr) {
        for (i = 0; i < authorBooks.length; i++) {
          var divId = $(authorBooks[i]).attr('id');
          var authorId = el.author_id;
          if (divId == authorId) {
            var bookDiv = '<p>' + el.title + '</p>';
            return $(authorBooks[i]).append(bookDiv);
          }
        }
      });
      $(document).on('click', '.page-link', function() {
        var num = $(this).attr('id');
        if (num === 1) {
          $('#item-list').empty();
          for (i = 0; i < 10; i++) {
            authorDiv = '<article class="author-div"><img src="' + authorData[i].image_url + '"><div><button class="edit">Edit</button><button class="remove">Remove</button><a href="javascript:void(0)"><h3 class="author-link" id="/authors/' + authorData[i].id + '">' + authorData[i].first_name + ' ' + authorData[i].last_name + '</h3></a><br><p>' + authorData[i].bio + '</p><div class="author-books" id="' + authorData[i].id + '"><p><em>Books:</em></p></div>';
            $('#item-list').append(authorDiv);
          }
        } else {
          $('#item-list').empty();
          for (i = (num * 10 - 10); i < (num * 10); i++) {
            if (authorData[i]) {
              console.log(i);
              authorDiv = '<article class="author-div"><img src="' + authorData[i].image_url + '"><div><button class="edit">Edit</button><button class="remove">Remove</button><a href="javascript:void(0)"><h3 class="author-link" id="/authors/' + authorData[i].id + '">' + authorData[i].first_name + ' ' + authorData[i].last_name + '</h3></a><br><p>' + authorData[i].bio + '</p><div class="author-books" id="' + authorData[i].id + '"><p><em>Books:</em></p></div>';
              $('#item-list').append(authorDiv);
            }
          }
        }
        var authorBooks = document.getElementsByClassName('author-books');
        bookData.forEach(function(el, ind, arr) {
          for (i = 0; i < authorBooks.length; i++) {
            var divId = $(authorBooks[i]).attr('id');
            var authorId = el.author_id;
            if (divId == authorId) {
              var bookDiv = '<p>' + el.title + '</p>';
              return $(authorBooks[i]).append(bookDiv);
            }
          }
        });
      });
    }
  });
});



// retrieve authors from database and place on page
$('#author-search').on('keyup', function() {
  var searchId = $(this).val();
  var dataString = 'search=' + searchId;
  $.ajax({
    url: '/authors/search',
    data: dataString,
    cache: false,
    method: 'GET',
    success: function(data) {
      $('#item-list').empty();
      $('#page-list').empty();
      var pageLinkHTML;
      var bookData = data.bookData;
      var authorData = data.authorData;
      var numOfPages = Math.ceil((bookData.length / 10));
      var authorDiv;
      for (i = 1; i <= numOfPages; i++ ){
        pageLinkHTML = '<li><a class="page-link" id="' + i +'" href="javascript:void(0)">' + i + '</a></li>';
        $('#page-list').append(pageLinkHTML);
      }
      for (i = 0; i < 10; i++) {
        if (authorData[i]) {
          authorDiv = '<article class="author-div"><img src="' + authorData[i].image_url + '"><div><button class="edit">Edit</button><button class="remove">Remove</button><a href="javascript:void(0)"><h3 class="author-link" id="/authors/' + authorData[i].id + '">' + authorData[i].first_name + ' ' + authorData[i].last_name + '</h3></a><br><p>' + authorData[i].bio + '</p><div class="author-books" id="' + authorData[i].id + '"><p><em>Books:</em></p></div>';
          $('#item-list').append(authorDiv);
        }
      }
      var authorBooks = document.getElementsByClassName('author-books');
      bookData.forEach(function(el, ind, arr) {
        for (i = 0; i < authorBooks.length; i++) {
          var divId = $(authorBooks[i]).attr('id');
          var authorId = el.author_id;
          if (divId == authorId) {
            var bookDiv = '<p>' + el.title + '</p>';
            return $(authorBooks[i]).append(bookDiv);
          }
        }
      });
      $(document).on('click', '.page-link', function() {
        var num = $(this).attr('id');
        if (num === 1) {
          $('#item-list').empty();
          for (i = 0; i < 10; i++) {
            authorDiv = '<article class="author-div"><img src="' + authorData[i].image_url + '"><div><button class="edit">Edit</button><button class="remove">Remove</button><a href="javascript:void(0)"><h3 class="author-link" id="/authors/' + authorData[i].id + '">' + authorData[i].first_name + ' ' + authorData[i].last_name + '</h3></a><br><p>' + authorData[i].bio + '</p><div class="author-books" id="' + authorData[i].id + '"><p><em>Books:</em></p></div>';
            $('#item-list').append(authorDiv);
          }
        } else {
          $('#item-list').empty();
          for (i = (num * 10 - 10); i < (num * 10); i++) {
            if (authorData[i]) {
              authorDiv = '<article class="author-div"><img src="' + authorData[i].image_url + '"><div><button class="edit">Edit</button><button class="remove">Remove</button><a href="javascript:void(0)"><h3 class="author-link" id="/authors/' + authorData[i].id + '">' + authorData[i].first_name + ' ' + authorData[i].last_name + '</h3></a><br><p>' + authorData[i].bio + '</p><div class="author-books" id="' + authorData[i].id + '"><p><em>Books:</em></p></div>';
              $('#item-list').append(authorDiv);
            }
          }
        }
        var authorBooks = document.getElementsByClassName('author-books');
        bookData.forEach(function(el, ind, arr) {
          for (i = 0; i < authorBooks.length; i++) {
            var divId = $(authorBooks[i]).attr('id');
            var authorId = el.author_id;
            if (divId == authorId) {
              var bookDiv = '<p>' + el.title + '</p>';
              return $(authorBooks[i]).append(bookDiv);
            }
          }
        });
      });
    }
  });
});
