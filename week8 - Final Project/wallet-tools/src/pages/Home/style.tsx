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
  float: right;
  margin-top: 10px;
`;
