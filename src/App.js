import React, { useState } from 'react';
import "bootswatch/dist/vapor/bootstrap.min.css";
import Header from './components/Header';
import MovPortal from './components/MovPortal';

// Structure for the app
function App() {
  return (
    <div>
      <Header />
      <br/>
      <div className='container'>
        <MovPortal/>
      </div>
    </div>
  );
}

export default App;
