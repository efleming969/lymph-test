var R = require( 'ramda' )
var JSDiff = require( 'diff')
var Chalk = require( 'chalk' )

var formatDiffs = exports.formatMessage = function( a, b ) {

  var colored = function( part ) {
    if( part.added )
      return Chalk.green( part.value ) 
    else if( part.removed )
      return Chalk.red( part.value ) 
    else
      return Chalk.grey( part.value ) 
  }

  var getDiffs = function( a, b ) {
    if ( typeof a === 'string' )
      return JSDiff.diffChars( a, b )
    else
      return JSDiff.diffJson( a, b )
  }

  var diffs = getDiffs( a, b )

  return R.prepend( msg, R.map( colored, diffs ) )
}

exports.logger = {
  log: console.log.bind( console )
, warn: function( msg, a, b ) {
    console.log( Chalk.bgRed( msg ), formatDiffs( a, b ) )
  }
}
