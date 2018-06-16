function CVLoader(){}

CVLoader.loadObject = function(data){
  var object = null;
  if(data.type == CVObjectType.CIRCLE()) object = new CVCircle();
  else if(data.type == CVObjectType.POINT())  object = new CVPoint();
  else if(data.type == CVObjectType.RECTANGLE())  object = new CVRectangle();
  else if(data.type == CVObjectType.TRIANGLE())  object = new CVTriangle();
  else if(data.type == CVObjectType.POLYGON())  object = new CVPolygon();
  else if(data.type == CVObjectType.IMAGE())  object = new CVImage();

  object.init();
  object.load(data);
  return object;
};
