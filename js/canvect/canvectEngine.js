function CVEngine(){
  var self = this;
  this.canvas = null;
  this.context = null;
  this.translateFactor = null;

  /**
  * Initialize canvect engine, retreiving canvas context.
  * @param canvasId Html Id of the canvasId
  */
  this.init = function(canvasId){
    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext("2d");
    this.setCanvasSize(this.canvas.offsetWidth, this.canvas.offsetHeight);

    this.translateFactor = new CVTransformFactor();
    this.translateFactor.init();
  }

  /**
  * Get current canvas
  * @return canvas
  */
  this.getCanvas = function(){
    return this.canvas;
  }

  /**
  * Get current canvas context
  * @return canvas context
  */
  this.getContext = function(){
    return this.context;
  }

  /**
  * Get translate factor
  * @return translate factor
  */
  this.getTranslateFactor = function(){
    return this.translateFactor;
  }

  /**
  * Set canvas width and height
  * @param width
  * @param height
  */
  this.setCanvasSize = function(width, height){
    this.canvas.width = width;
    this.canvas.height = height;
  }

  /**
  * Fill the entire canvas with a color
  * @param color Filling color
  */
  this.fillCanvas = function(color){
    var translateFactorValue = this.translateFactor.getValue();
    var translateFactorValueTmp = this.translateFactor.getTmpValue();
    this.context.fillStyle = color;
    this.context.fillRect(-translateFactorValue.getX()-translateFactorValueTmp.getX(), -translateFactorValue.getY()-translateFactorValueTmp.getY(), this.canvas.width, this.canvas.height);
  }

  /**
  * Stroke the entire canvas with a color
  * @param color Stroking color
  */
  this.strokeCanvas = function(color){
    var translateFactorValue = this.translateFactor.getValue();
    var translateFactorValueTmp = this.translateFactor.getTmpValue();
    console.log(translateFactorValue);
    this.context.strokeStyle = color;
    this.context.strokeRect(-translateFactorValue.getX()-translateFactorValueTmp.getX(), -translateFactorValue.getY()-translateFactorValueTmp.getY(), this.canvas.width, this.canvas.height);
  }

  /**
  * Clear entire canvas
  */
  this.clearCanvas = function(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  this.draw = function(objList, drawPartial){
    for (var idx = 0; idx < objList.length; idx++) {
      var obj = objList[idx];

      if(drawPartial) obj.drawPartial(this.context);
      else obj.draw(this.context);
    }
  }
}
