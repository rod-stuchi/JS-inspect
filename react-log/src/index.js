import React from 'react';
import ReactDOM from 'react-dom';
import { injectGlobal } from 'styled-components';
import App from './App';

injectGlobal`
	body {
    font-family: sans-serif;
	  margin: 0; 
    padding: 0; 
    background-color: #d8d8d8;
    min-width: 700px;
    overflow-x: hidden;
	}
`;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
