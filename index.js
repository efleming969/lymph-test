exports.SuiteRunner = {
  run: function( suites, done ) {
    Object.keys( suites ).forEach( function( suiteName ) {
      exports.TestRunner.run( suites[ suiteName ], done )
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
            var test = { name: testName, asserts: [], logItems: [], error: "" }
            try {
              testFn( {
                assert: function ( value ) { test.asserts.push( value ) },
                log: function( value ) { test.logItems.push( value ) },
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

