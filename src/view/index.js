import React from 'react';
import Btn from './btn';
import Num from './num';

import {
  connect
} from 'react-redux';
import {
  add,
  reduce,
  reset
} from '../action/actions.js';


// Num 组件指关系数字的改变
const NumC = connect((state) => {
  console.log(state);
  return {
    num: state.add.num
  }
})(Num)


// 整个组件只有数字在改变。只需要用redux把数据绑定在Num组件上就可以了
class Index extends React.Component {

  constructor(props) {
    super(props);
  }
  componentWillMount() {
    console.log('%c index--componentWillMount', 'color:red');
  }
  componentDidMount() {
    console.log('%c index--componentDidMount', 'color:red');
  }
  render() {
    console.log(this);
    console.log('%c index--render', 'color:red');
    return (
      <div>
        <Btn text='加一' click={()=>{this.props.add()}}/>
        <Btn text='减一' click={()=>{this.props.reduce()}}/>
        <Btn text='归零' click={()=>{this.props.reset()}}/>
        <NumC num={this.props.num}/>
      </div>
    )
  }
}

export default connect(null,(dispatch) => {
  return {
    add: () => {
      dispatch(add())
    },
    reduce: () => {
      dispatch(reduce())
    },
    reset: () => {
      dispatch(reset())
    }
  }
})(Index)
