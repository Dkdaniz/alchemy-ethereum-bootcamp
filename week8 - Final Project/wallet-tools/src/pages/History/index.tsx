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
  Transactions,
  InputBlock,
  TransactionInfo,
  Icon,
  TitleDetails,
  IconDetails,
  Details,
  TopicInfo,
  PendingTransactions,
  CompletedTransactions,
  ListTransactions,
  Transaction,
} from './style';

interface TransactionType {
  blockNum: string;
  uniqueId: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  erc721TokenId: string;
  erc1155Metadata: object;
  tokenId: string;
  asset: string;
  category: string;
  rawContract: {
    value: string;
    address: string;
    decimal: string;
  };
}

//mock
const transactions = [
  {
    blockNum: '0xd2113f',
    uniqueId:
      '0xb8ad1138a22a0dcc5eddca1db9aa0c731891fe60041ed6f4d9ceb737c9f1b06d:log:165',
    hash: '0xb8ad1138a22a0dcc5eddca1db9aa0c731891fe60041ed6f4d9ceb737c9f1b06d',
    from: '0x0000000000000000000000000000000000000000',
    to: '0x1e6e8695fab3eb382534915ea8d7cc1d1994b152',
    value: null,
    erc721TokenId:
      '0x0000000000000000000000000000000000000000000000000000000000001acb',
    erc1155Metadata: null,
    tokenId:
      '0x0000000000000000000000000000000000000000000000000000000000001acb',
    asset: 'DUSK',
    category: 'erc721',
    rawContract: {
      value: null,
      address: '0x0beed7099af7514ccedf642cfea435731176fb02',
      decimal: null,
    },
  },
  {
    blockNum: '0xd2113f',
    uniqueId:
      '0xb8ad1138a22a0dcc5eddca1db9aa0c731891fe60041ed6f4d9ceb737c9f1b06d:log:166',
    hash: '0xb8ad1138a22a0dcc5eddca1db9aa0c731891fe60041ed6f4d9ceb737c9f1b06d',
    from: '0x0000000000000000000000000000000000000000',
    to: '0x1e6e8695fab3eb382534915ea8d7cc1d1994b152',
    value: null,
    erc721TokenId:
      '0x0000000000000000000000000000000000000000000000000000000000001acc',
    erc1155Metadata: null,
    tokenId:
      '0x0000000000000000000000000000000000000000000000000000000000001acc',
    asset: 'DUSK',
    category: 'erc721',
    rawContract: {
      value: null,
      address: '0x0beed7099af7514ccedf642cfea435731176fb02',
      decimal: null,
    },
  },
  {
    blockNum: '0xe4284a',
    uniqueId:
      '0x04573492a1ecb47102a2a70af190fa47f605a71f54ea62d94a1da1e225b7e157:log:345',
    hash: '0x04573492a1ecb47102a2a70af190fa47f605a71f54ea62d94a1da1e225b7e157',
    from: '0x0000000000000000000000000000000000000000',
    to: '0x1e6e8695fab3eb382534915ea8d7cc1d1994b152',
    value: null,
    erc721TokenId:
      '0x0000000000000000000000000000000000000000000000000000000000000bc0',
    erc1155Metadata: null,
    tokenId:
      '0x0000000000000000000000000000000000000000000000000000000000000bc0',
    asset: 'NC',
    category: 'erc721',
    rawContract: {
      value: null,
      address: '0xe9fca552b9eb110c2d170962af740725f71f5644',
      decimal: null,
    },
  },
  {
    blockNum: '0xe4284a',
    uniqueId:
      '0x04573492a1ecb47102a2a70af190fa47f605a71f54ea62d94a1da1e225b7e157:log:346',
    hash: '0x04573492a1ecb47102a2a70af190fa47f605a71f54ea62d94a1da1e225b7e157',
    from: '0x0000000000000000000000000000000000000000',
    to: '0x1e6e8695fab3eb382534915ea8d7cc1d1994b152',
    value: null,
    erc721TokenId:
      '0x0000000000000000000000000000000000000000000000000000000000000bc1',
    erc1155Metadata: null,
    tokenId:
      '0x0000000000000000000000000000000000000000000000000000000000000bc1',
    asset: 'NC',
    category: 'erc721',
    rawContract: {
      value: null,
      address: '0xe9fca552b9eb110c2d170962af740725f71f5644',
      decimal: null,
    },
  },
];

