import React, { Component } from 'react';
import FaCheck from 'react-icons/lib/fa/check-square-o';
import FaUnCheck from 'react-icons/lib/fa/square-o';


import Titles from './GroupTitle.styled';


class ListTitle extends Component {
  render () {
    return (
      <ul>
      {this.props.list.map((x, i) => 
        <li key={i} onClick={(e) => this.props.check(x.title) } >
          {x.checked ? <FaCheck/> : <FaUnCheck/>}
          <a>{x.count} - {x.title}</a>
        </li>)}
    </ul>
    )
  }
}

class GroupTitle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titles_leave_state: undefined
    }
  }
  
  render () {
    return (
      <Titles
        className="titles"
        titles_show={this.props.show}
        length_socket_id={this.props.length_socket_id}
        isFirefox={/Firefox/.test(navigator.userAgent)}
        onMouseEnter={() => clearTimeout(this.state.titles_leave_state)}
        onMouseLeave={() =>
          this.setState({titles_leave_state: setTimeout(() => {
              this.props.handleShow(false);
              this.setState({titles_show: false })
            }, 500)})
        }>
        <ListTitle list={this.props.titles} check={(e) => this.props.handleList(e)} />
      </Titles>
    );
  }
}

export default GroupTitle