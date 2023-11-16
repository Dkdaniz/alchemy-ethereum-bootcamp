import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(100% - 254px - 44px);

  background-color: #fff;

  align-items: center;

  padding: 32px;

  margin-top: 20px;
  margin-bottom: 20px;

  border-radius: 12px;
`;

export const Headline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-top: 150px;
    font-weight: 700;
    font-size: 24px;
  }

  p {
    margin-top: 18px;
  }
`;

export const QRCode = styled.img`
  margin-top: 70px;
  border: 4px solid #0038ff;
  border-radius: 20px;

  width: 300px;
`;

export const Line = styled.div`
  display: flex;
  flex-direction: row;

  p {
    white-space: nowrap;
  }

  div {
    margin: 12px 12px 0px 12px;
    width: 240px;
    border-top: 2px solid #ececec;
  }
`;

export const CopyPast = styled.div`
  display: flex;
  flex-direction: row;

  margin-top: 20px;
  margin-left: 12px;

  input {
    text-align: center;
    margin-right: 25px;
    border: 2px solid #ececec;
    border-radius: 5px;
    width: 100%;
    outline: none;
  }

  button {
    padding-left: 10px;
    border: 2px solid #ececec;
    border-radius: 5px;
    margin-right: 10px;
    max-width: 100%;
    width: 50px;
    height: 35px;
  }
`;
