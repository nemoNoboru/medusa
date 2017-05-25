const fs = require( 'fs' );

// function that loads the state of medusa between runs
export function initialize() {
  var state = fs.readFileSync( "./medusa.state", {
    encoding: 'utf8'
  } )
  return {
    type: 'INITIALIZE',
    state,
  }
}
