import styled from 'styled-components';

export const ListTokens = styled.ul`
  overflow-y: auto;
  height: 63vh;
  margin-top: 10px;

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-track {
    width: 0px;
  }
`;
