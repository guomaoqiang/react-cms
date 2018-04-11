import React from 'react';

export default class Num extends React.Component {

	  componentWillMount() {
  	console.log('%c num--componentWillMount','color:orange');
  }
  componentDidMount() {
  	console.log('%c num--componentDidMount','color:orange');
  }

	render() {
		console.log('%c num--render','color:orange');
		return(
			<div style={{textAlign:'center',marginTop:'50px',fontSize:'20px'}}>{this.props.num}</div>
		)
	}
}