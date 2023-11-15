import { useEffect, useState } from 'react';
import moment from 'moment';
import Select from 'react-select';

import TxPendingBlue from '../../assets/tx_pending_blue.svg';
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
  ListTransactionsComplete,
  ListTransactionsPending,
  Transaction,
} from './style';

interface TransactionType {
  id: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  fee: string;
  totalCostEth: string;
  totalCostUsd: string;
  asset: string;
  confirmations: string;
  timestamp: string;
  type: string;
  status: string;
  message: string;
}

//mock
const transactions = [
  {
    id: '0',
    hash: '0xb8ad1138a22a0dcc5eddca1db9aa0c731891fe60041ed6f4d9ceb737c9f1b06d',
    from: '0x0000000000000000000000000000000000000000',
    to: '0x1e6e8695fab3eb382534915ea8d7cc1d1994b152',
    value: '1050.50',
    fee: '0.001',
    totalCostEth: '0.001',
    totalCostUsd: '100.00',
    asset: 'USDT',
    confirmations: '0',
    timestamp: '1700001599',
    type: 'Send',
    status: 'completed',
    message: '',
  },
  {
    id: '1',
    hash: '0xb8ad1138a22a0dcc5eddca1db9aa0c731891fe60041ed6f4d9ceb737c9f1b06d',
    from: '0x0000000000000000000000000000000000000000',
    to: '0x1e6e8695fab3eb382534915ea8d7cc1d1994b152',
    value: '1.55',
    fee: '0.001',
    totalCostEth: '0.001',
    totalCostUsd: '100.00',
    asset: 'ETH',
    confirmations: '0',
    timestamp: '1700001699',
    type: 'Send',
    status: 'error',
    message: 'replacement fee too low',
  },
  {
    id: '2',
    hash: '0xb8ad1138a22a0dcc5eddca1db9aa0c731891fe60041ed6f4d9ceb737c9f1b06d',
    from: '0x0000000000000000000000000000000000000000',
    to: '0x1e6e8695fab3eb382534915ea8d7cc1d1994b152',
    value: '13.875',
    fee: '0.001',
    totalCostEth: '0.001',
    totalCostUsd: '100.00',
    asset: 'CAKE',
    confirmations: '0',
    timestamp: '1700001799',
    type: 'Send',
    status: 'completed',
    message: '',
  },
  {
    id: '3',
    hash: '0xb8ad1138a22a0dcc5eddca1db9aa0c731891fe60041ed6f4d9ceb737c9f1b06d',
    from: '0x0000000000000000000000000000000000000000',
    to: '0x1e6e8695fab3eb382534915ea8d7cc1d1994b152',
    value: '50.00',
    fee: '0.001',
    totalCostEth: '0.001',
    totalCostUsd: '100.00',
    asset: 'USDT',
    confirmations: '0',
    timestamp: '1700001899',
    type: 'Receive',
    status: 'completed',
    message: '',
  },
  {
    id: '4',
    hash: '0xb8ad1138a22a0dcc5eddca1db9aa0c731891fe60041ed6f4d9ceb737c9f1b06d',
    from: '0x0000000000000000000000000000000000000000',
    to: '0x1e6e8695fab3eb382534915ea8d7cc1d1994b152',
    value: '85.00',
    fee: '0.001',
    totalCostEth: '0.001',
    totalCostUsd: '100.00',
    asset: 'USDT',
    confirmations: '0',
    timestamp: '1700001999',
    type: 'Receive',
    status: 'completed',
    message: '',
  },
  {
    id: '5',
    hash: '0xb8ad1138a22a0dcc5eddca1db9aa0c731891fe60041ed6f4d9ceb737c9f1b06d',
    from: '0x0000000000000000000000000000000000000000',
    to: '0x1e6e8695fab3eb382534915ea8d7cc1d1994b152',
    value: '13.875',
    fee: '0.001',
    totalCostEth: '0.001',
    totalCostUsd: '100.00',
    asset: 'ETH',
    confirmations: '0',
    timestamp: '1700002000',
    type: 'Send',
    status: 'completed',
    message: '',
  },
  {
    id: '6',
    hash: '0xb8ad1138a22a0dcc5eddca1db9aa0c731891fe60041ed6f4d9ceb737c9f1b06d',
    from: '0x0000000000000000000000000000000000000000',
    to: '0x1e6e8695fab3eb382534915ea8d7cc1d1994b152',
    value: '85.00',
    fee: '0.001',
    totalCostEth: '0.001',
    totalCostUsd: '100.00',
    asset: 'USDT',
    confirmations: '0',
    timestamp: '1699902100',
    type: 'Receive',
    status: 'completed',
    message: '',
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

  const [transactionSelected, setTransactionSelected] =
    useState<TransactionType>({
      id: 'initial',
      hash: '-',
      from: '-',
      to: '-',
      value: '0.00',
      fee: '0.00',
      totalCostEth: '0.00',
      totalCostUsd: '0.00',
      asset: '-',
      confirmations: '-',
      timestamp: '-',
      type: '-',
      status: '-',
      message: '',
    });

  const sumOrSub = (transactionType: string): string => {
    switch (transactionType) {
      case 'Send':
        return '+';
      case 'Receive':
        return '-';
      default:
        return ' ';
    }
  };

  const setColorTextTransaction = (id: string, status: string): string => {
    if (status.toLowerCase() === 'error') return '#ED6860';
    if (transactionSelected.id === id) {
      return '#0177FB';
    } else {
      return '#323336';
    }
  };

  const convertTimestamp = (timestamp: string): string => {
    const date = moment.unix(parseInt(timestamp));
    const dateTransaction = date.startOf('hour').fromNow();

    if (dateTransaction === 'Invalid date') return '-';

    if (
      dateTransaction.includes('minutes') ||
      dateTransaction.includes('minute') ||
      dateTransaction.includes('hours') ||
      dateTransaction.includes('hour')
    ) {
      return dateTransaction;
    } else {
      return date.format('lll');
    }
  };

  const setIconStatusTransaction = (
    id: string,
    type: string,
    status: string
  ): string => {
    if (status.toLowerCase() === 'error') {
      switch (type) {
        case 'Receive':
          if (id === transactionSelected.id) {
            return ReceiveRed;
          } else {
            return ReceiveWhite;
          }
        case 'Send':
          if (id === transactionSelected.id) {
            return SendRed;
          } else {
            return SendWhite;
          }
        default:
          return ' ';
      }
    } else {
      switch (type) {
        case 'Send':
          if (id === transactionSelected.id) {
            return SendBlue;
          } else {
            return SendWhite;
          }
        case 'Receive':
          if (id === transactionSelected.id) {
            return ReceiveBlue;
          } else {
            return ReceiveWhite;
          }
        default:
          return ' ';
      }
    }
  };

  const setIconStatusDetails = (type: string, status: string): string => {
    if (status.toLowerCase() === 'error') {
      return TxError;
    } else {
      return TxConfirm;
    }
  };

  useEffect(() => {
    console.log(transactionSelected);
  }, [transactionSelected]);

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
                <ListTransactionsPending>
                  <li>
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
                  </li>
                </ListTransactionsPending>
              </PendingTransactions>
              <CompletedTransactions>
                <h2>Completed</h2>
                <ListTransactionsComplete>
                  {transactions.map((transaction) => (
                    <Transaction
                      selected={transactionSelected.id === transaction.id}
                      onClick={() => setTransactionSelected(transaction)}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          margin: '0px 0px 0px 20px',
                        }}
                      >
                        <img
                          width={40}
                          src={setIconStatusTransaction(
                            transaction.id,
                            transaction.type,
                            transaction.status
                          )}
                          alt='coin'
                        />
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
                              color: setColorTextTransaction(
                                transaction.id,
                                transaction.status
                              ),
                            }}
                          >
                            {`${transaction.type} ${transaction.asset}`}
                          </p>
                          <p
                            style={{
                              fontSize: '10px',
                              color: setColorTextTransaction(
                                transaction.id,
                                transaction.status
                              ),
                            }}
                          >
                            {transaction.status === 'completed'
                              ? convertTimestamp(transaction.timestamp)
                              : `Transaction error: ${transaction.message}`}
                          </p>
                        </div>
                      </div>
                      <p
                        style={{
                          fontSize: '12px',
                          fontWeight: '700',
                          color: setColorTextTransaction(
                            transaction.id,
                            transaction.status
                          ),
                          marginRight: '20px',
                        }}
                      >
                        {`${sumOrSub(transaction.type)} ${transaction.value} ${
                          transaction.asset
                        }`}
                      </p>
                    </Transaction>
                  ))}
                </ListTransactionsComplete>
              </CompletedTransactions>
            </Transactions>
            {transactionSelected.id !== 'initial' ? (
              <Details>
                <TitleDetails>
                  <h2>Details</h2>
                </TitleDetails>
                <IconDetails>
                  <Icon>
                    <img
                      src={setIconStatusDetails(
                        transactionSelected.type,
                        transactionSelected.status
                      )}
                      width={40}
                      alt='icon'
                    />
                  </Icon>
                  <p>{`${
                    transactionSelected.status === 'error'
                      ? 'Transaction with error'
                      : 'Transaction completed'
                  }`}</p>
                </IconDetails>
                <TransactionInfo>
                  <TopicInfo>
                    <b>TxHash</b>
                    <br />
                    <a
                      href={`https://etherscan.io/tx/${transactionSelected.hash}`}
                      target='_blank'
                    >
                      {transactionSelected.hash}
                    </a>
                  </TopicInfo>
                  <TopicInfo>
                    <b>Date</b>
                    <p>{convertTimestamp(transactionSelected.timestamp)}</p>
                  </TopicInfo>
                  <TopicInfo>
                    <b>From</b>
                    <p>{transactionSelected.from}</p>
                  </TopicInfo>
                  <TopicInfo>
                    <b>To</b>
                    <p>{transactionSelected.to}</p>
                  </TopicInfo>
                  <TopicInfo>
                    <b>Confirmations</b>
                    <p>{transactionSelected.confirmations}</p>
                  </TopicInfo>
                  <TopicInfo>
                    <b>Value</b>
                    <p>{`${
                      transactionSelected.value
                    } ${transactionSelected.asset.toUpperCase()}`}</p>
                  </TopicInfo>
                  <TopicInfo>
                    <b>Fee</b>
                    <p>{`${transactionSelected.fee} ETH`}</p>
                  </TopicInfo>
                  <TopicInfo>
                    <b>Total Cost in Ether</b>
                    <p>{`${transactionSelected.totalCostEth} ETH`}</p>
                  </TopicInfo>
                  <TopicInfo>
                    <b>Total Cost in Dollar</b>
                    <p>{`$ ${transactionSelected.totalCostUsd}`}</p>
                  </TopicInfo>
                </TransactionInfo>
              </Details>
            ) : (
              ''
            )}
          </Body>
        </Section>
      </Container>
    </>
  );
}
