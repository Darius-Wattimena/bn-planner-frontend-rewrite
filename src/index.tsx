import React from 'react';
import { render } from "react-dom";
import App from './App';
import {HashRouter} from "react-router-dom";
import { IconContext } from 'react-icons';

render(
  <HashRouter>
    <IconContext.Provider value={{ className: 'react-icons' }}>
      <App />
    </IconContext.Provider>
  </HashRouter>,
  document.getElementById('root')
);
