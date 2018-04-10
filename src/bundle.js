import React from 'react';

class Bundle extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mod: null
    }
  }
  componentWillMount() {
    this.load(this.props);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  };

  load(props) {
    this.setState({
      mod: null
    });
    props.load((mod) => {
      this.setState({
        mod: mod.default ? mod.default : mod
      });
    });
  };

  render() {
    if (!this.state.mod)
      return false;
    return this.props.children(this.state.mod);
  };
};

function lazyLoad(lazyModule) {
  return (props) => (
    <Bundle load={lazyModule}>
      {(Container) => <Container {...props} />}
    </Bundle>
  );
};

export default lazyLoad;
