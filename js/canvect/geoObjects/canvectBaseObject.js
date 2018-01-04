function CVBaseObject(){
  var self = this;
  this.attributes = null;
  this.type = null;

  /**
  *  Default initializer that instanciate the attributes
  */
  this.baseInit = function(){
    this.attributes = Object.create(null);
    this.type = CVObjectType.BASE_OBJECT();
  }

  /**
  * Get object type
  * @return type
  */
  this.getType = function(){
    return this.type;
  }

  /**
  * Get object name
  * @return name
  */
  this.getAttributes = function(){
    return this.attributes;
  }

  /**
  * Add a value to the attributes object
  * @param att Attribute name to add
  * @param value Attribute value to add
  */
  this.addAttributes = function(att, value){
    this.attributes[att] = value;
  }

  /**
  * Remove a value of the attributes object
  * @param att Attribute name to remove
  */
  this.removeAttributes = function(att){
    delete this.attributes[att];
  }
}
