import styled from 'styled-components';

export const ContainerApp = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100% - 254px - 44px);

  background-color: #fdf3f3;

  align-items: center;

  padding: 32px;

  margin-bottom: 20px;

  border-radius: 12px;
`;
