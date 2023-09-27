import Sidebar from '../../components/Sidebar';

import EthereumIcon from '../../assets/ethereum.svg';
import WalletIcon from '../../assets/wallet.svg';
import NoteIcon from '../../assets/note.svg';

import {
  Container,
  Section,
  Title,
  LineHorizontal,
  LineVertical,
  Header,
  Body,
  Register,
  InputGroup,
  Icon,
  ButtonGroup,
  InputBlock,
  Recipient,
} from './style';

export default function Save() {
  return (
    <>
      <Container>
        <Sidebar />
        <Section>
          <Header>
            <Title>
              <h1>Save</h1>
            </Title>
            <LineHorizontal>
              <div />
            </LineHorizontal>
          </Header>
          <Body>
            <Register>
              <h2>Register new wallet</h2>
              <InputBlock>
                <InputGroup key='input-name'>
                  <Icon>
                    <img src={EthereumIcon} alt='Your SVG' />
                    <p>Name</p>
                  </Icon>

                  <LineVertical>
                    <div />
                  </LineVertical>
                  <input type='text' value={'Cleiton'} />
                </InputGroup>
                <InputGroup key='input-wallet'>
                  <Icon>
                    <img src={WalletIcon} alt='Your SVG' />
                    <p>Wallet</p>
                  </Icon>
                  <LineVertical>
                    <div />
                  </LineVertical>
                  <input
                    type='text'
                    value={'0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f'}
                  />
                </InputGroup>
                <InputGroup key='input-note'>
                  <Icon>
                    <img src={NoteIcon} alt='Your SVG' />
                    <p>Notes</p>
                  </Icon>

                  <LineVertical>
                    <div />
                  </LineVertical>
                  <input type='text' value={'my friend from university'} />
                </InputGroup>
              </InputBlock>
              <ButtonGroup>
                <div>
                  <button>Add Recipient</button>
                </div>
              </ButtonGroup>
            </Register>
            {/* <Recipient>
              <h2>Recipients</h2>
            </Recipient> */}
          </Body>
        </Section>
      </Container>
    </>
  );
}
