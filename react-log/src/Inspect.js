import React, { Component } from 'react';
import {ObjectInspector, TableInspector} from 'react-inspector';
import FaExpanded from 'react-icons/lib/fa/chevron-circle-down';
import sqlFormatter from "sql-formatter";
import SyntaxHighlighter, { registerLanguage } from "react-syntax-highlighter/dist/light"
import langsql from 'highlight.js/lib/languages/sql';
import colorvs from 'react-syntax-highlighter/dist/styles/vs'; 

import DivInspect from './Inspect.styled'

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

class Inspect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: props.data.collapsed
    }
  }
  render() {
    let { count, title, obj, collapsed } = this.props.data;
    return (
      <div>
        <DivInspect collapsed={collapsed}>
          <hr />
          <h2 onClick={(e) => this.props.click(e) }>
            <span className="count">{count}</span> {title || "Log"}
            {collapsed ? <FaExpanded/> : "" }
          </h2>
          <div className="log-item">
            {ObjInspect(obj)}
          </div>
        </DivInspect>
      </div>
    )
  }
}

export default Inspect;
