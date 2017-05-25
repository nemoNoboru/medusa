
'use strict';
require('should')

var Uploader = require('../src/storj/upload');
var Downloader = require('../src/storj/download');
var tearDown = require('../src/storj/delete_files');

var gs = {}

describe('download test',function (done) {
  before('removing file, and uploading again',function (done) {
    var up = new Uploader()
    console.log('deleting...')
    tearDown().then(function () {
      console.log('uploading...')
      up.upload('./hello_storj.txt')
      up.on('finished', (file, secret) => {
        console.log('uploaded')
        gs.fileID = file.id
        gs.secret = secret
        done()
      })
    })
  })

  it('should download a file, emmiting some events',function (done) {
    console.log('downloading')
    var download = new Downloader()
    download.download('./hello_storj_back.txt', gs.fileID, gs.secret)
    download.on('downloading',(percent) => { console.log(percent) })
    download.on('finished',() => {
    //  encrypting.should.equal(true)
    //  encrypted.should.equal(true)
      done()
    })
  })
})
