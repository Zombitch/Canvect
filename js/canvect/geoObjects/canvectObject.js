function CVObject(){
  var self = this;
  this.attributes = null;
  this.name = null;
  this.type = null;
  this.strokeColor = null;
  this.fillColor = null;
  this.show = null;

  /**
  *  Default initializer that instanciate the attributes
  */
  this.baseInit = function(){
    this.attributes = Object.create(null);
    this.type = CVObjectType.OBJECT();
    this.show = true;
  }

  /**
  * Get object type
  * @return type
  */
  this.getType = function(){
    return this.type;
  }

  /**
  * Set object name
  * @param name
  */
  this.setName = function(name){
    this.name = name;
  }

  /**
  * Get object name
  * @return name
  */
  this.getName = function(){
    return this.name;
  }

  /**
  * Set object show
  * @param show
  */
  this.setShow = function(show){
    this.show = show;
  }

  /**
  * Get object show
  * @return show
  */
  this.getShow = function(){
    return this.show;
  }

  /**
  * Set stroke color
  * @param color
  */
  this.setStrokeColor = function(color){
    this.strokeColor = color;
  }

  /**
  * Get stroke color
  * @return color
  */
  this.getStrokeColor = function(){
    return this.strokeColor;
  }

  /**
  * Set fill color
  * @param color
  */
  this.setFillColor = function(color){
    this.fillColor = color;
  }

  /**
  * Get fill color
  * @return color
  */
  this.getFillColor = function(){
    return this.fillColor;
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
