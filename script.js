var search = $('#find-article-button'),
  result = $('#search-result');
//bind the enter key to the click function
$('#find-article').keypress(function(event) {
  if (event.which == 13) {
    search.click();
  }
});

search.on('click', function() {
  result.html('');
  if (!$('#find-article').val()) {
    $('#find-article').attr('placeholder', 'Enter a value!!');
    result.html('');
    return;
  } else {
    $.ajax({
      url: 'https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch='+ document.getElementById('find-article').value + '&callback=?',
      dataType: 'jsonp',
      type: 'GET',
      success: function(data) {
        data.query.search.map(function(val) {
          var title = val.title;
          var desc = val.snippet;
          url = 'https://en.wikipedia.org/wiki/' + val.title.split(" ").join("_");
          console.log(url);
          if (val) {
            return result.append(
              '<div><h2>' + title + '</h2>' + '<p>' + desc + '</p>' + '<a target="_blank" href=' + url + '>See More</a></div>');
          } else {
            return result.html('');
          }

        });

      },
      error: function() {
        $('#find-article').append('<p>Please Enter a search value</p>')
      }
    });
  }

});