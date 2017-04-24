import styled from 'styled-components';

const DivInspect = styled.div`
  hr {
    width: 100%;
  }
  h2 {
    color: ${props => props.collapsed ? '#676767': 'black' };
    font-size: 90%;
    margin: -4px 0 7px 0;
    cursor: pointer;
    svg {
      margin-left: 8px;
      margin-top: -3px;
    }
    span.count {
      border-radius: 20% 20%;
      background: #5180d8;
      color: white;
      width: auto;
      height: 16px;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      line-height: 16px;
      padding: 2px 4px;
      box-shadow: 1px 1px 4px 0px rgba(0,0,0,0.3);
    }
  }
  .log-item {
    display: ${props => props.collapsed ? 'none': 'block' };
    pre.print-string {
      background-color: white;
    }
  }
  margin-left: 25px;
  margin-bottom: 20px;
  width: calc(100% - 50px);
`;

export default DivInspect;