var Core = require( './Core' )
var ListLogger = require( './ListLogger' )

var equals = require( 'equals' )

var listLogger = new ListLogger()
var runWithTestLogger = Core.run( listLogger )

runWithTestLogger(
  'g'
, { 'w': function( when )
    {
      when(
        { 'checking a true value': function( then )
          {
            then( { 'p': [ true ] } )
          }
        , 'checking a false value': function( then )
          {
            then( { 'f': [ false ] } )
          }
        , 'comparing 2 equal strings': function( then )
          {
            then( { 'p': [ 'foo', 'foo' ] } )
          }
        , 'comparing 2 different strings': function( then )
          {
            then( { 'f': [ 'bar', 'foo' ] } )
          }
        , 'calling something async': function( then )
          {
            setTimeout(
              function()
              {
                then( { 't': [ true ] } )
              }
            )
          }
        , 'checking multiple thens': function( then )
          {
            then(
              { 't1': [ 'foo', 'foo' ]
              , 't2': [ 'foo', 'foo' ]
              }
            )
          }
        }
      )
    }
  }
)

setTimeout(
  function()
  {
    var success = equals(
      listLogger.messages
    , [ 'g: w ! checking a true value > p'
      , 'g: w ! checking a false value > f: undefined'
      , 'g: w ! comparing 2 equal strings > p'
      , 'g: w ! comparing 2 different strings > f: bar|foo'
      , 'g: w ! checking multiple thens > t1'
      , 'g: w ! checking multiple thens > t2'
      , 'g: w ! calling something async > t'
      ]
    )

    if ( !success )
    {
      console.log( '=================' )
      console.log( listLogger.messages )
      console.log( '=================' )
    }
  }
)

