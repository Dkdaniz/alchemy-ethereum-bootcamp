import styled from 'styled-components';

interface TransactionProps {
  selected: boolean;
}

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

  margin-left: 20px;
`;

export const Transactions = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  min-width: 200px;

  margin: 0px 0px 0px 70px;

  border-right: 3px solid #ececec;
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

  margin-left: 50px;
  margin-bottom: 20px;
`;

export const TitleDetails = styled.div`
  justify-content: start;
  margin: 0px 32px 35px 0px;

  h2 {
    margin-top: 50px;
    font-size: 18px;
    font-weight: 500;
  }
`;

export const IconDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  margin: 0px 40px 10px 140px;

  p {
    font-size: 14px;
    flex-wrap: 'wrap';
    font-weight: 700;
  }
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;

  align-content: revert;
  width: 400px;
  max-width: 400px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const TopicInfo = styled.div`
  margin-top: 24px;

  b {
    font-size: 14px;
    color: #a6a6a6;
  }

  p {
    font-size: 12px;
    flex-wrap: 'wrap';
    font-weight: 700;
  }

  a {
    font-size: 12px;
    flex-wrap: 'wrap';
    font-weight: 700;
    color: #4740f5;
  }
`;

export const PendingTransactions = styled.div`
  margin-right: 20px;

  h2 {
    margin-top: 50px;
    font-size: 18px;
    font-weight: 500;
  }
`;

export const ListTransactionsComplete = styled.ul`
  margin-top: 10px;
  overflow-y: auto;
  height: 61vh;

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-track {
    width: 0px;
  }
`;

export const ListTransactionsPending = styled.ul`
  overflow-y: auto;
  max-height: 200px;

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-track {
    width: 0px;
  }
`;

export const CompletedTransactions = styled.div`
  margin-right: 20px;

  h2 {
    margin-top: 30px;
    font-size: 18px;
    font-weight: 500;
  }
`;

export const Transaction = styled.div<TransactionProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 17px;
  height: 70px;

  margin-top: 24px;

  background: ${(props) => (props.selected === true ? '#F7F5FE' : 'none')};

  :hover {
    cursor: pointer;
  }
`;
