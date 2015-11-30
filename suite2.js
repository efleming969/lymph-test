module.exports = function( suite ) {

  suite.context( "context 2", function( ctx ) {

    ctx.test( "test 2a", function( test ) {
      test.assert( "" )
      test.done()
    } )

    ctx.done()

  } )

  suite.done()
}
