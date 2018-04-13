import React from 'react';
// import {
// 	connect
// } from 'react-redux';

// @connect((state) => {
//   console.log(state);
//   return {
//     num: state.add.num
//   }
// })

export default class Num extends React.Component {

  componentWillMount() {
    console.log('%c num--componentWillMount', 'color:orange');
  }
  componentDidMount() {
    console.log('%c num--componentDidMount', 'color:orange');
  }

  render() {
    console.log('%c num--render', 'color:orange');
    return (
      <div style={{textAlign:'center',marginTop:'50px',fontSize:'20px'}}>{this.props.num}</div>
    )
  }
}
