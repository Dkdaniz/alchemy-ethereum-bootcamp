import { useState } from 'react';
import Select from 'react-select';

import TxPendingBlue from '../../assets/tx_pending_blue.svg';
import TxPendingWhite from '../../assets/tx_pending_white.svg';
import TxError from '../../assets/tx_error.svg';
import TxConfirm from '../../assets/tx_confirm.svg';
import ReceiveBlue from '../../assets/receive_blue.svg';
import ReceiveWhite from '../../assets/receive_white.svg';
import ReceiveRed from '../../assets/receive_red.svg';
import SendBlue from '../../assets/send_blue.svg';
import SendWhite from '../../assets/send_white.svg';
import SendRed from '../../assets/send_red.svg';

import Sidebar from '../../components/Sidebar';

import {
  Container,
  Section,
  Title,
  LineHorizontal,
  Header,
  Body,
  Transaction,
  InputBlock,
} from './style';

const options = [
  { value: 'all', label: 'All Transactions' },
  { value: 'pending', label: 'Pending' },
  { value: 'receive', label: 'Receive' },
  { value: 'send', label: 'Send' },
  { value: 'error', label: 'Error' },
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

export default function History() {
  const [selectedOption, setSelectedOption] = useState({
    value: 'all',
    label: 'All Transactions',
  });

  return (
    <>
      <Container>
        <Sidebar />
        <Section>
          <Header>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Title>
                <h1>History</h1>
              </Title>
              <InputBlock>
                <div>
                  <Select
                    options={options}
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,

                        height: '50px',
                        border: '2px solid #eae9ea',
                        borderRadius: '12px',
                        paddingLeft: '20px',
                        margin: '10px 30px 0px 0px',
                      }),
                    }}
                  />
                </div>
              </InputBlock>
            </div>
            <LineHorizontal>
              <div />
            </LineHorizontal>
          </Header>
          <Body>
            <Transaction></Transaction>
            <div>
              <div key={'Title'}>
                <p>Details</p>
              </div>
              <div key={'Icon'}>
                <div
                  style={{
                    display: 'absolute',
                    background: '#DDE1EB',
                    borderRadius: '40px',
                    width: '76px',
                    height: '74px',
                  }}
                >
                  <img src={TxPendingBlue} alt='icon' width={52}></img>
                </div>
                <p>Pending Transaction</p>
              </div>
              <div key={'TransactionInfo'}>
                <div>
                  <p>TxHash</p>
                  <p>
                    0xf2df62205e75e1cca907187bea4a230533c56b0bbcca1f357ba5ffc0447b680a
                  </p>
                </div>
                <div>
                  <p>Date</p>
                  <p>26 Apr 2023</p>
                </div>
                <div>
                  <p>From</p>
                  <p>0x8462829701ddd06392a516d1841c42297d567915</p>
                </div>
                <div>
                  <p>To</p>
                  <p>0xd6f157d03525598aeb0ecca25f2e54fa97c83741</p>
                </div>
                <div>
                  <p>Confirmations</p>
                  <p>0</p>
                </div>
                <div>
                  <p>Value</p>
                  <p>0.005 ETH</p>
                </div>
                <div>
                  <p>Fee</p>
                  <p>0.001 ETH</p>
                </div>
                <div>
                  <p>Total Cost</p>
                  <p>0.006 ETH</p>
                </div>
              </div>
            </div>
          </Body>
        </Section>
      </Container>
    </>
  );
}
