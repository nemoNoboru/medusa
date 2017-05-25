const crypto = require( 'crypto' );

export default function hasher( str ) {
  var hash = crypto.createHash( 'sha256' );
  hash.update( str );
  return hash.digest( 'hex' );
}
