/*
'use strict';
require('should')

var Uploader = require('../src/storj/upload');
var tearDown = require('../src/storj/delete_files');

describe('upload test',function () {
  before(function () {
    console.log('cleaning...')
    tearDown()
  })

  it('should upload a file, emmiting some events',function (done) {
    var encrypting = false;
    var encrypted = false;
    var up = new Uploader()
    up.upload('./hello_storj.txt')
    up.on('encrypting',() => { encrypting = true; console.log('encrypting') })
    up.on('uploading',() => { encrypted = true; console.log('uploading...') })
    up.on('finished',() => {
    //  encrypting.should.equal(true)
    //  encrypted.should.equal(true)
      done()
    })
  })
})
*/
