import React from 'react';

export default class Btn extends React.Component {
  componentWillMount() {
    console.log('%c btn--componentWillMount', 'color:blue');
  }
  componentDidMount() {
    console.log('%c btn--componentDidMount', 'color:blue');
    console.log(document.body);
    document.body.scrollTop = 0;
  }
  render() {
  	console.log('%c btn--render', 'color:blue');
    let style = {
      display: 'inline-block',
      width: '100%',
      height: '10000px',
      backgroundColor: '#ceadad'
    }
    return (
      <div style={style}>qweeeeeeeeeeeeeeeee</div>
    )
  }
}
