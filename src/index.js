import React from 'react';
import ReactDOM from 'react-dom';
// 使用react-hot-loader包裹所有的组件
import {
  AppContainer
} from 'react-hot-loader';
import 'style/global.scss';
// // import Fastclick from "fastclick";
// // Fastclick.attach(document.body);

import App from './app';
// // redux
// // import { Provider } from 'react-redux';
// // import reducer from './reducer/index';
// // import { createStore,combineReducers,applyMiddleware} from 'redux';
// // import thunk from 'redux-thunk';
// // import logger from 'redux-logger';

// // const store = createStore(
// //     combineReducers(reducer),
// //     applyMiddleware(thunk,logger)
// // );


console.log(ENV);

// // import './styles/index.scss';

const render = () => {
  ReactDOM.render(
  	<AppContainer>
    	<App/>
    </AppContainer>,
    document.getElementById('root')
  )
}

// // const render = () => {
// //     ReactDOM.render(
// //         <AppContainer>
// //             <Provider store={store}>
// //                 <App/>
// //             </Provider>
// //         </AppContainer>,
// //         document.getElementById('root')
// //     )
// // }
render();

// 用于监听react模块的热更新
if (module.hot) {
  module.hot.accept('./app', () => {
    render(require('./app').default)
  })
}
