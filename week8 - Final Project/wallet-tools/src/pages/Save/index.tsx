import Sidebar from '../../components/Sidebar';

import EthereumIcon from '../../assets/ethereum.svg';
import WalletIcon from '../../assets/wallet.svg';
import NoteIcon from '../../assets/note.svg';
import UserIcon from '../../assets/user.svg';
import DeleteIcon from '../../assets/delete.svg';
import SearchIcon from '../../assets/search.svg';

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
  IconInput,
  ButtonGroup,
  InputBlock,
  Recipient,
  UserBlock,
  User,
  Account,
  ButtonUser,
  IconUser,
  ListUsers,
  Search,
} from './style';

const users = [
  { name: 'Daniel', account: '0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f' },
  { name: 'Daiane', account: '0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f' },
  { name: 'Pedro', account: '0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f' },
  { name: 'Aron', account: '0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f' },
  { name: 'Ezequiel', account: '0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f' },
  { name: 'Daniel', account: '0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f' },
  { name: 'Daiane', account: '0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f' },
  { name: 'Pedro', account: '0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f' },
  { name: 'Aron', account: '0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f' },
  { name: 'Ezequiel', account: '0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f' },
];

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
              <h2>Register</h2>
              <InputBlock>
                <InputGroup key='input-name'>
                  <IconInput>
                    <img src={EthereumIcon} alt='Ethereum' />
                    <p>Name</p>
                  </IconInput>

                  <LineVertical>
                    <div />
                  </LineVertical>
                  <input type='text' value={'Cleiton'} />
                </InputGroup>
                <InputGroup key='input-wallet'>
                  <IconInput>
                    <img src={WalletIcon} alt='Wallet' />
                    <p>Wallet</p>
                  </IconInput>
                  <LineVertical>
                    <div />
                  </LineVertical>
                  <input
                    type='text'
                    value={'0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f'}
                  />
                </InputGroup>
                <InputGroup key='input-note'>
                  <IconInput>
                    <img src={NoteIcon} alt='Note' />
                    <p>Notes</p>
                  </IconInput>

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
            <Recipient>
              <h2>Wallets</h2>
              <Search>
                <input type='text' placeholder='Search' />
                <img src={SearchIcon} alt='Search' />
              </Search>
              <ListUsers>
                {users.map((user) => (
                  <li style={{ listStyleType: 'none' }}>
                    <UserBlock>
                      <User>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}
                        >
                          <IconUser>
                            <img src={UserIcon} alt='User' />
                          </IconUser>
                          <Account>
                            <p>{user.name}</p>
                            <p>{user.account}</p>
                          </Account>
                        </div>

                        <ButtonUser>
                          <button>
                            <img src={DeleteIcon} alt='Delete' />
                          </button>
                        </ButtonUser>
                      </User>
                    </UserBlock>
                  </li>
                ))}
              </ListUsers>
            </Recipient>
          </Body>
        </Section>
      </Container>
    </>
  );
}
