function CVPolygon(){
  var self = this;
  this.points = null;

  CVObject.call(this);

  /**
  *  Default initializer that instanciate the attributes
  */
  this.init = function(){
    this.baseInit();
    this.points = new Array();
    this.type = CVObjectType.POLYGON();
  }

  /**
  * Return the point array points
  */
  this.getPoints = function(){
    return this.points;
  }

  /**
  * Add a point (CVPoint) to array points
  * @param point The point to add
  */
  this.addPoint = function(point){
    this.points.push(point);
  }

  /**
  * Remove a point (CVPoint) from array points
  * @param idx The point at the index to remove
  */
  this.removePointAtIndex = function(idx){
    this.points.splice(idx, 1);
  }
}

CVPolygon.prototype = new CVObject();
CVPolygon.prototype.constructor = CVPolygon;
