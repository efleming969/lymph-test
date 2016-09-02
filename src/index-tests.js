console.log( 'index-tests' )

var LymphTest = require( './index' )

var run = LymphTest.Core.run( LymphTest.BrowserLogging.logger )

run( 'core', require( './CoreTests' ) )
// run( 'browser logging', require( './BrowserLoggingTests' ) )

