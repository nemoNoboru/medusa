const Uploader = require( '../storj/upload' );
import torrentFileCreator from '../core/torrentFileCreator';
import saveState from './saveState';

export function encrypting( file ) {
  return {
    type: 'ENCRYPTING',
    file,
  }
}

export function uploading( file ) {
  return {
    type: 'UPLOADING',
    file,
  }
}

export function uploaded( file, path ) {
  return {
    type: 'UPLODADED',
    file,
    medusa_path: path,
  }
}

export function addFile( file ) {
  return function ( dispatch ) {
    var up = new Uploader();
    up.upload( file );
    up.on( 'encrypting', function () {
      dispatch( encrypting( file ) )
      dispatch( saveState() )
    } )
    up.on( 'uploading', function () {
      dispatch( uploading( file ) )
      dispatch( saveState() )
    } )
    up.on( 'finished', function ( file, secret ) {
      var path = torrentFileCreator( file, secret );
      dispatch( uploaded( file, path ) )
      dispatch( saveState() )
    } )
  }
}
