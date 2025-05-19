import React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {IconContext} from 'react-icons';

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <BrowserRouter>
    <IconContext.Provider value={{className: 'react-icons'}}>
      <App/>
    </IconContext.Provider>
  </BrowserRouter>
);
