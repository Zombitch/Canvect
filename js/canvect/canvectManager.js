function CVManager(){
  var self = this;
  this.engine = null;
  this.clickMode = null;
  this.isMouseDown = null;
  this.objectList = null; //Contains all type of CVObject possible

  this.baseInit = function(engine){
    this.engine = engine;
    this.isMouseDown = false;
    this.clickMode = CVManager.MODE_CLICK();
  }

  this.computeCoordinates = function(evt){
    var rect = this.engine.getCanvas().getBoundingClientRect();
    var xValue = Math.round(evt.clientX - rect.left) - this.engine.getTranslateFactor().getValue().getX();
    var yValue = Math.round(evt.clientY - rect.top) - this.engine.getTranslateFactor().getValue().getY();
    return {x: xValue, y : yValue};
  }

  /**
  * Display coordinate where is located the mouse on the canvas on the designated html element
  * @param htmlElement Html Element in which we should display the coordinates
  */
  this.setCoordinateDisplay = function(htmlElement){
    this.engine.getCanvas().addEventListener("mousemove", function(evt) {
        var coords = self.computeCoordinates(evt);
        var message = "Coordinates: " + coords.x + " - " + coords.y;
        document.getElementById(htmlElement).innerHTML = message;
    }, false);
  }

  /**
  * Manage on key down or up event on canvas
  * @param callback Callback called when key down or up is performed
  */
  this.addKeyboardEvent = function(keyDownCallback, keyUpCallback){
    if(keyDownCallback !== undefined){
      window.addEventListener("keydown", function(evt) {
        keyDownCallback(evt.keyCode);
      }, true);
    }
    if(keyUpCallback !== undefined){
      window.addEventListener("keyup", function(evt) {
        keyUpCallback(evt.keyCode);
      }, true);
    }
  }

  /**
  * Manage on mouse down event on canvas
  * @param callback Callback called when mouse down is performed
  */
  this.addOnMouseDownEvent = function(callback){
    this.engine.getCanvas().addEventListener("mousedown", function(evt) {
      self.isMouseDown = true;
      var coords = self.computeCoordinates(evt);

      if(callback !== undefined) callback(coords.x, coords.y, evt);
    }, false);
  }

  /**
  * Manage on mouse up event on canvas
  * @param callback Callback called when mouse up is performed
  */
  this.addOnMouseUpEvent = function(callback){
    this.engine.getCanvas().addEventListener("mouseup", function(evt) {
      self.isMouseDown = false;
      var coords = self.computeCoordinates(evt);

      if(callback !== undefined) callback(coords.x, coords.y, evt);
    }, false);
  }

  /**
  * Manage on click event on canvas
  * @param callback Callback called when click is performed
  */
  this.addOnClickEvent = function(callback){
    if(callback !== undefined){
      this.engine.getCanvas().addEventListener("click", function(evt) {
        var coords = self.computeCoordinates(evt);
        callback(coords.x, coords.y, evt);
      }, false);
    }
  }

  /**
  * Manage on mouse mouve event on canvas
  * @param callback Callback called when mouse mouve is performed
  */
  this.addOnMouseMouveEvent = function(callback){
    if(callback !== undefined){
      this.engine.getCanvas().addEventListener("mousemove", function(evt) {
        var coords = self.computeCoordinates(evt);
        callback(coords.x, coords.y, evt);
      }, false);
    }
  }

  /**
  * This is the default Mouse down event management. It can be overriden in children class
  * @param x
  * @param y
  */
  this.mouseDownEvent = function(x, y, evt){
    if(evt.shiftKey){
      self.clickMode = CVManager.MODE_TRANSLATE();
      self.engine.getTranslateFactor().setStartValue(x, y);
    }
  }

  /**
  * This is the default Mouse up event management. It can be overriden in children class
  * @param x
  * @param y
  */
  this.mouseUpEvent = function(x, y, evt){
    if(self.clickMode == CVManager.MODE_TRANSLATE()){
      var tmpValue = self.engine.getTranslateFactor().getTmpValue();
      var value = self.engine.getTranslateFactor().getValue();
      self.clickMode = CVManager.MODE_CLICK();
      self.engine.getTranslateFactor().setValue(value.getX() + tmpValue.getX(), value.getY() + tmpValue.getY());
      self.engine.getTranslateFactor().setTmpValue(0, 0);
    }
  }

  /**
  * This is the default Mouse mouve event management. It can be overriden in children class
  * @param x
  * @param y
  */
  this.mouseMoveEvent = function(x, y, evt){
    if(self.clickMode == CVManager.MODE_TRANSLATE() && self.isMouseDown){
      var translateFactorTmp = self.engine.getTranslateFactor().getStartValue();
      self.engine.getTranslateFactor().setTmpValue(x - translateFactorTmp.getX(), y - translateFactorTmp.getY());
      self.draw(self.objectList);
    }
  }

  /**
  * Download canvect data objects stored in engine memory
  */
  this.downloadData = function(){
    uriContent = "data:application/octet-stream," + encodeURIComponent(JSON.stringify(this.objectList));
    window.open(uriContent, "test");
  }
};

CVManager.MODE_CLICK = function(){
    return 1;
};

CVManager.MODE_TRANSLATE = function(){
    return 2;
};

CVManager.MODE_SCALE = function(){
    return 3;
};
