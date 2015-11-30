module.exports = function( suite ) {

  suite.context( "context 1", function( ctx ) {

    ctx.test( "test 1a", function( test ) {
      test.assert( "" )
      test.done()
    } )

    ctx.done()

  } )

  suite.done()
}
