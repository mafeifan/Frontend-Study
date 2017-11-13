import React from 'react';
import ReactDOM from 'react-dom';
import { RouterMap } from './router/routerMap';
import './index.css';
import './ANTD/antd.css'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<div><RouterMap /></div>, document.getElementById('root'));
registerServiceWorker();
