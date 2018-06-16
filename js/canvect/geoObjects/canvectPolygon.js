function CVPolygon(){
  var self = this;
  this.points = null; //The third point
  this.closed = null;

  CVObject.call(this);

  /**
  *  Default initializer that instanciate the attributes
  */
  this.init = function(){
    this.baseInit();
    this.type = CVObjectType.POLYGON();
    this.points = new Array();
  }

  /**
  * Set closed attributes that determine if the polygon is closed or not
  * @param closed
  */
  this.setClosed = function(closed){
    this.closed = closed
  }

  /**
  * Get closed attributes that determine if the polygon is closed or not
  * @return closed
  */
  this.getClosed = function(closed){
    return this.closed;
  }

  /**
  * Add a point to the polygon
  * @param x X position
  * @param y Y Position
  */
  this.addPoint = function(x, y){
    var point = new CVPoint();
    point.init();
    point.setXY(x, y);
    this.points.push(point);
  }

  /**
  * Get the point list
  * @return Array points
  */
  this.getPoints = function(){
    return this.points;
  }

  /**
  * Check if a point is insde the polygon or not
  * @param x X point to check
  * @param y Y point to check
  */
  this.isPointInside = function(x, y){
    for(var isIn = false, i = -1, l = this.points.length, j = l - 1; ++i < l; j = i)
        ((this.points[i].getY() <= y && y < this.points[j].getY()) || (this.points[j].getY() <= y && y < this.points[i].getY()))
        && (x < (this.points[j].getX() - this.points[i].getX()) * (y - this.points[i].getY()) / (this.points[j].getY() - this.points[i].getY()) + this.points[i].getX())
        && (isIn = !isIn);
    return isIn;
  }

  /**
  * Draw partial CVPolygon on the canvas.
  * This means the system will try to draw something with available data even if all data are not set.
  * For instance, if the polygon does not specify third point, then it will display a line.
  * @param ctx Canvas context
  */
  this.drawPartial = function(ctx){
    this.preDraw(ctx);
    if(this.strokeColor != null){
      ctx.strokeStyle = this.strokeColor;

      if(this.points.length > 1){
        this.draw(ctx);
      }else if(this.points.length == 1){
        ctx.strokeRect(this.points[0].getX(), this.points[0].getY(), 1, 1);
      }
    }
  }

  /**
  * Draw the CVRectangle on the canvas
  * @param ctx Canvas context
  */
  this.draw = function(ctx){
    this.preDraw(ctx);

    ctx.beginPath();
    ctx.moveTo(this.points[0].getX(), this.points[0].getY());
    for(var idx = 1; idx < this.points.length; idx++){
      ctx.lineTo(this.points[idx].getX(), this.points[idx].getY());
    }

    if(this.closed) ctx.closePath();

    //Stroke and fill the path
    this.applyColor(ctx);
  }
}

CVPolygon.prototype = new CVObject();
CVPolygon.prototype.constructor = CVPolygon;
