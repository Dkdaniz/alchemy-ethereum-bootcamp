import { useState } from 'react';
import Select from 'react-select';
import type { Option, ActionMeta } from 'react-select';

import Sidebar from '../../components/Sidebar';

import EthereumIcon from '../../assets/ethereum.svg';
import WalletIcon from '../../assets/wallet.svg';
import UserIcon from '../../assets/user.svg';
import DeleteIcon from '../../assets/delete.svg';
import SearchIcon from '../../assets/search.svg';
import ArrowIcon from '../../assets/arrow.svg';

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
  Line,
  InputSelect,
} from './style';

const options = [
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'token', label: 'Token' },
];

const users = [
  {
    account: '0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f',
    balance: 180.0,
    symbol: 'USDT',
  },
  {
    account: '0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f',
    balance: 99.45,
    symbol: 'USDT',
  },
  {
    account: '0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f',
    balance: 15.0,
    symbol: 'USDT',
  },
  {
    account: '0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f',
    balance: 147.5,
    symbol: 'USDT',
  },
  {
    account: '0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f',
    balance: 38.54,
    symbol: 'USDT',
  },
  {
    account: '0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f',
    balance: 11.45,
    symbol: 'USDT',
  },
];

export default function Disperse() {
  const [selectedOption, setSelectedOption] = useState({
    value: 'token',
    label: 'Token',
  });

  return (
    <>
      <Container>
        <Sidebar />
        <Section>
          <Header>
            <Title>
              <h1>Disperse App</h1>
            </Title>
            <LineHorizontal>
              <div />
            </LineHorizontal>
          </Header>
          <Body>
            <Register>
              <h2>Add new Recipient</h2>
              <InputBlock>
                <div style={{ marginRight: '50px' }}>
                  <Select
                    options={options}
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,

                        height: '70px',
                        border: '3px solid #eae9ea',
                        borderRadius: '12px',
                        paddingLeft: '20px',
                      }),
                    }}
                  />
                </div>

                {selectedOption.value === 'token' ? (
                  <InputGroup key='input-wallet'>
                    <IconInput>
                      <img src={WalletIcon} alt='Wallet' />
                      <p>Contract Address</p>
                    </IconInput>
                    <LineVertical>
                      <div />
                    </LineVertical>
                    <input
                      type='text'
                      value={'0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f'}
                    />
                  </InputGroup>
                ) : (
                  ''
                )}
              </InputBlock>
              <Line>
                <div />
                <p>Insert all address and amounts</p>
                <div />
              </Line>
              <InputBlock>
                <InputGroup key='input-name'>
                  <IconInput>
                    <img src={WalletIcon} alt='Ethereum' />
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
                <InputGroup key='input-wallet'>
                  <IconInput>
                    <img src={EthereumIcon} alt='Wallet' />
                    <p>Amount</p>
                  </IconInput>
                  <LineVertical>
                    <div />
                  </LineVertical>
                  <input type='text' value={`${125.51} ${'USDT'}`} />
                </InputGroup>
              </InputBlock>
              <ButtonGroup>
                <div>
                  <button>Add Recipient</button>
                </div>
              </ButtonGroup>
            </Register>
            <Recipient>
              <h2>Recipients</h2>
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
                            <p>{user.account}</p>
                            <p>{`${user.balance} ${user.symbol}`}</p>
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
