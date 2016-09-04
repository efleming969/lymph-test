// these tests just write to console, since it's visual
var NodeLogging = require( './NodeLogging' )

NodeLogging.logger.warn( 'fail diff string', 'foo', 'bar' )

NodeLogging.logger.warn( 'fail diff object'
  , {name:'foo', age:20}
  , {name:'bar', age:20} )

NodeLogging.logger.warn( 'fail but not diffed' )
