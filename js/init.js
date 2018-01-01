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
  manager.addOnClickEvent(manager.clickEvent);
}
