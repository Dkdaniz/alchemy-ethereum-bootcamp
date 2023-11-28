import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import {
  FiClock,
  FiHome,
  FiArrowUpLeft,
  FiArrowDownRight,
} from 'react-icons/fi';

import { LuGlobe2, LuTicket, LuBookmarkMinus } from 'react-icons/lu';

import { Container, Button, Section, List, ItemList } from './style';

const enum Option {
  Home,
  Receive,
  Send,
  History,
  Save,
  Explorer,
  Disperse,
}

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [option, setOption] = useState<Option>(Option.Receive);

  useEffect(() => {
    const routeName = location.pathname;

    switch (routeName) {
      case '/home':
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
                  onClick={() => navigate('/home')}
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
                  onClick={() => navigate('/send')}
                  color={option === Option.Send ? '#0038FF' : '#323336'}
                >
                  <FiArrowUpLeft size={24} />
                  <p>Send</p>
                </Button>
              </ItemList>
              <ItemList>
                <Button
                  onClick={() => navigate('/history')}
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
                  onClick={() => navigate('/explorer')}
                  color={option === Option.Explorer ? '#0038FF' : '#323336'}
                >
                  <LuGlobe2 size={24} />
                  <p>Explorer</p>
                </Button>
              </ItemList>
              <ItemList>
                <Button
                  onClick={() => navigate('/disperse')}
                  color={option === Option.Disperse ? '#0038FF' : '#323336'}
                >
                  <LuTicket size={24} />
                  <p>Disperse App</p>
                </Button>
              </ItemList>
            </List>
          </Section>
        </div>
      </Container>
    </>
  );
}

export default Sidebar;
