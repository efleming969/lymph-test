var BrowserLogging = require( './BrowserLogging' )

module.exports = {

  'formatting a failing test': function( assert ) {

    var actual = BrowserLogging.formatMessage( 'not same', 'foo', 'bar' )

    var expected = [
        '%cnot same%cfoo|%cbar'
      , 'color:black'
      , 'color:red'
      , 'color:green'
      ] 

    assert( { 'msg should be': [ actual , expected ] } )
  } 

, 'given undefined values': function( assert ) {

    var actual = BrowserLogging.formatMessage( '', undefined, undefined )
    var expected = [ '' ] 

    assert( { 'msg should be': [ actual , expected ] } )
  } 

}
