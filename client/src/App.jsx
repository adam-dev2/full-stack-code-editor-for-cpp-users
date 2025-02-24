import React from 'react';
import Navbar from './Navbar';
import Body from './Body';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Coding from './Coding';

const App = () => {
  return (
    <>
      <Router>
        
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/Coding" element={<Coding />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
