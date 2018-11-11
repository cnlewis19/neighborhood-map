import React, {Component} from 'react';

class NoMap extends Component {
  state = {
    show: false,
    timeout: null
  }
  componentDidMount = () => {
    let timeout = window.setTimeout(this.showMessage, 1500);
    this.setState({timeout});
  }

  componentWillUnmount = () => {
    window.clearTimeout(this.state.timeout);
  }

  showMessage = () => {
    this.setState({show:true});
  }

  render = () => {
    return (
      <div>
        {this.state.show
          ? (
            <div>
              <h1> There was an error trying to load the map </h1>
              <p> The map could not be loaded due to an error. Please try again later. </p>
            </div>
          )
          : (<div><h1>Loading</h1></div>)
        } </div>
    )
  }
}

export default NoMap
