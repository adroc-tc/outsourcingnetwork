/*  This code will be the basis for placing template  *
 *  HTML code into the active page.                   */

/* eslint-env jquery */

/*jslint
    node: true
*/
/*global
    $
*/

$(function () {
  "use strict";

  $("#nav").load("/test/templates/navigation.html");
  $("#icon-row").load("/test/templates/footer.html");


//  var colors = [
//      {
//        backgrnd: "rgba(233, 213, 88, 0.45)",  // Yellow
//        foregrnd: "#000",
//        title: "#002268"      // "HON" Blue
//      },
//      {
//        backgrnd: "rgba(47, 75, 38, 0.45)",  // Dark Green
//        foregrnd: "#FFF",
//        title: "#00A6FB"      // Bright Blue
//      },
//      {
//        backgrnd: "rgba(0, 166, 251, 0.45)",  // Bright Blue
//        foregrnd: "#000",
//        title: "#002268"      // "HON" Blue
//      },
//      {
//        backgrnd: "rgba(48, 99, 142, 0.45)",  // "Dull" Blue
//        foregrnd: "#FFF",
//        title: "#E9D758"      // Yellow
//      }
//    ];
//
//
//
//  $(".link-block").each(function (index, item) {
//    var random_color = colors[Math.floor(Math.random() * colors.length)];
//    $(item).css('background-color', random_color.backgrnd);
//    $(item).find(".topic_desc").css('color', random_color.foregrnd);
//    $(item).find(".topic_name").css('color', random_color.title);
//  });

});

