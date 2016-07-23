var R = require( "ramda" )
var JSDiff = require( "diff")

var formatMessage = exports.formatMessage = function( msg, a, b ) {

  var getPartColor = function( part ) {
    if( part.added )
      return "green"
    else if( part.removed )
      return "red"
    else
      return "grey"
  }

  var getColorStyle = function( color ) {
    return "color:" + color
  }

  var getPartValue = function( part ) {
    return "%c" + part.value
  }

  var getDiffs = function( a, b ) {
    if ( typeof a === "string" )
      return JSDiff.diffChars( a, b )
    else
      return JSDiff.diffJson( a, b )
  }

  if ( a == undefined || b == undefined ) {
    return [ msg ]
  }

  var diffs = getDiffs( a, b )

  var values = R.map( getPartValue, diffs )
  var styles = R.map( R.pipe( getPartColor, getColorStyle ), diffs )

  return R.prepend(
    "%c" + msg + values.join( "|" ),
    R.prepend( "color:black", styles ) )
}

exports.logger = {
  log: function( msg, a, b ) {
    console.log.apply( console, formatMessage( msg, a, b ) )
  }
}
