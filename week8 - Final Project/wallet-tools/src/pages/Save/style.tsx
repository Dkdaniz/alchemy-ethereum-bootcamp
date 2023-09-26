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

  p {
    font-size: 18px;
    font-weight: 500;
  }
`;

export const Line = styled.div`
  display: flex;
  flex-direction: row;

  div {
    width: 100vh;
    border-top: 2px solid #ececec;

    margin-right: 18px;
    margin-left: 18px;
  }
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Register = styled.div`
  margin: 46px 0px 0px 90px;

  p {
    font-size: 14px;
    font-weight: 500;
  }
`;

export const Input = styled.input`
  stroke-width: 2px;
  stroke: #eae9ea;
`;
