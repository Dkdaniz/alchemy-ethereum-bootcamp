import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;

  width: calc(100% - 254px - 44px);

  background-color: #fff;

  padding: 32px;

  margin-top: 20px;
  margin-bottom: 20px;

  border-radius: 12px;
`;

export const Headline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 30px;
  margin-bottom: 50px;
  margin-right: 50px;

  h1 {
    font-size: 24px;
    font-weight: 700;
  }
`;

//mudar para Contant
export const Body = styled.div`
  display: flex;
  flex-direction: column;

  max-width: 800px;

  width: 100%;
`;

export const InputBlock = styled.div``;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 26px;

  border-style: solid;
  border-width: 3px;
  border-color: #eae9ea;

  border-radius: 12px;

  input {
    width: 100%;
    outline: 0;

    padding: 0 10px 0 0;

    font-size: 14px;
  }

  input:focus {
    outline: 0;
  }
`;

export const IconInput = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  max-width: 120px;

  img {
    width: 80px;
    margin: 20px 40px 20px 25px;
  }

  p {
    white-space: nowrap;
    margin-right: 20px;
    font-size: 14px;
  }
`;

export const LineVertical = styled.div`
  width: 70px;

  transform: rotate(90deg);

  margin-left: 80px;

  div {
    border-top: 2px solid #ececec;
  }
`;

export const Line = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin: 50px 100px 30px 50px;

  p {
    margin: 0 20px 0 20px;
    white-space: nowrap;

    font-size: 18px;
    font-weight: 500;
  }

  div {
    width: 100%;
    border-top: 2px solid #ececec;
  }
`;

export const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  div {
    display: flex;
    flex-direction: column;
    border-radius: 12px;

    justify-items: center;

    margin-top: 50px;
    margin-right: 50px;

    height: 50px;

    width: 300px;
    background-color: #0177fb;
    justify-content: center;

    &:hover {
      background-color: #2989f6;
    }
  }

  button {
    color: #ffffff;
    font-weight: 500;
    font-size: 24px;
  }
`;

export const Input = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;

  * + input {
    text-align: right;
    padding-right: 20px;
  }
`;

export const ButtonModal = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  div {
    display: flex;
    flex-direction: column;
    border-radius: 12px;

    justify-items: center;

    margin-top: 30px;
    margin-bottom: 30px;

    height: 50px;

    width: 300px;
    background-color: #0177fb;
    justify-content: center;

    &:hover {
      background-color: #2989f6;
    }
  }

  button {
    color: #ffffff;
    font-weight: 500;
    font-size: 24px;
  }
`;

export const IconDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 18px;

  p {
    font-size: 14px;
    flex-wrap: 'wrap';
    font-weight: 700;
  }

  a {
    font-size: 12px;
    flex-wrap: 'wrap';
    font-weight: 700;
    color: #4740f5;

    margin-top: 55px;
    margin-bottom: 50px;
  }
`;

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  background: #dde1eb;

  border-radius: 40px;
  width: 76px;
  height: 74px;

  margin-bottom: 20px;
`;

export const TopicInfo = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;

  b {
    font-size: 14px;
    color: #a6a6a6;
  }

  a {
    margin-top: 12px;

    font-size: 12px;
    flex-wrap: 'wrap';
    font-weight: 700;

    color: #4740f5;
  }

  p {
    margin-top: 12px;

    font-size: 12px;
    flex-wrap: 'wrap';
    font-weight: 700;
  }

  p:first-child {
    font-size: 14px;
    color: #a6a6a6;
  }
`;
