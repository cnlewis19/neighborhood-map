import React, { Component } from 'react';
import Drawer from '@material-ui/core/Drawer';

class List extends Component {
  state = {
    open: false,
    query: ""
  }
  updateQuery = (newQuery) => {
    this.setState({query: newQuery});
    this.props.filterLocations(newQuery);
  }

  render = () => {
    return (
      <div>
        <Drawer open={this.props.open} onClose={this.props.toggleList}>
          <div>
            <input
              type="text"
              placeholder="Filter within List"
              name="filter"
              onChange={e => this
                .updateQuery(e.target.value)}
                value={this.state.query} />
            <ul>
              {this.props.locations && this
                .props
                .locations
                .map((location, index) => {
                  return(
                    <li key={index} className="drawer-list">
                      <button key={index}>{location.name}</button>
                    </li>
                  )
                })}
              </ul>
            </div>
            </Drawer>
          </div>
    )
  }
}

export default List;
