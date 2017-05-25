const fs = require('fs');

const output = './tmp/';
// creates a torrent file that can be used to download files
export default function create(file, secret){
  file.secret = secret;
  var path = output+file.fileName+'.medusa';
  fs.writeFileSync(path ,file)
  return path
}
