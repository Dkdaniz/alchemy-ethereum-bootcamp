import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMetamaskStore } from '../../store/metamask';

import {
  FiClock,
  FiHome,
  FiArrowUpLeft,
  FiArrowDownRight,
} from 'react-icons/fi';

import { LuGlobe2, LuTicket, LuBookmarkMinus } from 'react-icons/lu';

import {
  Container,
  Button,
  Section,
  List,
  ItemList,
  MetamaskButton,
} from './style';

const enum Option {
  Home,
  Receive,
  Send,
  History,
  Save,
  Explorer,
  Disperse,
}

function MetamaskIcon() {
  return (
    <>
      <div>
        <svg
          width='24'
          height='25'
          viewBox='0 0 24 25'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g clipPath='url(#clip0_520_1094)'>
            <path
              d='M4.11508 4.57727L9.51008 7.06727H14.4901L19.8851 4.57727L21.1301 7.06727L19.8851 12.8773L21.5451 17.0273L20.3001 20.9698L16.5651 19.9323L14.2826 22.0073H9.71758L7.43508 19.9323L3.70008 20.9698L2.45508 17.0273L4.11508 12.8773L2.87008 7.06727L4.11508 4.57727Z'
              stroke='white'
              strokeWidth='0.83'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M8.26514 14.1218L9.92514 14.5372'
              stroke='white'
              strokeWidth='0.83'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M4.11499 12.8773L8.47249 12.0473L9.14687 11.1654L9.50999 7.06726'
              stroke='white'
              strokeWidth='0.83'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M9.14687 11.1654L4.11499 4.57727'
              stroke='white'
              strokeWidth='0.83'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M19.885 12.8773L15.5275 12.0473L14.8531 11.1654L14.49 7.06726'
              stroke='white'
              strokeWidth='0.83'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M14.8533 11.1654L19.8851 4.57727'
              stroke='white'
              strokeWidth='0.83'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M10.178 19.6411L10.6247 17.4423H13.3753L13.8221 19.6411H10.178Z'
              stroke='white'
              strokeWidth='0.83'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M15.735 14.1218L14.075 14.5372'
              stroke='white'
              strokeWidth='0.83'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M2.45508 17.0273L8.30954 16.1973L10.6513 17.4423'
              stroke='white'
              strokeWidth='0.83'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <path
              d='M21.5451 17.0273L15.6906 16.1973L13.3489 17.4423'
              stroke='white'
              strokeWidth='0.83'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </g>
          <defs>
            <clipPath id='clip0_520_1094'>
              <rect
                width='24'
                height='24'
                fill='white'
                transform='translate(0 0.877319)'
              />
            </clipPath>
          </defs>
        </svg>
      </div>
    </>
  );
}

function Sidebar() {
  const navigate = useNavigate();
  const { requestAccounts } = useMetamaskStore();
  const location = useLocation();

  const [option, setOption] = useState<Option>(Option.Receive);

  useEffect(() => {
    const routeName = location.pathname;

    console.log(routeName);

    switch (routeName) {
      case '/':
        setOption(Option.Home);
        break;
      case '/receive':
        setOption(Option.Receive);
        break;
      case '/send':
        setOption(Option.Send);
        break;
      case '/history':
        setOption(Option.History);
        break;
      case '/save':
        setOption(Option.Save);
        break;
      case '/explorer':
        setOption(Option.Explorer);
        break;
      case '/disperse':
        setOption(Option.Disperse);
        break;
      default:
        break;
    }
  }, [location.pathname]);

  return (
    <>
      <Container>
        <div>
          <h1 style={{ fontSize: 24, marginLeft: 45, marginTop: 45 }}>
            Wallet Tools
          </h1>
          <Section>
            <h2 style={{ fontSize: 14, color: '#9196A8' }}>Wallets</h2>
            <List>
              <ItemList>
                <Button
                  onClick={() => navigate('/')}
                  color={option === Option.Home ? '#0038FF' : '#323336'}
                >
                  <FiHome size={24} />
                  <p>Overview</p>
                </Button>
              </ItemList>
              <ItemList>
                <Button
                  onClick={() => navigate('/receive')}
                  color={option === Option.Receive ? '#0038FF' : '#323336'}
                >
                  <FiArrowDownRight size={24} />
                  <p>Receive</p>
                </Button>
              </ItemList>
              <ItemList>
                <Button
                  onClick={() => setOption(Option.Send)}
                  color={option === Option.Send ? '#0038FF' : '#323336'}
                >
                  <FiArrowUpLeft size={24} />
                  <p>Send</p>
                </Button>
              </ItemList>
              <ItemList>
                <Button
                  onClick={() => setOption(Option.History)}
                  color={option === Option.History ? '#0038FF' : '#323336'}
                >
                  <FiClock size={24} />
                  <p>History</p>
                </Button>
              </ItemList>
              <ItemList>
                <Button
                  onClick={() => navigate('/save')}
                  color={option === Option.Save ? '#0038FF' : '#323336'}
                >
                  <LuBookmarkMinus size={24} />
                  <p>Save</p>
                </Button>
              </ItemList>
            </List>
          </Section>
          <Section>
            <h2 style={{ fontSize: 14, color: '#9196A8' }}>Apps</h2>
            <List>
              <ItemList>
                <Button
                  onClick={() => setOption(Option.Explorer)}
                  color={option === Option.Explorer ? '#0038FF' : '#323336'}
                >
                  <LuGlobe2 size={24} />
                  <p>Explorer</p>
                </Button>
              </ItemList>
              <ItemList>
                <Button
                  onClick={() => setOption(Option.Disperse)}
                  color={option === Option.Disperse ? '#0038FF' : '#323336'}
                >
                  <LuTicket size={24} />
                  <p>Disperse App</p>
                </Button>
              </ItemList>
            </List>
          </Section>

          <MetamaskButton
            style={{
              display: 'flex',
              flexDirection: 'row',
              background: '#0038FF',
              position: 'absolute',
              bottom: 0,
              justifyContent: 'center',
              backgroundColor: '#A167FF',
              marginLeft: 45,
              marginTop: 55,
              marginBottom: 55,
              borderRadius: 10,
              padding: 5,
              width: 150,
            }}
            onClick={() => requestAccounts()}
          >
            <MetamaskIcon />
            <p>Connect</p>
          </MetamaskButton>
        </div>
      </Container>
    </>
  );
}

export default Sidebar;
