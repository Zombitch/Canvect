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
