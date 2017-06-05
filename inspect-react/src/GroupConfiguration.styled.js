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

const Configs = styled.div`
  animation: ${props => props.configs_show ? `${animeEnter} 0.15s ease-in normal 1` : `${animeLeave} 0.15s ease-in`};
  background: #cecece;
  border-radius: 10px 10px 0 0;
  bottom: 35px;
  box-shadow: 0px -2px 16px 0px rgba(0,0,0,0.75);
  margin-left: 100px;
  opacity: 50%;
  padding: 15px 15px;
  position: fixed;
  visibility: ${props => props.configs_show ? 'visible' : 'hidden' };
  width: 400px; //calc(100vw - 300px);
  z-index: 0;
  max-height: calc(100vh - 60px);
  overflow: auto;
  font-size: 13px;
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    user-select: none;
    li {
      div.toggle {
        max-width: 190px;
      }
      svg {
        font-size: 1.6em;
      }
      font-size: 13px;
      line-height: 24px;
      padding: 5px;
      cursor: pointer;
      user-select: none;
      &:hover {
        background: #959595;
        border-radius: 3px;
      }
    }
  }

  .flex-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: stretch;
    align-items: flex-start;
  }

  .flex-item:nth-child(1) {
    order: 0;
    flex: 0 1 160px;
    align-self: auto;
  }

  .flex-item:nth-child(2) {
    order: 0;
    flex: 0 1 auto;
    align-self: auto;
  }
`;

const SpanEdit = styled.span`
  color: #127509;
`;

export { Configs, SpanEdit };
