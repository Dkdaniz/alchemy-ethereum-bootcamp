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

  max-width: 680px;

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

    margin-top: 76px;

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
    &:nth-child(2) {
      margin-top: 5px;
      font-size: 12px;
      font-weight: 600;
    }
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

  border: 2px solid #ececec;
  border-radius: 10px;

  margin-top: 50px;

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
