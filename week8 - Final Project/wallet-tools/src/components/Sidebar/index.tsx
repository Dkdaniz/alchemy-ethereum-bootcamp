import { Box } from '@chakra-ui/react';

import IconHome from '../../assets/home.svg';
import IconReceive from '../../assets/receive.svg';
import IconSend from '../../assets/send.svg';
import IconHistory from '../../assets/history.svg';
import IconSave from '../../assets/save.svg';
import IconMetamask from '../../assets/metamask.svg';

import { Container, Button, Icon, ConnectButton } from './style';

function Sidebar() {
  return (
    <>
      <Container>
        <Box>
          <h1 style={{ fontSize: 24, marginLeft: 45, marginTop: 45 }}>
            Wallet Tools
          </h1>
          <Box display='flex' flexDirection='column'>
            <Box
              display='flex'
              flexDirection='column'
              marginLeft={45}
              marginTop={55}
            >
              <h2 style={{ fontSize: 14, color: '#9196A8' }}>Wallet</h2>
              <Box display='flex' flexDirection='row'>
                <Icon src={IconHome} />
                <Button>Overview</Button>
              </Box>
              <Box display='flex' flexDirection='row'>
                <Icon src={IconReceive} />
                <Button>Receive</Button>
              </Box>
              <Box display='flex' flexDirection='row'>
                <Icon src={IconSend} />
                <Button>Save</Button>
              </Box>
              <Box display='flex' flexDirection='row'>
                <Icon src={IconHistory} />
                <Button>History</Button>
              </Box>
              <Box display='flex' flexDirection='row'>
                <Icon src={IconSave} />
                <Button>Save</Button>
              </Box>
            </Box>
            <Box
              display='flex'
              flexDirection='column'
              marginLeft={45}
              marginTop={55}
            >
              <h2 style={{ fontSize: 14, color: '#9196A8' }}>Apps</h2>
              <Box display='flex' flexDirection='row'>
                <Icon src={IconHome} />
                <Button>Explorer</Button>
              </Box>
              <Box display='flex' flexDirection='row'>
                <Icon src={IconReceive} />
                <Button>Disperse App</Button>
              </Box>
            </Box>
            <Box
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
              <img src={IconMetamask} />
              <ConnectButton>Connect</ConnectButton>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Sidebar;
