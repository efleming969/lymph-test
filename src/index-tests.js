console.log( 'index-tests' )

var Core = require( './Core' )
var BrowserLogging = require( './BrowserLogger' )

var run = Core.run( BrowserLogging.logger )

run( 'core', require( './CoreTests' ) )
run( 'browser logging', require( './BrowserLoggingTests' ) )
