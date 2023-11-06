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

export const TransactionInfo = styled.div`
  display: flex;
  flex-direction: column;

  div {
    margin-top: 10px;

    b {
      font-size: 14px;
    }

    p {
      font-size: 12px;
      flex-wrap: 'wrap';
    }
  }
`;

export const Transaction = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 750px;
  height: 100%;

  margin: 0px 0px 0px 150px;

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

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  background: #dde1eb;

  border-radius: 40px;
  width: 76px;
  height: 74px;
`;

export const TitleDetails = styled.div`
  justify-content: start;
  margin: 32px 32px 32px 32px;

  h2 {
    font-size: 16px;
    font-weight: 500;
  }
`;
