//jshint esversion:6

var searchInput = 'search_input';

$(document).ready(function() {
  var autocomplete;
  autocomplete = new google.maps.places.Autocomplete((document.getElementById(searchInput)), {
    types: ['geocode'],
    componentRestrictions: {
      country: "India"
    }
  });
});

$(document).ready(function() {
  $("#toggledown").click(function() {
    $("#search").slideToggle(300);
  });
});

var showResults = debounce(function(arg) {
  var value = arg.trim();
  if (value == "" || value.length <= 0) {
    $("#search-results").fadeOut();
    return;
  } else {
    $("#search-results").fadeIn();
  }
  var jqxhr = $.post('/search/search/' + value, function(data) {
      $("#search-results").html("");
    })
    .done(function(data) {
      if (data.Route === 1) {
        data.data.forEach(x => {
          $("#search-results").append('<a href="#"><p class="m-2 lead">' + x.sub_category + '</p></a>');
        });
      } else if (data.Route === 2) {
        data.data.forEach(x => {
          $("#search-results").append('<a href="#"><p class="m-2 lead">' + x.brand + '<p>' + x.sub_category + '</p></p></a>');
        });
      } else {
        $("#search-results").append('null');

      }
    })
    .fail(function(err) {
      console.log(err);
    });
}, 200);

function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}