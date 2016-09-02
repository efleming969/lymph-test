module.exports = {

  '1: checking a true value': function( assert ) {
    assert( { 'p': [ true ] } )
  }

, '2: checking a false value': function( assert ) {
    assert( { 'f': [ false ] } )
  }

, '3: comparing 2 equal strings': function( assert ) {
    assert( { 'p': [ 'foo', 'foo' ] } )
  }

, '4: comparing 2 different strings': function( assert ) {
    assert( { 'f': [ 'bar', 'foo' ] } )
  }

, '5: calling something async': function( assert ) {
    setTimeout(
      function() {
        assert( { 't': [ true ] } )
      } )
  }

, '6: calling an async that takes a while': function( assert ) {
    setTimeout(
        function() {
          assert( { 't': [ true ] } )
        }
      , 3000 )
  }

, '7: checking multiple asserts': function( assert ) {
    assert(
      { 't1': [ 'foo', 'foo' ]
      , 't2': [ 'foo', 'foo' ]
      } )
  }

, '8: checking multiple asserts in an async': function( assert ) {
    setTimeout( function() {
      var conditions = {
        't1': [ 'foo', 'foo' ]
      , 't2': [ 'foo', 'foo' ]
      }

      assert( conditions )
    }, 3000 )
  }

}
