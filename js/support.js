
var commStyle = "color: #fff; border: #ccc; border-radius: 3px; font-size: 12px;"

var enemyStyle = commStyle + "background-color: #F44336;";
var heroStyle = commStyle + "background-color: #795548;";
var tipStyle = commStyle + "background-color: #2196F3;";

var log = function(){
  if(arguments.length > 1 && _typeOf(arguments[arguments.length-1]) === "string"){
    if( _typeOf(arguments[0]) === 'object'){
    arguments[0] = JSON.stringify(arguments[0]);
    }
    arguments[0] = '%c ' + arguments[0];
  }
  
  console.log.apply(console, arguments);
}

var class2type = {} ;
"Boolean Number String Function Array Date RegExp Object Error".split(" ").forEach(function(e,i){
    class2type[ "[object " + e + "]" ] = e.toLowerCase();
});
function _typeOf(obj) {
  if ( obj == null ){
      return String( obj );
  }
  return typeof obj === "object" || typeof obj === "function" ?
    class2type[ class2type.toString.call(obj) ] || "object" :
    typeof obj;
}