export default function saveState() {
  return function ( dispatch, getState ) {
    var state = getState();
    fs.writeFileSync( "./medusa.state", state )
  }
}
