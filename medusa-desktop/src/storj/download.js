var storj = require('storj-lib');
var through = require('through');
var fs = require('fs');
var api = 'https://api.storj.io';
const EventEmitter = require('events');

// Load keypair from your saved private key
var keypair = storj.KeyPair(fs.readFileSync('./medusa.key').toString());
var client = storj.BridgeClient(api, {keyPair: keypair});
var bucket = 'de55892c62405c904f637fe8';
// File to be uploaded
//var filepath = '/path/to./file.txt';
// Id of file to be downloaded
//var id = 'insertfileid';

// Where the downloaded file will be saved
class Downloader extends EventEmitter {
  download(path, id, secret){
    var target = fs.createWriteStream(path);
    var decrypter = new storj.DecryptStream(secret);
    var received = 0;
    var self = this;
    // list of servers to exclude when finding the download server
    var exclude = [];
    // Handle Events emitted from file download stream
    target.on('finish', function() {
      self.emit('finished')
    }).on('error', function(err) {
      console.log('error', err.message);
    });

    // Download the file
    client.createFileStream(bucket, id, {
      exclude: exclude
    },function(err, stream) {
      if (err) {
        return console.log('error', err.message);
      }

      stream.on('error', function(err) {
        console.log('warn', 'Failed to download shard, reason: %s', [err.message]);
        fs.unlink(filepath, function(unlinkFailed) {
          if (unlinkFailed) {
            return console.log('error', 'Failed to unlink partial file.');
          }

          if (!err.pointer) {
            return;
          }

        });
      }).pipe(through(function(chunk) {
        received += chunk.length;
        console.log('info', 'Received %s of %s bytes', [received, stream._length]);
        self.emit('downloading',(received/stream._length)*100.0)
        this.queue(chunk);
      })).pipe(decrypter).pipe(target);
    });
  }
}

module.exports = Downloader
