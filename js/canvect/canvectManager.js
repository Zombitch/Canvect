function CVManager(){
  var self = this;
  this.engine = null;
  this.translateFactor = null;
  this.clickMode = null;

  this.baseInit = function(engine){
    this.engine = engine;
    this.clickMode = CVManager.MODE_CLICK();
    this.translateFactor = new CVPoint();
    this.translateFactor.init();
    this.translateFactor.setXY(0, 0);
  }

  /**
  * Display coordinate where is located the mouse on the canvas on the designated html element
  * @param htmlElement Html Element in which we should display the coordinates
  */
  this.setCoordinateDisplay = function(htmlElement){
    this.engine.getCanvas().addEventListener("mousemove", function(evt) {
        var rect = self.engine.getCanvas().getBoundingClientRect();
        var x = Math.round(evt.clientX - rect.left);
        var y = Math.round(evt.clientY - rect.top);
        var message = "Coordinates: " + x + " - " + y;
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
  * Manage on click event on canvas
  * @param callback Callback called when click is performed
  */
  this.addOnClickEvent = function(callback){
    if(callback !== undefined){
      this.engine.getCanvas().addEventListener("click", function(evt) {
        var rect = self.engine.getCanvas().getBoundingClientRect();
        var x = evt.clientX - rect.left;
        x += self.translateFactor.getX();
        var y = evt.clientY - rect.top;
        y += self.translateFactor.getY();
        callback(x, y);
      }, false);
    }
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
