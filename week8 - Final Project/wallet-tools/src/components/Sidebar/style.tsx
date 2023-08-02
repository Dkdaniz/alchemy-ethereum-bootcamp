import styled from 'styled-components';

interface ButtonProps {
  color: string;
}

export const Container = styled.div`
  display: flex;
  direction: column;
  justify-content: start;
  width: 254px;
  background: #ffffff;
  height: 100vh;
`;

export const Button = styled.div<ButtonProps>`
  display: flex;
  background: transparent;
  margin-top: 35px;

  p {
    margin-left: 8px;
  }

  color: ${(props) => props.color};
`;

export const Section = styled.div`
  display: 'flex';
  flex-direction: 'column';
  margin-top: 45px;
  margin-left: 45px;
`;

export const List = styled.ul`
  list-style-type: none;
`;

export const ItemList = styled.li`
  cursor: pointer;
`;

export const MetamaskButton = styled.div`
  cursor: pointer;

  p {
    margin-left: 10px;
    color: #fff;
  }
`;
