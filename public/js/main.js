$(function() {
  // console.log("We're here");
  // $('#scroll_down').on('click', function(e) {
  //   console.log("In click Event");
  //   var hash = this.hash;
  //   console.log("$(hash) = " + $(hash).offset);
  //   e.preventDefault();
  //   $('html, body').animate({ scrollTop: ($(hash).offset().top - 520)}, 700, 'linear');
  // });

  $('#scroll_down').click(function(e) {
  	e.preventDefault();

  	var position = $($(this).attr("href")).offset().top-60;

  	$("body, html").animate({
  		scrollTop: position
  	}, 500 );
  });
});

$(document).ready(function() {
  jQuery.fn.carousel.Constructor.TRANSITION_DURATION = 2000  // 0.05 second
  $(".carousel").carousel('next');
});
