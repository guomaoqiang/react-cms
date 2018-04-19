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
// redux
import { Provider } from 'react-redux';
import reducer from './reducer/index';
import { createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const store = createStore(
    combineReducers(reducer),
    applyMiddleware(thunk,logger)
);

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App/>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )
}
render();

// 用于监听react模块的热更新
// if (module.hot) {
//   module.hot.accept('./app', () => {
//     render(require('./app').default)
//   })
// }

// Webpack Hot Module Replacement API
if (module.hot) {
    // 隐藏You cannot change <Router routes>; it will be ignored 错误提示
    // react-hot-loader 使用在react-router 3.x上引起的提示，react-router 4.x不存在
    // 详情可参照https://github.com/gaearon/react-hot-loader/issues/298
    const orgError = console.error; // eslint-disable-line no-console
    console.error = (...args) => { // eslint-disable-line no-console
        if (args && args.length === 1 && typeof args[0] === 'string' && args[0].indexOf('You cannot change <Router routes>;') > -1) {
            // React route changed
        } else {
            // Log the error as normally
            orgError.apply(console, args);
        }
    };
    module.hot.accept('./app', () => {
        render(App);
    })
}
