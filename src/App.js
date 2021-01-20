import React from 'react';
import './App.css';
import Router from './Router'
import Index from './views/Dashboard'
import env from './env'

function App() {
  console.log(env())
  return (
    <>
    <Index />
    </>
  );
}

export default App;