import React, { useState } from 'react';
import "bootswatch/dist/vapor/bootstrap.min.css";
import HeaderComponent from './components/Header';
import MovPortalComponent from './components/MovPortal';

// Structure for the app
function App() {
  return (
    <div>
      <HeaderComponent />
      <br/>
      <div className='container'>
        <MovPortalComponent/>
      </div>
    </div>
  );
}

export default App;
