import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {ObjectInspector, TableInspector} from 'react-inspector';
import FaExpanded from 'react-icons/lib/fa/chevron-circle-down';
import sqlFormatter from "sql-formatter";
import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/dist/light"
import langsql from 'highlight.js/lib/languages/sql';
import colorvs from 'react-syntax-highlighter/dist/styles/vs'; 

import copy from './copyText';
import MdCopy from 'react-icons/lib/md/content-copy';
import MdBookmarkOff from 'react-icons/lib/md/bookmark-outline';
import MdBookmarkOn from 'react-icons/lib/md/bookmark';

import {Inspector, BookMark} from './Inspect.styled'

registerLanguage('sql', langsql);

const ObjInspect = (obj) => {
  if (Array.isArray(obj)) {
    return <TableInspector data={obj} />

  } else if (obj["lang"] && obj["lang"] === "sql") {
    let sql = Array.isArray(obj.code) 
              ? obj.code.map(x => sqlFormatter.format(x, {indent: "    "})).join("----")
              : sqlFormatter.format(obj.code, {indent: "    "});

    sql = sql.replace(/----/g, "\n---------------------------------------------\n");
    return <SyntaxHighlighter style={colorvs} language='sql'>{sql}</SyntaxHighlighter>

  } else if (typeof(obj) === "string") {
    return <pre className="print-string">{obj}</pre>

  } else {
    return <ObjectInspector data={obj} expandLevel={3}/>

  }
}

let IconBookMark = (props) =>
  props.show > 0
    ? <MdBookmarkOn /> 
    : <MdBookmarkOff />

class Inspect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: props.data.collapsed,
      level: 0
    }
  }
  render() {
    let { count, title, obj, collapsed } = this.props.data;
    return (
      <div>
        <Inspector collapsed={collapsed}>
          <hr />
          <h2 onClick={(e) => this.props.click(e) }>
            <span className="count">{count}</span> 
            <BookMark 
              className={`level-${this.state.level}`}
              onClick={(e) => {
                e.stopPropagation();
                this.state.level < 5 
                  ? this.setState({level: this.state.level + 1}) 
                  : this.setState({level: 0})}
              }>
              <IconBookMark show={this.state.level}/>
            </BookMark>
            {title || "Log"}
            {collapsed ? <FaExpanded/> : "" }
            <span 
              className="copy"
              title="copy title"
              onClick={(e) => {e.stopPropagation(); copy(title || "Log")}}>
              <MdCopy/>
            </span>
            <span 
              className="copy"
              title="copy content"
              onClick={(e) => {
                e.stopPropagation(); 
                let domNode = ReactDOM.findDOMNode(this);
                copy(domNode.querySelector('.log-item').innerText)
                }}>
              <MdCopy/>
            </span>
          </h2>
          <div className="log-item">
            {ObjInspect(obj)}
          </div>
        </Inspector>
      </div>
    )
  }
}

export default Inspect;
