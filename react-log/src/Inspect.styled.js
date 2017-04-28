import styled, {injectGlobal} from 'styled-components';

const Inspector = styled.div`
  margin: ${props => props.collapsed ? '1px 0 0 25px;' : '5px 0 0 25px;' };
  padding: ${props => props.collapsed ? '4px 0;' : '0' };
  width: calc(100% - 50px);
  
  &:hover {
    background: ${props => props.collapsed ? '#bfbfbf' : 'inherit'};
  }
  
  hr {
    width: 100%;
    border: none;
    border-top: ${props => props.collapsed ? '1px solid #c7c7c7' : '1px solid #9e9e9e'};
    margin: 0 0 4px 0;
    display: ${props => props.collapsed ? 'none;': 'block;' };
  }
  h2 {
    color: ${props => props.collapsed ? '#676767': 'black' };
    font-size: ${props => props.collapsed ? '80%': '90%' };
    margin: ${props => props.collapsed ? '0px' : '-4px 0 7px 0'};
    cursor: pointer;
    user-select: none;
    svg {
      margin-left: 6px;
    }
    span.copy {
      font-size: 1.1em;
      color: #858585;
      svg {
        transform: scale(1);
        transition: all ease-in-out .1s;
      }
      &:hover {
        color: #3c3c3c;
        svg {
          transform: scale(1.3);
          transition: all ease-in-out .1s;
        }
      }
    }
    span.count {
      border-radius: 20% 20%;
      background: #5180d8;
      color: white;
      width: auto;
      height: 14px;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      line-height: 14px;
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
`;

const BookMark = styled.span`
  color: #a0a0a0;
  font-size: 1em;
  svg {
    margin: 0;
    padding: 0;
  }
  margin: 0 5px 0 0;
`;

injectGlobal`
  .level-1 {
    color: #419c0a !important;
    svg {
      transform:scale(1.2);
    }
  }
  .level-2 {
    color: #f05a19 !important;
    svg {
      transform:scale(1.4);
    }
  }
  .level-3 {
    color: #0d4fbc !important;
    svg {
      transform:scale(1.5);
    }
  }
  .level-4 {
    color: #760b9f !important;
    svg {
      transform:scale(1.7);
    }
  }
  .level-5 {
    color: #d70e12 !important;
    svg {
      transform:scale(2);
    }
  }
`;

export {Inspector, BookMark};