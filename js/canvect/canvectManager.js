function CVManager(){
  var self = this;
  this.engine = null;

  this.baseInit = function(engine){
    this.engine = engine;
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
  * Manage on click event on canvas
  * @param callback Callback called when click is performed
  */
  this.addOnClickEvent = function(callback){
    if(callback !== undefined){
      this.engine.getCanvas().addEventListener("click", function(evt) {
        var rect = self.engine.getCanvas().getBoundingClientRect();
        callback(evt.clientX - rect.left, evt.clientY - rect.top);
      }, false);
    }
  }
}
