var R = require( "ramda" )
var equals = require( "equals" )

exports.run = R.curry(
  function( logger, name, givens ) {
    var numberOfWhens = 0
    var numberOfWhensCalled = 0

    Object.keys( givens ).forEach(
      function( given ) {
        givens[ given ](
          function( whens ) {
            Object.keys( whens ).forEach(
              function( when ) {
                whens[ when ](
                  function( thens ) {
                    numberOfWhens += 1
                    Object.keys( thens ).forEach(
                      function( then ) {
                        if( thens[ then ].length === 2 ) {
                          if( equals( thens[ then ][ 0 ], thens[ then ][ 1 ] ) ) {
                            logger.log( name + ": " + given + " ! " + when + " > " + then )
                          }
                          else {
                            logger.log(
                              name + ": " + given + " ! " + when + " > " + then + ": "
                            , thens[ then ][ 0 ]
                            , thens[ then ][ 1 ] )
                          }
                        }
                        else if ( thens[ then ].length === 1 ) {
                          if ( Boolean( thens[ then ][ 0 ] ) ) {
                            logger.log( name + ": " + given + " ! " + when + " > " + then )
                          }
                          else {
                            logger.log( name + ": " + given + " ! " + when + " > " + then + ": " + thens[ then ][ 1 ]  )
                          }
                        }
                        else {
                          logger.log( "not implemented" )
                        }
                      } )
                    numberOfWhensCalled += 1
                  } )
              } )
          } )
      } )

    var interval = setInterval( function() {
      if ( numberOfWhens == numberOfWhensCalled ) {
        clearInterval( interval )
      }
    }, 100 )
  } )

