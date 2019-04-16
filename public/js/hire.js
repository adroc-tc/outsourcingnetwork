/* eslint-env node, jquery */

$(function(){
  //console.log('ready');
  $('#restrictedHours').hide();
  $('#preferred').fadeOut();
  $('#flexibility').slideUp();
  $('#trainingSpecial').slideUp();

  $('input[name="schedule"]').click(function() {
    if($(this).attr('id') == 'partTime') {
      $('#preferred').slideDown(1250, function(){
        $('#flexibility').fadeIn(750, function(){
          $('#flexibility').fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        });
      });
    } else {
      $('#flexibility').fadeOut(750, function(){
        $('#preferred').slideUp(1250);
      });
    }
  });

  $('input[name="hours"]').click(function() {
    if($(this).attr('id') == 'not-flexible') {
      $('#restrictedHours').slideDown(750);
    } else {
      $('#restrictedHours').slideUp(750);
    }
  });

  $('input[name="trainingStatus"]').click(function() {
    if($(this).attr('id') == 'trained-yes') {
      $('#trainingSpecial').slideDown(750);
    } else {
      $('#trainingSpecial').slideUp(750);
    }
  });
  
  var maxChars = 500;
  var maxLongChars = 2500;
  
  $('#phChars').text(maxChars);
  $('#rhChars').text(maxChars);
  $('#hsChars').text(maxChars);
  $('#colChars').text(maxChars);
  $('#osChars').text(maxChars);
  $('#tdChars').text(maxLongChars);
  $('#stChars').text(maxLongChars);
  
  $('#preferredHours').keyup(function() {
    var textLength = $(this).val().length;
    var remaining = maxChars - textLength;
    $('#phChars').text(remaining);
  });
  
  $('#restrictedHoursTA').keyup(function() {
    var textLength = $(this).val().length;
    var remaining = maxChars - textLength;
    $('#rhChars').text(remaining);
  });
  
  $('#hsSubj').keyup(function() {
    var textLength = $(this).val().length;
    var remaining = maxChars - textLength;
    $('#hsChars').text(remaining);
  });
  
  $('#colSubj').keyup(function() {
    var textLength = $(this).val().length;
    var remaining = maxChars - textLength;
    $('#colChars').text(remaining);
  });
  
  $('#osSubj').keyup(function() {
    var textLength = $(this).val().length;
    var remaining = maxChars - textLength;
    $('#osChars').text(remaining);
  });
  
  $('#trainingDescription').keyup(function() {
    var textLength = $(this).val().length;
    var remaining = maxLongChars - textLength;
    $('#tdChars').text(remaining);
  });
  
  $('#specialTraining').keyup(function() {
    var textLength = $(this).val().length;
    var remaining = maxLongChars - textLength;
    $('#stChars').text(remaining);
  });
  
  
  $('#emailConfirm').keyup(function() {
    if($('#emailConfirm').val() !== $('#email').val()){
      $('#emailErr').text(' Email addresses must match');
    } else {
      $('#emailErr').text('');
    }
  });
  

  
  
  $('input[required]').on('focusout', function(){
    if($(this).val() != '') {
      $(this).removeClass('empty');
    } else {
      $(this).addClass('empty');
    }
  });

  $('select[required]').on('focusout', function(){
    //console.log($(this).children('option:selected').text().indexOf('Select')); //DEBUG
    if($(this).children('option:selected').text().indexOf('Select') !== 0) {
      $(this).removeClass('empty');
    } else {
      $(this).addClass('empty');
    }
  });

});

(function () {
  $('input[type="file"]').change(function(){
    var fileType = $(this)[0].files[0].type;
    if(fileType == 'application/msword' || fileType == 'application/pdf' || fileType == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || fileType == 'text/plain' ) {
      $(this).prev('.errmsg').removeClass('isVisible');
    } else {
      $(this).prev('.errmsg').addClass('isVisible');
      $(this).prev('.errmsg').text("This file will NOT be uploaded. Please select a valid file.")
    }
  });
})();
