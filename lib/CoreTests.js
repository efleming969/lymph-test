var R = require( 'ramda' )
var equals = require( 'equals' )

var Core = require( './Core' )
var ListLogger = require( './ListLogger' )

var listLogger = new ListLogger()
var runWithTestLogger = Core.run( listLogger )
var logit = console.log.bind( console )

var whenDone = runWithTestLogger(
  'g'
, { 'w': function( when )
    {
      when(
        { '1: checking a true value': function( then )
          {
            then( { 'p': [ true ] } )
          }
        , '2: checking a false value': function( then )
          {
            then( { 'f': [ false ] } )
          }
        , '3: comparing 2 equal strings': function( then )
          {
            then( { 'p': [ 'foo', 'foo' ] } )
          }
        , '4: comparing 2 different strings': function( then )
          {
            then( { 'f': [ 'bar', 'foo' ] } )
          }
        , '5: calling something async': function( then )
          {
            setTimeout(
              function()
              {
                then( { 't': [ true ] } )
              }
            )
          }
        , '6: calling an async that takes a while': function( then )
          {
            setTimeout(
                function()
                {
                  then( { 't': [ true ] } )
                }
              , 3000
              )
          }
        , '7: checking multiple thens': function( then )
          {
            then(
              { 't1': [ 'foo', 'foo' ]
              , 't2': [ 'foo', 'foo' ]
              }
            )
          }
        , '8: checking multiple thens in an async': function( then )
          {
            setTimeout( function() {
              var conditions = {
                't1': [ 'foo', 'foo' ]
              , 't2': [ 'foo', 'foo' ]
              }

              then( conditions )
            }, 3000 )
          }
        }
      )
    }
  }
)

whenDone( function() {
  R.forEach( logit, listLogger.messages )
} )
