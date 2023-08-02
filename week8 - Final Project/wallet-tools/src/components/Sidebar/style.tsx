import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  direction: column;
  justify-content: start;
  width: 254px;
  background: #ffffff;
  height: 100vh;
`;

export const Button = styled.div`
  display: flex;
  background: transparent;
  margin-top: 35px;
  margin-left: 12px;

  p {
    margin-left: 8px;
  }

  &:hover {
    background: '#0038FF';
  }
`;

export const ConnectButton = styled.div`
  background: transparent;
  margin-left: 12px;

  color: #ffffff;

  img {
    margin-top: 35px;
  }
`;
