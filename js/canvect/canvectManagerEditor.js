function CVManagerEditor(){
  var self = this;
  this.debugFillColor = null;
  this.debugStrokeColor = null;
  this.object = null; //Current object drawing and editing

  CVManager.call(this);

  /**
  * Initialize editor manager with default values.
  * @param engine Engine to be used
  */
  this.init = function(engine){
    this.baseInit(engine);
    this.engine = engine;
  }

  /**
  * Fill the canvas with a color
  * @param color
  */
  this.canvasFillColor = function(color){
    this.debugFillColor = color;
    this.engine.fillCanvas(color);
  }

  /**
  * Stroke the canvas with a color
  * @param color
  */
  this.canvasStrokeColor = function(color){
    this.debugStrokeColor = color;
    this.engine.strokeCanvas(color);
  }

  /**
  * Clear canvas and object in memory
  * @param color
  */
  this.clearCanvas = function(){
    this.objectList = new Array();
    this.object = null;
    this.debugStrokeColor = null;
    this.debugFillColor = null;
    this.engine.clearCanvas();
  }

  /**
  * Create the object that will be created
  */
  this.createObject = function(objName, objType, objStrokeColor, objFillColor, glowColor, attributes, imgFile){

    if(objType == CVObjectType.POINT()){
      this.object = new CVPoint();
    }else if(objType == CVObjectType.RECTANGLE()){
      this.object = new CVRectangle();
    }else if(objType == CVObjectType.TRIANGLE()){
      this.object = new CVTriangle();
    }else if(objType == CVObjectType.CIRCLE()){
      this.object = new CVCircle();
    }else if(objType == CVObjectType.POLYGON()){
      this.object = new CVPolygon();
    }else if(objType == CVObjectType.OBJECT_LIST()){
      this.object = new CVPolygonList();
    }else if(objType == CVObjectType.IMAGE()){
      this.object = new CVImage();
    }

    this.object.init();
    this.object.setStrokeColor(objStrokeColor);
    this.object.setFillColor(objFillColor);
    if(glowColor != "") this.object.setGlow(glowColor, 10);
    this.object.setName(objName);

    //Custom initialization
    if(objType == CVObjectType.IMAGE()){
      this.object.loadImage(imgFile);
    }

    if(typeof attributes !== "undefined" && attributes.length > 0){
      this.object.setAttributes(JSON.parse(attributes));
    }
  }

  /**
  * Save current object in object list
  */
  this.saveObject = function(){
    if(this.object != null){
      this.objectList.push(this.object);
      this.object = null;
    }
  }

  /**
  * Close the current polygon.
  */
  this.closePolygonObject = function(){
    if(this.object != null && this.object.getType() == CVObjectType.POLYGON()){
      this.object.setClosed(true);
      var tmpObjList = this.objectList.slice();
      tmpObjList.push(this.object);
      this.draw(tmpObjList);
    }
  }

  /**
  * Get current object
  * @return object
  */
  this.getObject = function(){
    return this.object;
  }

  /**
  * Draw elements on canvas
  * @param objects The objects to draw in canvas
  */
  this.draw = function(objects){
    var translate = this.engine.getTranslateFactor().getValue();
    var translateTmp = this.engine.getTranslateFactor().getTmpValue();
    this.engine.getContext().resetTransform();
    this.engine.clearCanvas();
    this.engine.getContext().translate(translate.getX() + translateTmp.getX(), translate.getY() + translateTmp.getY());

    if(this.backgroundColor != null) this.canvasFillColor(this.backgroundColor);
    if(this.debugStrokeColor != null) this.canvasStrokeColor(this.debugStrokeColor);
    this.engine.draw(objects, true);
  }

  /**
  * Click event happened on canvas
  * @param x
  * @param y
  */
  this.clickEvent = function(x, y, evt){
    if(self.object != null && !evt.shiftKey){
      var tmpObjList = self.objectList.slice();

      if(self.object.getType() == CVObjectType.POINT() || self.object.getType() == CVObjectType.IMAGE()){
        self.object.setXY(x, y);
      }else if(self.object.getType() == CVObjectType.RECTANGLE()){
        if(self.object.getX() == null || self.object.getY() == null) self.object.setXY(x, y);
        else self.object.computePositionAndSize(self.object.getX(), self.object.getY(), x, y);
      }else if(self.object.getType() == CVObjectType.TRIANGLE()){
        self.object.addPoint(x, y);
      }else if(self.object.getType() == CVObjectType.CIRCLE()){
        if(self.object.getX() == null || self.object.getY() == null) self.object.setXY(x, y);
        else self.object.computeRadius(x, y);
      }else if(self.object.getType() == CVObjectType.POLYGON()){
        self.object.addPoint(x, y);
      }else if(self.object.getType() == CVObjectType.OBJECT_LIST()){

      }
      tmpObjList.push(self.object);

      //Draw element on the canvas
      self.draw(tmpObjList);
    }else{
      self.objectList.forEach(function(element){
        console.log(element.isPointInside(x, y));
      });
    }
  }
}

CVManagerEditor.prototype = new CVManager();
CVManagerEditor.prototype.constructor = CVManagerEditor;
