function CVObjectList(){
  var self = this;
  this.objects = null;

  CVObject.call(this);

  /**
  *  Default initializer that instanciate the attributes
  */
  this.init = function(){
    this.baseInit();
    this.objects = new Array();
    this.type = CVObjectType.OBJECT_LIST();
  }

  /**
  * Return the objects array
  */
  this.getObjects = function(){
    return this.objects;
  }

  /**
  * Add an object to objects polygons
  * @param obj The object to add
  */
  this.addObject = function(obj){
    this.objects.push(obj);
  }

  /**
  * Remove an object (CVObject) from array objects
  * @param idx The object at the index to remove
  */
  this.removeObjectAtIndex = function(idx){
    this.objects.splice(idx, 1);
  }
}

CVObjectList.prototype = new CVObject();
CVObjectList.prototype.constructor = CVObjectList;
