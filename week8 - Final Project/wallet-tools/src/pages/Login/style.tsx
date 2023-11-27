import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;

  background: #eef1f6;
`;

export const Title = styled.div`
  justify-content: start;
  margin: 125px 32px 32px 54px;

  margin-bottom: 100px;

  h1 {
    font-size: 45px;
    font-weight: 300;

    text-align: center;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

export const MetamaskButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-bottom: 35px;

  border-radius: 10px;

  background: #4a51fd;

  &:hover {
    background-color: #2989f6;
  }

  button {
    display: flex;
    flex-direction: row;

    align-items: center;

    width: 500px;
    height: 100px;

    padding: 20px;

    div {
      width: 450px;

      p {
        text-align: right;
        font-size: 24px;
        font-weight: 400;

        color: #fff;
      }
    }
  }
`;

export const ComingSoonButton = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;

  margin-bottom: 35px;

  border-radius: 10px;

  background: #b8b8d3;

  button {
    display: flex;
    flex-direction: row;

    align-items: center;

    width: 500px;
    height: 100px;

    padding: 20px;

    div {
      width: 450px;

      p {
        text-align: center;
        font-size: 24px;
        font-weight: 400;

        color: #141736;
      }
    }
  }
`;
