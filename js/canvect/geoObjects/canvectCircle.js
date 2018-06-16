function CVCircle(){
  var self = this;
  var radius = null;
  CVPoint.call(this);

  /**
  *  Default initializer that instanciate the attributes
  */
  this.init = function(){
    this.baseInit();
    this.type = CVObjectType.CIRCLE();
  }

  /**
  * Compute computeRadius
  * @param x X coordinate value
  * @param x Y coordinate value
  */
  this.computeRadius = function(x, y){
    this.radius = Math.sqrt(Math.pow(x - this.x, 2) + Math.pow(y - this.y, 2));
  }

  /**
  * Draw partial CVPolygon on the canvas.
  * This means the system will try to draw something with available data even if all data are not set.
  * For instance, if the polygon does not specify third point, then it will display a line.
  * @param ctx Canvas context
  */
  this.drawPartial = function(ctx){
    this.preDraw(ctx);
    if(this.strokeColor != null) ctx.strokeStyle = this.strokeColor;
    if(this.fillColor != null) ctx.fillStyle = this.fillColor;

    if(this.radius == null){
      ctx.strokeRect(this.x, this.y, 1, 1);
    }else{console.log("full");
      this.draw(ctx);
    }
  }

  /**
  * Draw the CVRectangle on the canvas
  * @param ctx Canvas context
  */
  this.draw = function(ctx){
    this.preDraw(ctx);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);

    //Stroke and fill the path
    this.applyColor(ctx);
  }
}

CVPolygon.prototype = new CVPoint();
CVPolygon.prototype.constructor = CVCircle;
