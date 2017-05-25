'use strict';

function deleteTestFile() {
  return new Promise(function(resolve, reject) {
    var storj = require('storj-lib');
    var fs = require('fs');
    // Set the bridge api URL
    var api = 'https://api.storj.io';

    // Load keypair from your saved private key
    var keypair = storj.KeyPair(fs.readFileSync('./medusa.key').toString());

    // console.login using the keypair generated
    var client = storj.BridgeClient(api, {keyPair: keypair});

    // Bucket containing the file to be removed
    var bucketid = 'de55892c62405c904f637fe8';
    // ID of file to be removed
    var fileId = 'b6356e72cfdc0a2dbfbd39d0';

    // Key ring to hold key used to interact with uploaded file
    var keyring = storj.KeyRing('./', 'keypass');

    // Remove file from bucket
    client.removeFileFromBucket(bucketid, fileId, function(err) {
      if (err) {
        resolve()
        return console.log('error', err.message);
      }

      console.log('info', 'File was successfully removed from bucket.');
      resolve()
    });
  });
}

module.exports = deleteTestFile;
