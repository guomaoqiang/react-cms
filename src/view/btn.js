import React from 'react';

export default class Btn extends React.Component {
  componentWillMount() {
    console.log('%c btn--componentWillMount', 'color:blue');
  }
  componentDidMount() {
    console.log('%c btn--componentDidMount', 'color:blue');
  }
  render() {
  	console.log('%c btn--render', 'color:blue');
    let style = {
      marginLeft: '20px',
      display: 'inline-block',
      width: '100px',
      height: '50px',
      lineHeight: '50px',
      textAlign: 'center',
      backgroundColor: '#ceadad'
    }
    return (
      <div style={style} onClick={()=>{this.props.click()}}>{this.props.text}</div>
    )
  }
}
