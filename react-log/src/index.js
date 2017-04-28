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

::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}
::-webkit-scrollbar-button {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background: #127509;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-thumb:hover {
  background: #13830a;
}
::-webkit-scrollbar-thumb:active {
  background: #36ef27;
}
::-webkit-scrollbar-track {
  //background: #4a4a4a;
  background: transparent;
  border: 0px none #ffffff;
  border-radius: 50px;
}
::-webkit-scrollbar-track:hover {
  //background: #4a4a4a;
  background: transparent;
}
::-webkit-scrollbar-track:active {
  //background: #4a4a4a;
  background: transparent;
}
::-webkit-scrollbar-corner {
  background: transparent;
}
`;

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
