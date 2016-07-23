var BrowserLogging = require( './BrowserLogging' )

module.exports = {

  'g': function( when ) {

    when( {

      'formatting a failing test': function( then ) {

        var actual = BrowserLogging.formatMessage( 'not same', 'foo', 'bar' )

        var expected = [
            '%cnot same%cfoo|%cbar'
          , 'color:black'
          , 'color:red'
          , 'color:green'
          ] 

        then( { 'msg should be': [ actual , expected ] } )
      } 

    , 'given undefined values': function( then ) {

        var actual = BrowserLogging.formatMessage( '', undefined, undefined )
        var expected = [ '' ] 

        then( { 'msg should be': [ actual , expected ] } )
      } 

    } )
  }

}
