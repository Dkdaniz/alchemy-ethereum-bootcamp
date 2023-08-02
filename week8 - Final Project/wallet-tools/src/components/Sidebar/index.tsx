import { useState } from 'react';

import {
  FiClock,
  FiHome,
  FiArrowUpLeft,
  FiArrowDownRight,
} from 'react-icons/fi';

import { LuGlobe2, LuTicket, LuBookmarkMinus } from 'react-icons/lu';

import { Container, Button, ConnectButton } from './style';

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
  const [option, setOption] = useState<Option>(Option.Home);

  return (
    <>
      <Container>
        <div>
          <h1 style={{ fontSize: 24, marginLeft: 45, marginTop: 45 }}>
            Wallet Tools
          </h1>
          <div
            style={{
              marginLeft: 45,
              marginTop: 55,
            }}
          >
            <h2 style={{ fontSize: 14, color: '#9196A8' }}>Wallets</h2>
            <ul
              style={{
                listStyleType: 'none',
              }}
            >
              <li>
                <Button
                  onClick={() => setOption(Option.Home)}
                  color={option === Option.Home ? 'blue' : 'black'}
                >
                  <FiHome size={24} />
                  <p>Overview</p>
                </Button>
              </li>
              <li>
                <Button>
                  <FiArrowUpLeft size={24} />
                  <p>Receive</p>
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => setOption(Option.Send)}
                  color={option === Option.Send ? 'blue' : 'black'}
                >
                  <FiArrowDownRight size={24} />
                  <p>Send</p>
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => setOption(Option.History)}
                  color={option === Option.History ? 'blue' : 'black'}
                >
                  <FiClock size={24} />
                  <p>History</p>
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => setOption(Option.Save)}
                  color={option === Option.Save ? 'blue' : 'black'}
                >
                  <LuBookmarkMinus size={24} />
                  <p>Save</p>
                </Button>
              </li>
            </ul>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: 45,
              marginTop: 45,
            }}
          >
            <h2 style={{ fontSize: 14, color: '#9196A8' }}>Apps</h2>
            <ul
              style={{
                listStyleType: 'none',
              }}
            >
              <li>
                <Button
                  onClick={() => setOption(Option.Explorer)}
                  color={option === Option.Explorer ? 'blue' : 'black'}
                >
                  <LuGlobe2 size={24} />
                  <p>Explorer</p>
                </Button>
              </li>
              <li>
                <Button
                  onClick={() => setOption(Option.Disperse)}
                  color={option === Option.Disperse ? 'blue' : 'black'}
                >
                  <LuTicket size={24} />
                  <p>Disperse App</p>
                </Button>
              </li>
            </ul>
          </div>

          <div>
            {/* <Box
              display='flex'
              flexDirection='row'
              position='absolute'
              bottom={0}
              justifyContent='center'
              background='#a167ff'
              marginLeft={45}
              marginTop={55}
              marginBottom={55}
              borderRadius={20}
              padding={5}
              width={180}
            >
              <MetamaskIcon marginTop={0} fill={'white'} />
              <ConnectStack>Connect</ConnectButton>
            </Box> */}
          </div>
        </div>
      </Container>
    </>
  );
}

export default Sidebar;
