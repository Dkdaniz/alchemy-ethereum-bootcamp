import { Box, Container } from '@chakra-ui/react';

import { Title } from './style';

function Sidebar() {
  return (
    <>
      <Container maxWidth={'254'} maxHeight={'1080'} backgroundColor={'blue'}>
        <Box>
          <Title>Wallet Tools</Title>
          <Container>
            <h2>Wallet</h2>
          </Container>
        </Box>
      </Container>
    </>
  );
}

export default Sidebar;
