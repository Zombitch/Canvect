function CVColor()
{
}

CVColor.RANDOM = function(){
    var red = getRandomNumber(0, 255);
    var green = getRandomNumber(0, 255);
    var blue = getRandomNumber(0, 255);
    return "rgb("+ red.toString() + "," + green.toString() + "," + blue.toString() + ")";
};

CVColor.RGB = function(red, green, blue){
    return "rgb("+ red.toString() + "," + green.toString() + "," + blue.toString() + ")";
};

CVColor.RGBA = function(red, green, blue, alpha){
    return "rgba("+ red.toString() + "," + green.toString() + "," + blue.toString() + "," + alpha.toString() + ")";
};

CVColor.BLACK = function(){
    return "#000000";
};

CVColor.WHITE = function(){
    return "#FFFFFF";
};

CVColor.RED = function(){
    return "#FF0000";
};

CVColor.BLUE = function(){
    return "#0000FF";
};

CVColor.GREEN = function(){
    return "#00FF00";
};
