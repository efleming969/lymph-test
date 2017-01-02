module.exports = {

  '1: checking a true value': function( assert ) {
    assert( { 'p': [ true ] } )
  }

, '2: comparing 2 equal strings': function( assert ) {
    assert( { 'p': [ 'foo', 'foo' ] } )
  }

, '3: calling something async': function( assert ) {
    setTimeout( function() { assert( { 't': [ true ] } ) } )
  }

, '4: calling an async that takes a while': function( assert ) {
    setTimeout( function() { assert( { 't': [ true ] } ) }
    , 3000 )
  }

, '5: checking multiple asserts': function( assert ) {
    assert(
      { 't1': [ 'foo', 'foo' ]
      , 't2': [ 'foo', 'foo' ]
      } )
  }

, '6: checking multiple asserts in an async': function( assert ) {
    setTimeout( function() {
      var conditions = {
        't1': [ 'foo', 'foo' ]
      , 't2': [ 'foo', 'foo' ]
      }

      assert( conditions )
    }, 3000 )
  }

}
