var R = require( "ramda" )
var equals = require( "equals" )

exports.run = R.curry( function( logger, name, tests ) {
  var numberOfTests = 0
  var numberOfTestsCalled = 0

  Object.keys( tests ).forEach( function( test ) {
    tests[ test ]( function( asserts ) {
        numberOfTests += 1
        Object.keys( asserts ).forEach( function( assert ) {
            if( asserts[ assert ].length === 2 ) {
              if( equals( asserts[ assert ][ 0 ], asserts[ assert ][ 1 ] ) ) {
                logger.log( name + ": " + test + " > " + assert )
              }
              else {
                logger.warn(
                  name + ": " + test + " > " + assert + ": "
                , asserts[ assert ][ 0 ]
                , asserts[ assert ][ 1 ] )
              }
            }
            else if ( asserts[ assert ].length === 1 ) {
              if ( Boolean( asserts[ assert ][ 0 ] ) ) {
                logger.log( name + ": " + test + " > " + assert )
              }
              else {
                logger.warn( name + ": " + test + " > " + assert + ": " + asserts[ assert ][ 1 ]  )
              }
            }
            else {
              logger.error( "not implemented" )
            }
          } )
        numberOfTestsCalled += 1
      } )
  } )

  var interval = setInterval( function() {
    if ( numberOfTests == numberOfTestsCalled ) {
      clearInterval( interval )
    }
  }, 100 )
  } )

