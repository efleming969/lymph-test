var ListLogger = module.exports = function()
{
  this.messages = []
}

ListLogger.prototype.log = function( msg, a, b )
{
  if ( a === undefined && b === undefined )
    this.messages.push( msg )
  else
    this.messages.push( msg + a + '|' + b )
}

