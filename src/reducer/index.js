// import tabJump from './tabJump';
// import information from './information';

// export default {
// 	tabJump,
// 	information
// }


// 导出的是文件的名字。添加reducer时，这个文件不需要改动
const context = require.context('./', false, /\.js$/);
const keys = context.keys().filter(item => item !== './index.js');
const regexp = /\.\/(\S+)\.js$/;

const reducers = keys.reduce((obj, key) => {
  const match = regexp.exec(key);
  const result = obj;
  let reducer = context(key).default;
  // reducer = isFunction(reducer) ? reducer : combineReducers(reducer);
  result[match[1]] = reducer;
  return result;
}, {});


export default reducers;
