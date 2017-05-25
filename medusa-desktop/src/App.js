import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import UploadBlank from './components/upload/blank';


class App extends Component {
  render() {
    return (
      <div className="App">
        <UploadBlank/>
      </div>
    );
  }
}

export default App;
