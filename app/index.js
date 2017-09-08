import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";

import store from "./redux/store.js";

import './Scss/Styles.scss';

import App from './src/App.jsx';

render(
  <Provider store = {store}>
		<App/>
	</Provider>,
  document.getElementById('app'));
