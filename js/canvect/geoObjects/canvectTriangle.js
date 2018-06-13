function CVTriangle(){
  var self = this;

  CVPolygon.call(this);

  /**
  *  Default initializer that instanciate the attributes
  */
  this.init = function(){
    this.baseInit();
    this.type = CVObjectType.TRIANGLE();
    this.points = new Array();
  }

  /**
  * Add a point to the triangle and check there are no more than 3 points
  * @param x X position
  * @param y Y Position
  */
  this.addPoint = function(x, y){
    var point = new CVPoint();
    point.init();
    point.setXY(x, y);

    if(this.points.length < 3){
      this.points.push(point);
    }else{
      this.points[2] = point;
    }
  }

  /**
  * Draw partial CVTriangle on the canvas.
  * This means the system will try to draw something with available data even if all data are not set.
  * For instance, if the triangl does not specify third point, then it will display a line.
  * @param ctx Canvas context
  */
  this.drawPartial = function(ctx){
    this.preDraw(ctx);
    if(this.strokeColor != null){
      ctx.strokeStyle = this.strokeColor;

      if(this.points.length == 3){
        this.draw(ctx);
      }else if(this.points.length == 2){
        ctx.beginPath();
        ctx.moveTo(this.points[0].getX(), this.points[0].getY());
        ctx.lineTo(this.points[1].getX(), this.points[1].getY());
        ctx.stroke();
      }else if(this.points.length == 1){
        ctx.strokeRect(this.points[0].getX(), this.points[0].getY(), 1, 1);
      }
    }
    this.postDraw(ctx);
  }

  /**
  * Draw the CVTriangle on the canvas
  * @param ctx Canvas context
  */
  this.draw = function(ctx){
    this.preDraw(ctx);
    if(this.strokeColor != null){
      ctx.strokeStyle = this.strokeColor;
      ctx.beginPath();
      ctx.moveTo(this.points[0].getX(), this.points[0].getY());
      ctx.lineTo(this.points[1].getX(), this.points[1].getY());
      ctx.lineTo(this.points[2].getX(), this.points[2].getY());
      ctx.closePath();
      ctx.stroke();
    }
    this.postDraw(ctx);
  }
}

CVTriangle.prototype = new CVPolygon();
CVTriangle.prototype.constructor = CVTriangle;
