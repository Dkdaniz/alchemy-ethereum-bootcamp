import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100% - 254px - 80px);

  background-color: #fff;

  align-items: center;

  padding: 32px;

  margin-bottom: 24px;
  margin-top: 24px;

  border-radius: 32px;

  h1 {
    margin-top: 150px;
  }

  p {
    margin-top: 18px;
  }
`;

export const QRCode = styled.img`
  margin-top: 70px;
  border: 4px solid #0177fb;
  border-radius: 20px;

  width: 300px;
`;
