function CVManager(){
  var self = this;
  this.engine = null;
  this.clickMode = null;
  this.isMouseDown = null;
  this.objectList = null; //Contains all type of CVObject possible
  this.backgroundColor = null;

  this.baseInit = function(engine){
    this.engine = engine;
    this.objectList = new Array();
    this.isMouseDown = false;
    this.clickMode = CVManager.MODE_CLICK();
  }

  /**
  * Get the object list
  * @return array
  */
  this.getObjectList = function(){
    return this.objectList;
  }

  /**
  * Remove object from array LIST
  * @param idx
  * @param redraw
  */
  this.removeObjectAtIndex = function(idx, redraw){
    this.objectList.splice(idx, 1);

    if(redraw === true){
      this.engine.clearCanvas();
      this.draw(this.objectList);
    }
  }

  /**
  * Compute coordinate based on mouse position
  */
  this.computeCoordinates = function(evt){
    var rect = this.engine.getCanvas().getBoundingClientRect();
    var xValue = Math.round(evt.clientX - rect.left) - this.engine.getTranslateFactor().getValue().getX();
    var yValue = Math.round(evt.clientY - rect.top) - this.engine.getTranslateFactor().getValue().getY();
    return {x: xValue, y : yValue};
  }

  /**
  * Compute coordinate based on touch position
  */
  this.computeTouchCoordinates = function(evt){
    var touches = evt.changedTouches;
    var rect = this.engine.getCanvas().getBoundingClientRect();
    var xValue = Math.round(touches[0].pageX - rect.left) - this.engine.getTranslateFactor().getValue().getX();
    var yValue = Math.round(touches[0].pageY - rect.top) - this.engine.getTranslateFactor().getValue().getY();
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
  * Manage on touch start on canvas
  * @param callback Callback called when mouse mouve is performed
  */
  this.addOnTouchStartEvent = function(callback){
    if(callback !== undefined){
      this.engine.getCanvas().addEventListener("touchstart", function(evt) {
        evt.preventDefault();
        var coords = self.computeTouchCoordinates(evt);
        callback(coords.x, coords.y, evt);
      }, false);
    }
  }

  /**
  * Manage on touch end event on canvas
  * @param callback Callback called when mouse mouve is performed
  */
  this.addOnTouchEndEvent = function(callback){
    if(callback !== undefined){
      this.engine.getCanvas().addEventListener("touchend", function(evt) {
        evt.preventDefault();
        var coords = self.computeTouchCoordinates(evt);
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

  /**
  * Load JSON data file and draw it if needed
  * @param file File input object
  * @param shouldDraw Should system draw the all objets asap ?
  */
  this.loadDataFromDisk = function(e, shouldDraw){
    var self = this;
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(e) {
      var contents = e.target.result;
      var data = JSON.parse(contents);
      data.forEach(function(item){
        self.objectList.push(CVLoader.loadObject(item));
      });
      if(shouldDraw) self.draw(self.objectList);
    };
    reader.readAsText(file);
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
    if(this.backgroundColor != null) this.engine.fillCanvas(this.backgroundColor);
    this.engine.draw(objects, false);
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
