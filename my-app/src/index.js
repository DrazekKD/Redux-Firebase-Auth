import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
		<App/>,
	document.getElementById("root")
);
serviceWorker.register();