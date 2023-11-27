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

  margin-top: 20px;
  margin-bottom: 20px;

  border-radius: 12px;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  justify-content: start;
  margin: 32px 32px 32px 54px;

  h1 {
    font-size: 20px;
    font-weight: 500;
  }
`;

export const LineHorizontal = styled.div`
  display: flex;
  flex-direction: row;

  div {
    width: 100%;
    border-top: 3px solid #ececec;

    margin-right: 18px;
    margin-left: 18px;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: row;

  height: 100%;
`;

export const Register = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 750px;
  height: 100%;

  margin: 0px 0px 0px 90px;

  border-right: 3px solid #ececec;

  h2 {
    margin-top: 50px;
    font-size: 18px;
    font-weight: 500;
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

export const InputBlock = styled.div`
  margin-top: 30px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 26px;
  margin-right: 50px;

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

  margin-right: 20px;

  img {
    width: 45px;
    margin: 20px 40px 20px 25px;
  }

  p {
    white-space: nowrap;
    margin-right: 20px;
    font-size: 14px;
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

    margin-top: 80px;

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

export const ButtonSendGroup = styled.div`
  display: flex;
  margin-top: 30px;
  margin-left: 20px;

  div {
    display: flex;
    flex-direction: column;
    border-radius: 12px;

    width: 120px;

    height: 60px;

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

export const Recipient = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  margin: 0 50px 0 50px;

  h2 {
    margin-top: 50px;
    font-size: 18px;
    font-weight: 500;
  }
`;

export const UserBlock = styled.div`
  display: flex;
  flex-direction: row;
  flex-direction: column;

  background-color: #f7f5fe;

  border-radius: 17px;
  border: 1px solid #323336;

  margin-top: 26px;
`;

export const User = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  height: 73px;
`;

export const Account = styled.div`
  display: flex;
  flex-direction: column;

  p {
    margin-top: 5px;
    font-size: 14px;
    font-weight: 500;
  }
`;

export const ButtonUser = styled.div`
  display: flex;

  img {
    width: 24px;
    margin-right: 24px;
  }
`;

export const IconUser = styled.div`
  display: flex;
  margin-left: 24px;

  img {
    margin-right: 24px;
    width: 28px;
  }
`;

export const ListUsers = styled.ul`
  overflow-y: auto;
  height: 63vh;
  margin-top: 35px;

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-track {
    width: 0px;
  }
`;

export const Search = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 100%;

  border: 2px solid #ececec;
  border-radius: 10px;

  margin-top: 30px;

  padding: 12px;

  input {
    padding: 12px;

    width: 100%;
    height: 30px;
  }

  input:focus {
    outline: 0;
  }

  img {
    margin-right: 12px;

    width: 28px;
  }
`;

export const Line = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin: 60px 100px 30px 50px;

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

export const InputSelect = styled.div`
  display: flex;
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

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  background: #dde1eb;

  border-radius: 40px;
  width: 76px;
  height: 74px;

  margin-bottom: 20px;
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
