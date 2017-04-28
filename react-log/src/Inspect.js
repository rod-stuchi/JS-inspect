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
import Array2Table from './array2Table';

import {Inspector, BookMark} from './Inspect.styled'

registerLanguage('sql', langsql);

const ObjInspect = (obj, lang) => {
  if (lang === "sql") {
    let sql = Array.isArray(obj) 
              ? obj.map(x => sqlFormatter.format(x, {indent: "    "})).join("----")
              : sqlFormatter.format(obj, {indent: "    "});

    sql = sql.replace(/----/g, "\n---------------------------------------------\n");
    return <SyntaxHighlighter style={colorvs} language='sql'>{sql}</SyntaxHighlighter>

  } else if (Array.isArray(obj)) {
    return <TableInspector data={obj} />

  } else if (typeof(obj) === "string") {
    return <pre className="print-string">{obj}</pre>

  } else {
    return <ObjectInspector data={obj} expandLevel={3}/>

  }
}

let CopyContent = (props) => {
  let {lang, obj, domNode} = props;
  return (
  <span 
    className="copy"
    title="copy content"
    onClick={(e) => {
      e.stopPropagation(); 
      
      if (lang === "sql") {
        let node = ReactDOM.findDOMNode(domNode);
        copy(node.querySelector('.log-item').innerText);
      } 
      else if (Array.isArray(obj)) {
        copy(Array2Table(obj));
      }
      else if (typeof(obj) === "string") {
        copy(obj);
      }
      else {
        copy(JSON.stringify(obj, null, 2));
      }

      }}>
    <MdCopy/>
  </span> )
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
    let { count, title, obj, lang, collapsed } = this.props.data;
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
            <CopyContent obj={obj} lang={lang} domNode={this}/>
          </h2>
          <div className="log-item">
            {ObjInspect(obj, lang)}
          </div>
        </Inspector>
      </div>
    )
  }
}

export default Inspect;
