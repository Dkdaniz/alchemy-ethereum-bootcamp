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
  TransactionInfo,
  Icon,
  TitleDetails,
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
              <TitleDetails>
                <h2>Details</h2>
              </TitleDetails>
              <div
                style={{
                  display: 'display',
                  flexDirection: 'row',
                }}
              >
                <Icon>
                  <img src={TxPendingBlue} width={40} alt='icon' />
                </Icon>
                <p>Pending Transaction</p>
              </div>
              <TransactionInfo>
                <div>
                  <b>TxHash</b>
                  <p>
                    0xf2df62205e75e1cca907187bea4a230533c56b0bbcca1f357ba5ffc0447b680a
                  </p>
                </div>
                <div>
                  <b>Date</b>
                  <p>26 Apr 2023</p>
                </div>
                <div>
                  <b>From</b>
                  <p>0x8462829701ddd06392a516d1841c42297d567915</p>
                </div>
                <div>
                  <b>To</b>
                  <p>0xd6f157d03525598aeb0ecca25f2e54fa97c83741</p>
                </div>
                <div>
                  <b>Confirmations</b>
                  <p>0</p>
                </div>
                <div>
                  <b>Value</b>
                  <p>0.005 ETH</p>
                </div>
                <div>
                  <b>Fee</b>
                  <p>0.001 ETH</p>
                </div>
                <div>
                  <b>Total Cost</b>
                  <p>0.006 ETH</p>
                </div>
              </TransactionInfo>
            </div>
          </Body>
        </Section>
      </Container>
    </>
  );
}
