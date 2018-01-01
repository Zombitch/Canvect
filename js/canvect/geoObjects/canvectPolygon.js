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
  * Draw partial CVPolygon on the canvas.
  * This means the system will try to draw something with available data even if all data are not set.
  * For instance, if the polygon does not specify third point, then it will display a line.
  * @param ctx Canvas context
  */
  this.drawPartial = function(ctx){
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
    if(this.strokeColor != null){
      ctx.strokeStyle = this.strokeColor;
      ctx.beginPath();
      ctx.moveTo(this.points[0].getX(), this.points[0].getY());
      for(var idx = 1; idx < this.points.length; idx++){
        ctx.lineTo(this.points[idx].getX(), this.points[idx].getY());
      }

      if(this.closed) ctx.closePath();
      ctx.stroke();
    }
  }
}

CVPolygon.prototype = new CVObject();
CVPolygon.prototype.constructor = CVPolygon;
