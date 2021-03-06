import styled, {keyframes} from 'styled-components';

const block = `
  margin: 0 25px;
  width: calc(100% - 50px);
`;

const Frame = styled.div`
  margin: auto;
  padding: 10px 0;
  background-color: #d8d8d8;
  h1 {
    margin: 0 0 5px 0;
    ${block}
    font-size: 150%;
    color: #127509;
    user-select: none;
    > img {
      border-radius: 0 0 10px 10px;
    }
    &:hover {
      color: #19aa0b;
      cursor: default;
    }
    > span {
      position: relative;
      top: -15px;
      left: 18px;
    }
  }
  .inspect {
    padding-bottom: ${props => props.clear ? '30px': '0px'};
  }
  .menu-bottom {
    @media print {
      display: none !important;
    }
    /* flex start */
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    /* flex end */

    background: #4a4a4a;
    box-shadow: 0px -2px 16px 0px rgba(0,0,0,0.75);
    height: 35px;
    margin: 0;
    position: fixed;
    top: calc(100vh - 35px);
    width: calc(100%);
    > div:nth-child(1) {
      /* flex start */
      order: 0;
      flex: 0 1 auto !important;
      align-self: auto;
      /* flex end */

      > .socketid {
        background: white;
        color: red;
        cursor: pointer;
        font-family: monospace;
        margin-left: 2px;
        padding: 2px;
        white-space: nowrap;
        &:before {
          content: 'ID: ';
        }
      }
    }
    > div:nth-child(2) {
      /* flex start */
      order: 0;
      flex: 1 1 auto;
      align-self: auto;
      /* flex end */
      background: #4a4a4a;
      height: 35px;
      z-index: 100;
      padding:0 15px;
      > ul.group-title {
        margin: 0;
        padding: 0;
        list-style-type: none;
        white-space: nowrap;
        > li.toggle {
          background: ${props => props.toggle ? '#595959' : '#7e7e7e'};
        }
        > li {
          background: #7e7e7e;
          border-radius: 2px;
          box-shadow: 1px 1px 6px 0px rgba(0,0,0,0.45);
          box-sizing: border-box;
          cursor: pointer;          
          display: inline-block;
          font-size: 13px;
          height: 26px;
          line-height: 19px;
          margin: 4px 4px 0;
          padding: 4px 10px;
          user-select: none;
          &:hover {
            //background: #626262;
            text-shadow: 0px 0px 6px rgba(255, 255, 255, 1);
            box-shadow: 1px 1px 6px 0px rgba(0,0,0,0.75);
          }
          &:active {
            box-shadow: -1px -1px 6px 0px rgba(0,0,0,0.75);
          }
        }
        > li.none {
          background: none;
          box-shadow: none;
          margin: 0;
          > label {
            div {
              display: table-cell;
              margin: 0 3px;
            }
          }
        }
      }
    }
  }
`;


const animeProg = keyframes`
  from {
    background-position-x: -92px;
  }
  to {
    background-position-x: 0px;
  }
`;

const ClearAll = styled.li`
  animation: ${props => props.show ? `${animeProg} 10s linear !important` : `none`};
  background: linear-gradient(
      to right,
      rgb(255, 255, 255) 0%, 
      rgb(196, 196, 196) 100%
    )
    #7e7e7e 
    no-repeat !important;
  background-size: 100% 2px !important;
  background-position: -92px 100% !important;
`;

const ConfirmClear = styled.li`
  color: red;
  margin-left: -3px !important;
  display: ${ props => props.show ? 'inline-block !important;': 'none !important;' };
`;

export {Frame, ClearAll, ConfirmClear }