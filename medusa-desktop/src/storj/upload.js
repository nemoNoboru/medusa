var storj = require( 'storj-lib' );
var fs = require( 'fs' );
var api = 'https://api.storj.io';
const EventEmitter = require( 'events' );

// Load keypair from your saved private key
var keypair = storj.KeyPair( fs.readFileSync( './medusa.key' ).toString() );

var concurrency = 50;

var client = storj.BridgeClient( api, {
  keyPair: keypair,
  concurrency: concurrency // Set upload concurrency
} );
var bucket = 'de55892c62405c904f637fe8';

class Uploader extends EventEmitter {
  upload( filepath ) {
    var tmppath = './' + filepath + '.crypt';
    var secret = new storj.DataCipherKeyIv();
    var encrypter = new storj.EncryptStream( secret );
    var self = this;
    self.emit( 'encrypting' )

    fs.createReadStream( filepath )
      .pipe( encrypter )
      .pipe( fs.createWriteStream( tmppath ) ).on( 'finish', function () {
        self.emit( 'uploading' )
        // Create token for uploading to bucket by bucketid
        client.createToken( bucket, 'PUSH', function ( err, token ) {
          if ( err ) {
            console.log( 'error', err.message );
          }

          // Store the file using the bucket id, token, and encrypted file
          client.storeFileInBucket( bucket, token.token, tmppath, function ( err, file ) {
            if ( err ) {
              return console.log( 'error', err.message );
            }

            // Save key for access to download file
            self.emit( 'finished', file, secret )
          } );
        } );
      } );
  }
}

module.exports = Uploader
