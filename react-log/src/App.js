import React, { Component } from 'react';
import DialogHowToUse from './Dialog-HowToUse';
import Scroll from 'react-scroll';
import sha1 from 'sha1';
import io from 'socket.io-client'
import copy from './copyText';
import Inspect from './Inspect'
import GroupTitle from './GroupTitle';
import {Frame, ClearAll, ConfirmClear} from './App.styled';
import FaList from 'react-icons/lib/fa/list-ul';
import FaCheckAll from 'react-icons/lib/fa/check-square';
import FaEraser from 'react-icons/lib/fa/eraser';
import FaUser from 'react-icons/lib/fa/user';
import FaEdit from 'react-icons/lib/fa/edit';
import FaGitHub from 'react-icons/lib/fa/github';
import ToggleButton from 'react-toggle-button'

const scroll = Scroll.animateScroll;
let socket_id = undefined;

const socket = io();
// let o = {title: "ae ae ae ae ooooooooooo", obj: { id: 1, name : "braca", age: "-41" }}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: true,
      titles_list: [],
      titles_show: false,
      socket_id: 'socket_id',
      logs:[],
      confirmClear: false,
      timeoutConfirmClear: undefined,
      user_count: 0
    }
    socket.on('logflow', (data) => this.pushLog(data));
    socket.on('count', (user) => this.setState({user_count: user.user_count}));
    socket.on('connect', () => this.setState({socket_id: socket.id}));
    /*let inter = setInterval(() => {
      this.pushLog(Object.assign({}, o));
      if (this.state.logs[0].count === 6) {
        o.title = "aaaaaaaaaaaa bbbbbb";
      } 
      if (this.state.logs[1] && this.state.logs[1].count === 3) {
        o.title = "aaaaaaaaaaaa cccccc";
      } 
      if (this.state.logs[2] && this.state.logs[2].count === 4) {
        o.title = "aaaaaaaaaaaa ddddddd";
      } 
      if (this.state.logs[3] && this.state.logs[3].count === 5) {
        o.title = "aaaaaaaaaaaa eeeeeee";
      }
      if (this.state.logs[4] && this.state.logs[4].count === 2) {
        o.title = "aaaaaaaaaaaa ffffff";
      } 
      if (this.state.logs[5] && this.state.logs[5].count === 2) {
        o.title = "ae ae ae ae ooooooooooo";
        o.obj = [{id: 1, name: 'aaa'}, {id: 2, name: 'bbb'}];
      }
      if (this.state.logs[6] && this.state.logs[6].count === 4) {
        o.title = "teste SQL";
        o.obj = "select * from ABC where id > 3";
        o.lang = "sql";
      }

      if (this.state.logs.length > 7) {
        clearInterval(inter);
      }
    }, 100);*/
  }

  setTitleList() {
    let title_list = this.state.logs
      .map(x => x.title)
      .reduce((acc, x) => {
        let i = acc.map(t => t.title).indexOf(x);
        if (i >= 0) {
            acc[i].count += 1;
            return [...acc];
        } else {
            return [...acc, {title: x, count: 1, checked: this.state.collapsed}]
        }
      }, []);
      this.setState({titles_list: title_list});
  }

  pushLog(data) {
    if (data && data.obj) {
      data.title = data.title ? data.title : "Log";
      
      let last = this.state.logs[this.state.logs.length -1];

      let hash_state = last ? sha1(JSON.stringify(last.obj) + last.title) : "";
      let hash_in = sha1(JSON.stringify(data.obj) + data.title);

      if (hash_state === hash_in) {
        last.count += 1;
        this.state.logs.pop();

        this.setState({logs: [...this.state.logs, last]});
      } else {
        data.collapsed = this.state.collapsed;
        data.count = 1;
        this.setState({logs: [...this.state.logs, data]});
      }
      this.setTitleList();
    }
    scroll.scrollToBottom();
  }

  handleChange_titles_show(event) {
    this.setState({titles_show: event});
  }

  handleChange_titles_list(event) {
    let t = this.state.titles_list.filter(x => x.title === event)[0];
    if (t) {
      t.checked = !t.checked;
      if (t.checked) {
        this.state.logs
          .filter(x => x.title === event)
          .map(x => x.collapsed = true);
      } else {
        this.state.logs
          .filter(x => x.title === event)
          .map(x => x.collapsed = false);
      }
      this.setState({logs: [...this.state.logs]});
    }
    this.setState({titles_list: [...this.state.titles_list]});
  }

  handleCollapsed(e) {
    e.collapsed = !e.collapsed;
    this.setState({logs: [...this.state.logs]});
  }

  handleClear() {
    this.setState({logs: []});
    this.setState({titles_list: []});
    this.setState({confirmClear: !this.state.confirmClear})
  }

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <Frame clear={this.state.logs.length > 0} toggle={this.state.titles_show}>
        <div className="flex-top">
          <div className="flex-l">
            <h1><img src={'android-icon-48x48.png'}/><span className="title">JS.inspect()</span></h1>
          </div>
          <div className="flex-m">
            <ul>
              <li><FaGitHub/> fork</li>
              <li>how to use</li>
            </ul>
          </div>
          <div className="flex-r">
            <FaUser className="user-count"/> <span className="counter">{this.state.user_count}</span>
          </div>
        </div>
        <div className="inspect">
          {this.state.logs.length > 0 && this.state.logs.map((obj, i) =>
            <Inspect key={i.toString()} data={obj} click={()=> this.handleCollapsed(obj)} />
          )}
        </div>
        <GroupTitle
          handleShow={(e) => this.handleChange_titles_show(e)}
          handleList={(e) => this.handleChange_titles_list(e)}
          show={this.state.titles_show}
          titles={this.state.titles_list}
          length_socket_id={this.state.socket_id.length}
        />
        <div className="menu-bottom">
          <div>
            <span
              title="copy"
              onClick={() => copy(this.state.socket_id)} className="socketid">
              {this.state.socket_id}
            </span>
          </div>
          <div >
            <ul className="group-title">
              <li>
                <a><FaEdit/></a>
              </li>
              <li className="toggle" onClick={() => this.setState({titles_show: !this.state.titles_show})}>
                <FaList/> <a>Toggle Items</a>
              </li>
              <li onClick={() => {
                  let all = this.state.logs.every(x => x.collapsed);
                  this.state.logs.map(x => x.collapsed = !all);
                  this.state.titles_list.map(x => x.checked = !all);
                  this.setState({logs: [...this.state.logs]});
                  this.setState({titles_list: [...this.state.titles_list]});
                }}>
                <FaCheckAll/> <a>Toggle All</a>
              </li>
              <ClearAll
                onClick={() => {
                  clearTimeout(this.state.timeoutConfirmClear);

                  !this.state.confirmClear && this.setState({timeoutConfirmClear: setTimeout(() => {
                    this.setState({confirmClear: false});
                  }, 10000)})

                  this.setState({confirmClear: !this.state.confirmClear});                  
                }}
                show={this.state.confirmClear}
                >
                <FaEraser/> <a>Clear All</a>
              </ClearAll>
              <ConfirmClear
                show={this.state.confirmClear}
                onClick={() => this.handleClear()}>
                <a>Yes</a>
              </ConfirmClear>
              <li className="none">
                <label>
                      <div>
                        Expanded
                      </div>
                      <div>
                        <ToggleButton
                          colors={{
                            active: { base: 'rgb(18, 117, 9)' }
                          }}
                          value={ !this.state.collapsed || false }
                          onToggle={(value) => 
                            this.setState({ collapsed: !this.state.collapsed })
                          }
                        />
                      </div>
                  </label>
              </li>
            </ul>
          </div>
        </div>
        {/*<DialogHowToUse />*/}
      </Frame>
    );
  }
}

export default App;
