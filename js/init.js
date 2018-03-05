var engine = null;
var manager = null;

/**
* Default initialization for all libraries (materialize, canvect, etc..)
*/
$(document).ready(function(){
  MaterializeCustomInit();
  runEngine();
});

function runEngine(){
  engine = new CVEngine();
  manager = new CVManagerEditor();
  engine.init("canVect");
  manager.init(engine);
  manager.canvasStrokeColor(CVColor.BLUE());
  manager.setCoordinateDisplay("coordinates");
  manager.addOnMouseDownEvent(manager.mouseDownEvent);
  manager.addOnMouseUpEvent(manager.mouseUpEvent);
  manager.addOnClickEvent(manager.clickEvent);
  manager.addOnMouseMouveEvent(manager.mouseMoveEvent);
}

function showObjectList(){
  $("#objectCollection").html("");
  manager.getObjectList().forEach(function(element, index){
    $("#objectCollection").append('<li class="collection-item dismissable"><div>'+element.getName()+'<a href="javascript:closeObjectModal();javascript:manager.removeObjectAtIndex('+index+1+', true);" class="secondary-content"><i class="material-icons blue-text">delete</i></a></div></li>');
  });

  $("#showObjectModal").modal('open');
}

function closeObjectModal(){
  $("#showObjectModal").modal("close");
}
