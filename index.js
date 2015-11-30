exports.SuiteRunner = {
  run: function( suites, done ) {
    Object.keys( suites ).forEach( function( suiteName ) {
      exports.TestRunner.run( suites[ suiteName ], done )
    } )
  }
}

exports.TestReporter = {
  print: function( contexts ) {
    contexts.forEach( function( context ) {
      console.log( "#", context.name )
      context.tests.forEach( function( test ) {
        if ( test.error !== "" ) {
          console.log( "*", test.name )
          console.log( "  ^", test.error )
        }
        else {
          console.log( "*", test.name )
          test.asserts.forEach( function( assert ) {
            if ( assert !== "" ) {
              console.log( "  -",  assert )
            }
            else {
              console.log( "  + success" )
            }
          } )
        }
      } )
      console.log()
    } )
  }
}

exports.TestRunner = {
  run: function( suiteFn, suiteDone ) {
    var contexts = []
    suiteFn( {
      context: function( contextName, contextFn ) {
        var context = { name: contextName, tests: [] }
        contextFn( {
          test: function( testName, testFn ) {
            var test = { name: testName, asserts: [], error: "" }
            try {
              testFn( {
                assert: function ( value ) { test.asserts.push( value ) },
                done: function() {
                  context.tests.push( test )
                }
              } )
            } catch ( ex ) {
              test.error = ex
              context.tests.push( test )
            }
          },
          done: function() {
            contexts.push( context )
          }
        } )
      },
      done: function() {
        suiteDone( contexts )
      }
    } )
  }
}

exports.Assert = {
  equal: function( a, b ) {
    if ( a === b ) {
      return ""
    }
    else {
      return "fail"
    }
  }
}

