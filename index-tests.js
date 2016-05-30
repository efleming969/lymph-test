var LymphTest = require( './index' )
var equals = require( 'equals' )

var TestLogger = function()
{
  this.messages = []
}

TestLogger.prototype.log = function( msg, a, b )
{
  if ( a === undefined && b === undefined )
    this.messages.push( msg )
  else
    this.messages.push( msg + a + '|' + b )
}

var testLogger = new TestLogger()

LymphTest.run(
  testLogger
, 'g'
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
        }
      )
    }
  }
)

setTimeout(
  function()
  {
    var success = equals(
      testLogger.messages
    , [ 'g: w ! checking a true value > p'
      , 'g: w ! checking a false value > f: undefined'
      , 'g: w ! comparing 2 equal strings > p'
      , 'g: w ! comparing 2 different strings > f: bar|foo'
      , 'g: w ! calling something async > t'
      ]
    )

    if ( !success )
    {
      console.log( '=================' )
      console.log( testLogger.messages )
      console.log( '=================' )
    }
  }
)

