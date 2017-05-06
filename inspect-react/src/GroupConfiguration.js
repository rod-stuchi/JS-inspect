import React, { Component } from 'react';
import Toggle from 'material-ui/Toggle';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Configs from './GroupConfiguration.styled';
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

class GroupConfiguration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      configs_leave_state: undefined,
      toggle_autoscroll: true,
      toggle_expanded: false
    }
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
          <li>
            <div className="flex-container">
              <div className="flex-item">Usuário</div>
              <div className="flex-item"><FaEdit/></div>
            </div>
          </li>
          <li onClick={() => this.setState({toggle_expanded: !this.state.toggle_expanded})}>
            <div>
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
            <div>
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
        </ul>
        
        
        
        </MuiThemeProvider>
      </Configs>
    );
  }
}

export default GroupConfiguration