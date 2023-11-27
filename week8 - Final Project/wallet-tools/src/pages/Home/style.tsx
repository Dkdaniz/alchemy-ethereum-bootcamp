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

  background-color: #fdf3f3;

  margin-bottom: 20px;

  border-radius: 12px;
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

export const InputBlock = styled.div`
  margin-top: 10px;
`;

export const Title = styled.div`
  justify-content: start;
  margin: 32px 32px 0px 54px;

  h1 {
    font-size: 20px;
    font-weight: 500;
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

export const ListTransactionsComplete = styled.ul`
  margin-top: 10px;
  overflow-y: auto;
  height: 30vh;

  &::-webkit-scrollbar {
    width: 0px;
  }

  &::-webkit-scrollbar-track {
    width: 0px;
  }
`;
