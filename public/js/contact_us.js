/* eslint-env node, jquery */

$(function(){
  var maxLength = 500;
  $('#chars').text(maxLength);
  $('#message').keyup(function() {
    var textLength = $(this).val().length;
    var remaining = maxLength - textLength;
    $('#chars').text(remaining);
  });
});
