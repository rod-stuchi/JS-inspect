import React, { Component } from 'react';
import Toggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Configs, SpanEdit } from './GroupConfiguration.styled';
import FaEdit from 'react-icons/lib/fa/edit';


const styles = {
  toggle: {
    marginBottom: 16,
  },
  thumbOff: {
    backgroundColor: '#e4e4e4',
  },
  thumbSwitched: {
    backgroundColor: '#127509',
  },
  trackSwitched: {
    backgroundColor: '#72e06a',
  }
};

class EditUser extends Component {
  constructor (props) {
    super(props);
    this.state = {
      userName: props.user_name,
    }
  }
  handleFocus (event) {
    event.target.select();
  }

  handleKeyUp(event) {
    if (event.key === "Enter" || event.key === "Escape") {
      this.props.handle_edit(event.target.value);
    }
  }

  handleChange(event) {
    this.setState({userName : event.target.value});
  }

  render () {
    if (this.props.edit) {
      return (
        <div className="flex-container">
          <div className="flex-item"><a>User name: </a></div>
          <div className="flex-item"> 
            <FaEdit/> <input type="text" 
              onKeyUp={ (e) => this.handleKeyUp(e) }
              onChange={ (e) => this.handleChange(e) }
              onFocus={ (e) => this.handleFocus(e) }
              value={this.state.userName}
              autoFocus
              />
          </div>
        </div>
      )
    } else {
      return (
        <div className="flex-container">
          <div className="flex-item"><a>User name: </a></div>
          <div className="flex-item"><SpanEdit><FaEdit/></SpanEdit> {this.props.user_name}</div>
        </div>
      )
    }
  }
}

class GroupConfiguration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lc_edituser: false,
      lc_username: "username",
      configs_leave_state: undefined,
      toggle_autoscroll: true,
      toggle_expanded: false,
      toogle_turnoff: false
    }
  }

  handle_edit(event) {
    this.setState({lc_username: event});
    this.setState({lc_edituser: false});
  }
  
  render () {
    return (
      <Configs
        configs_show={this.props.show}
        onMouseEnter={() => clearTimeout(this.state.configs_leave_state)}
        onMouseLeave={() =>
          this.setState({configs_leave_state: setTimeout(() => {
              this.props.handleShow(false);
              this.setState({configs_show: false })
            }, 1000)})
        }>
        <MuiThemeProvider>
        <ul>
          <li onClick={() => this.setState({lc_edituser: !this.state.lc_edituser})}>
            <EditUser 
              user_name={this.state.lc_username}
              handle_edit={(e) => this.handle_edit(e)}
              edit={this.state.lc_edituser} />
          </li>
          <li onClick={() => this.setState({toggle_expanded: !this.state.toggle_expanded})}>
            <div className="toggle">
              <Toggle
                toggled={this.state.toggle_expanded}
                style={{left: this.props.show ? 'inherit' : '-1000px'}}
                label="Show expanded"
                thumbStyle={styles.thumbOff}
                thumbSwitchedStyle={styles.thumbSwitched}
                trackSwitchedStyle={styles.trackSwitched}
              />
            </div>
          </li>
          <li onClick={() => this.setState({toggle_autoscroll: !this.state.toggle_autoscroll})}>
            <div className="toggle">
              <Toggle
                toggled={this.state.toggle_autoscroll}
                style={{left: this.props.show ? 'inherit' : '-1000px'}}
                label="Auto scroll"
                thumbStyle={styles.thumbOff}
                thumbSwitchedStyle={styles.thumbSwitched}
                trackSwitchedStyle={styles.trackSwitched}
              />
            </div>
          </li>
          <li onClick={() => this.setState({toggle_turnoff: !this.state.toggle_turnoff})}>
            <div className="toggle">
              <Toggle
                toggled={this.state.toggle_turnoff}
                style={{left: this.props.show ? 'inherit' : '-1000px'}}
                label="Turn Off JS.inspect()"
                thumbStyle={styles.thumbOff}
                thumbSwitchedStyle={styles.thumbSwitched}
                trackSwitchedStyle={styles.trackSwitched}
              />
            </div>
          </li>
        </ul>
       </MuiThemeProvider>
      </Configs>
    );
  }
}

export default GroupConfiguration
