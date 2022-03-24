import React from 'react';
import {render} from "react-dom";
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {IconContext} from 'react-icons';

render(
  <BrowserRouter>
    <IconContext.Provider value={{className: 'react-icons'}}>
      <App/>
    </IconContext.Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
