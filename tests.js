var TestRunner = require( "./index" ).TestRunner
var SuiteRunner = require( "./index" ).SuiteRunner

console.log("======= running normal suite =============")

var normalSuite = function( suite ) {

  suite.context( "context 1", function( ctx ) {

    ctx.test( "test 1a", function( test ) {
      test.assert( "" )
      test.assert( "fail" )
      test.done()
    } )

    ctx.test( "test 1b", function( test ) {
      test.assert( "fail" )
      test.assert( "fail" )
      test.done()
    } )

    ctx.done()

  } )

  suite.context( "context 2", function( ctx ) {

    ctx.test( "test 2a", function( test ) {
      test.assert( "fail" )
      test.done()
    } )

    ctx.test( "test 2b", function( test ) {
      test.assert( "" )
      setTimeout( function() {
        test.assert( "fail" )
        test.done()
      }, 200 )
    } )

    ctx.done()

  } )

  suite.done()
}

TestRunner.run( normalSuite, function( report ) {
  console.log( JSON.stringify( report ) )
} )

console.log("======= suite with exception  =============")

var suiteWithException = function( suite ) {

  suite.context( "context", function( ctx ) {

    ctx.test( "test without exception", function( test ) {
      test.assert( "" )
      test.done()
    } )

    ctx.test( "test with exception", function( test ) {
      throw "fail"
      test.done()
    } )

    ctx.done()

  } )

  suite.done()
}

TestRunner.run( suiteWithException, function( report ) {
  console.log( JSON.stringify( report ) )
} )

console.log("======= suite runner  =============")

var suites = {
  suite1: require( "./suite1" ),
  suite2: require( "./suite2" )
}

SuiteRunner.run( suites, function( report ) {
  console.log( JSON.stringify( report ) )
} )

