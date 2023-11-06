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

export const Transaction = styled.div`
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
  margin-top: 10px;
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
    white-space: nowrap;
    margin-right: 20px;
    font-size: 14px;
  }
`;
