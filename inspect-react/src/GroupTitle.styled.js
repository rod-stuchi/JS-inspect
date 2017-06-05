import styled, { keyframes } from 'styled-components';

const animeEnter = keyframes`
  from{
    opacity: 0.1;
    bottom: 0px;
  }
  to {
    opacity: 1;
    bottom: 35px;
    visibility: visible;
  }
`;

const animeLeave = keyframes`
  from{
    opacity: 1;
    bottom: 35px;
    visibility: visible;
  }
  to {
    opacity: 0.1;
    bottom: 0px;
    visibility: hidden;
  }
`;

const Titles = styled.div`
  animation: ${props => props.titles_show ? `${animeEnter} 0.15s ease-in normal 1` : `${animeLeave} 0.15s ease-in`};
  background: #cecece;
  border-radius: 10px 10px 0 0;
  bottom: 35px;
  box-shadow: 0px -2px 16px 0px rgba(0,0,0,0.75);
  margin-left: 150px;
  opacity: 50%;
  padding: 5px 5px 10px;
  position: fixed;
  visibility: ${props => props.titles_show ? 'visible' : 'hidden' };
  width: calc(100vw - 300px);
  z-index: 0;
  max-height: calc(100vh - 60px);
  overflow: auto;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    user-select: none;
    li {
      svg {
          margin-right: 10px;
      }
      font-size: 13px;
      padding: 5px;
      cursor: pointer;
      user-select: none;
      &:hover {
        //background: #009607;
        background: rgb(18, 117, 9);
        color: white;
      }
    }
  }
`;

export default Titles;
