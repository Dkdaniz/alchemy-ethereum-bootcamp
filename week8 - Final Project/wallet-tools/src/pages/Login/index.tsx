import { useMetamaskStore } from '../../store/metamask';
import { useNavigate } from 'react-router-dom';

import LoginImg from '../../assets/login.png';
import ArrowIcon from '../../assets/arrow-left.svg';

import {
  Container,
  Title,
  ButtonGroup,
  MetamaskButton,
  ComingSoonButton,
} from './style';
import { useState } from 'react';

function Login() {
  const { account, requestAccounts } = useMetamaskStore();
  const [isOver, setIsOver] = useState<boolean>(false);

  const navigate = useNavigate();

  const connectMetamask = async () => {
    if (account !== '') {
      navigate('/home');
    } else {
      await requestAccounts();
      navigate('/home');
    }
  };

  return (
    <>
      <Container>
        <div
          style={{
            display: 'flex',
          }}
        >
          <img
            style={{
              width: '800px',
              objectFit: 'cover',
              objectPosition: '100% 0',
            }}
            src={LoginImg}
            alt=''
          ></img>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Title>
            <h1>How do you want to connect?</h1>
          </Title>
          <ButtonGroup>
            <MetamaskButton
              onMouseOver={() => setIsOver(true)}
              onMouseLeave={() => setIsOver(false)}
            >
              <button
                onClick={() => {
                  connectMetamask();
                }}
              >
                <div>
                  <p>Metamask</p>
                </div>
                <div style={{ width: '130px', marginLeft: '80px' }}>
                  {isOver === true ? (
                    <img width={30} src={ArrowIcon}></img>
                  ) : (
                    ''
                  )}
                </div>
              </button>
            </MetamaskButton>
            <ComingSoonButton>
              <button>
                <div>
                  <p>Ledger (Coming Soon)</p>
                </div>
              </button>
            </ComingSoonButton>
            <ComingSoonButton>
              <button>
                <div>
                  <p>Trezor (Coming Soon)</p>
                </div>
              </button>
            </ComingSoonButton>
          </ButtonGroup>
        </div>
      </Container>
    </>
  );
}

export default Login;
