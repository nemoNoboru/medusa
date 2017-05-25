import hasher from '../core/hasher';
var uploadReducers = {}

uploadReducers.ENCRYPTING = function ( copy, action, id ) {
  copy[ id ] = {
    file: action.file,
    status: 'encrypting'
  }
  return copy;
}

uploadReducers.UPLOADING = function ( copy, action, id ) {
  copy[ id ] = {
    file: action.file,
    status: 'uploading'
  }
  return copy;
}

uploadReducers.UPLODADED = function ( copy, action, id ) {
  copy[ id ] = {
    file: action.file,
    status: 'uploaded',
    medusa_path: action.medusa_path
  }
  return copy;
}

export default upload( state, action ) {
  if ( uploadReducers[ action.type ] ) {

    var id = hasher( action.file )
    var copy = Object.assign( {}, state );

    return uploadReducers[ action.type ]( copy, action, id )
  } else {
    return state;
  }
}
