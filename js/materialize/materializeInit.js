/**
* Materialise default initialization for navigation and modal components
*/
function MaterializeCustomInit(){
  $('.modal').modal();
  $(".side-button").sideNav();

  $('select').material_select();
  $("#canVectMenu").css("max-height", $("#canVect").css("height"));
  $("#canVectMenu").css("overflow", "auto");
}
