var R = require( "ramda" )
var JSDiff = require( "diff")
var equals = require( "equals" )

var diffForConsole = function( msg, a, b )
{
  var getPartColor = function( part )
  {
    if( part.added )
      return "green"
    else if( part.removed )
      return "red"
    else
      return "grey"
  }

  var getColorStyle = function( color )
  {
    return "color:" + color
  }

  var getPartValue = function( part )
  {
    return "%c" + part.value
  }

  var getDiffs = function( a, b )
  {
    if ( typeof a === "string" )
      return JSDiff.diffChars( a, b )
    else
      return JSDiff.diffJson( a, b )
  }

  var diffs = getDiffs( a, b )

  var values = R.map( getPartValue, diffs )
  var styles = R.map( R.pipe( getPartColor, getColorStyle ), diffs )

  return R.prepend(
    "%c" + msg + values.join( "|" ),
    R.prepend( "color:black", styles )
  )
}

exports.run = R.curry(
  function( logger, name, givens, done )
  {
    var numberOfWhens = 0
    var numberOfWhensCalled = 0

    Object.keys( givens ).forEach(
      function( given )
      {
        givens[ given ](
          function( whens )
          {
            Object.keys( whens ).forEach(
              function( when )
              {
                whens[ when ](
                  function( thens )
                  {
                    numberOfWhens += 1

                    Object.keys( thens ).forEach(
                      function( then )
                      {
                        console.log( when )

                        if( thens[ then ].length === 2 )
                        {
                          if( equals( thens[ then ][ 0 ], thens[ then ][ 1 ] ) )
                          {
                            logger.log( name + ": " + given + " ! " + when + " > " + then )
                          }
                          else
                          {
                            logger.log(
                              name + ": " + given + " ! " + when + " > " + then + ": "
                            , thens[ then ][ 0 ]
                            , thens[ then ][ 1 ]
                            )
                          }
                        }
                        else if ( thens[ then ].length === 1 )
                        {
                          if ( Boolean( thens[ then ][ 0 ] ) )
                          {
                            logger.log( name + ": " + given + " ! " + when + " > " + then )
                          }
                          else
                          {
                            logger.log( name + ": " + given + " ! " + when + " > " + then + ": " + thens[ then ][ 1 ]  )
                          }
                        }
                        else
                        {
                          logger.log( "not implemented" )
                        }
                      }
                    )
                    numberOfWhensCalled += 1
                  }
                )
              }
            )
          }
        )
      }
    )

    var interval = setInterval( function() {
      if ( numberOfWhens == numberOfWhensCalled )
      {
        clearInterval( interval )
      }
    }, 100 )
  }
)