const options = [
  { value: 'all', label: 'All Transactions' },
  { value: 'pending', label: 'Pending' },
  { value: 'receive', label: 'Receive' },
  { value: 'send', label: 'Send' },
  { value: 'error', label: 'Error' },
];

export default function History() {
  const [selectedOption, setSelectedOption] = useState({
    value: 'all',
    label: 'All Transactions',
  });

  const [transactionSelected, setTransactionSelected] = useState<>({});

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
            <Transactions>
              <PendingTransactions>
                <h2>Pending Execution</h2>
                <ListTransactions>
                  <Transaction selected={false}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        margin: '0px 0px 0px 20px',
                      }}
                    >
                      <img width={40} src={TxPendingBlue} alt='' />
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          margin: '0px 0px 0px 20px',
                        }}
                      >
                        <p
                          style={{
                            fontSize: '14px',
                            color: '#0177FB',
                          }}
                        >
                          Receive Ether
                        </p>
                        <p
                          style={{
                            fontSize: '10px',
                            color: '#0177FB',
                          }}
                        >
                          In Progress
                        </p>
                      </div>
                    </div>
                    <div
                      style={{
                        marginRight: '20px',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '12px',
                          fontWeight: '700',
                          color: '#0177FB',
                        }}
                      >
                        + 0.005 ETH
                      </p>
                    </div>
                  </Transaction>
                </ListTransactions>
              </PendingTransactions>
              <CompletedTransactions>
                <h2>Completed</h2>
                <ListTransactions>
                  {transactions.map((transaction) => (
                    <Transaction
                      selected={
                        transactionSelected.uniqueId === transaction.uniqueId
                      }
                      onClick={() => setTransactionSelected(transaction)}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          margin: '0px 0px 0px 20px',
                        }}
                      >
                        <img width={40} src={TxPendingBlue} alt='' />
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            margin: '0px 0px 0px 20px',
                          }}
                        >
                          <p
                            style={{
                              fontSize: '14px',
                              color: '#0177FB',
                            }}
                          >
                            Receive Ether
                          </p>
                          <p
                            style={{
                              fontSize: '10px',
                              color: '#0177FB',
                            }}
                          >
                            In Progress
                          </p>
                        </div>
                      </div>
                      <p
                        style={{
                          fontSize: '12px',
                          fontWeight: '700',
                          color: '#0177FB',
                          marginRight: '20px',
                        }}
                      >
                        + 0.005 ETH
                      </p>
                    </Transaction>
                  ))}
                </ListTransactions>
              </CompletedTransactions>
            </Transactions>
            <Details>
              <TitleDetails>
                <h2>Details</h2>
              </TitleDetails>
              <IconDetails>
                <Icon>
                  <img src={TxPendingBlue} width={40} alt='icon' />
                </Icon>
                <p>Pending Transaction</p>
              </IconDetails>
              <TransactionInfo>
                <TopicInfo>
                  <b>TxHash</b>
                  <br />
                  <a href='https://www.w3schools.com' target='_blank'>
                    0xf2df62205e75e1cca907187bea4a230533c56b0bbcca1f357ba5ffc0447b680a
                  </a>
                </TopicInfo>
                <TopicInfo>
                  <b>Date</b>
                  <p>26 Apr 2023</p>
                </TopicInfo>
                <TopicInfo>
                  <b>From</b>
                  <p>0x8462829701ddd06392a516d1841c42297d567915</p>
                </TopicInfo>
                <TopicInfo>
                  <b>To</b>
                  <p>0xd6f157d03525598aeb0ecca25f2e54fa97c83741</p>
                </TopicInfo>
                <TopicInfo>
                  <b>Confirmations</b>
                  <p>0</p>
                </TopicInfo>
                <TopicInfo>
                  <b>Value</b>
                  <p>0.005 ETH</p>
                </TopicInfo>
                <TopicInfo>
                  <b>Fee</b>
                  <p>0.001 ETH</p>
                </TopicInfo>
                <TopicInfo>
                  <b>Total Cost</b>
                  <p>0.006 ETH</p>
                </TopicInfo>
              </TransactionInfo>
            </Details>
          </Body>
        </Section>
      </Container>
    </>
  );
}
