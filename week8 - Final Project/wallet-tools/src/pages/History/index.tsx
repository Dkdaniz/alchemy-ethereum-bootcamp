import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { ethers } from 'ethers';
import Select from 'react-select';
import { AlchemySubscription } from 'alchemy-sdk';

import {
  alchemy,
  getTransactions,
  getInfoTransactions,
  getBlockActual,
} from '../../tools/alchemy';

import { getPriceCoins } from '../../tools/coingecko';

import { useMetamaskStore } from '../../store/metamask';

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

import useLocalStorage from '../../hooks/useLocalStorage';

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
  totalCostUsd: string;
  asset: string;
  confirmations: string;
  timestamp: number;
  type: string;
  status: string;
  message: string;
}

interface TransactionEventPending {
  accessList: [];
  blockHash: string | null;
  blockNumber: string | null;
  chainId: string;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  nonce: string;
  r: string;
  s: string;
  to: string;
  transactionIndex: string | null;
  type: string;
  v: string;
  value: string;
  yParity: string;
}

interface TransactionEventMinted {
  removed: boolean;
  transaction: TransactionEventPending;
}

interface TransactionsByFilterProps {
  transactionInfo: TransactionType;
}

interface Option {
  value: string;
  label: string;
}

const options = [
  { value: 'all', label: 'All Transactions' },
  { value: 'receive', label: 'Receive' },
  { value: 'send', label: 'Send' },
  { value: 'error', label: 'Error' },
];

export default function History() {
  const [pending, setPending] = useLocalStorage(
    '@WalletTools:transaction:pending',
    []
  );

  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [transactionFilter, setTransactionFilter] = useState<TransactionType[]>(
    []
  );

  const navigate = useNavigate();
  const { account, requestAccounts } = useMetamaskStore();

  const [selectedOption, setSelectedOption] = useState<Option>({
    value: 'all',
    label: 'All Transactions',
  });

  const [transactionSelected, setTransactionSelected] =
    useState<TransactionType>({
      id: 'initial',
      hash: '-',
      from: '-',
      to: '-',
      value: '0.0',
      fee: '0.00',
      totalCostUsd: '0.00',
      asset: '-',
      confirmations: '-',
      timestamp: 0,
      type: '-',
      status: '-',
      message: '',
    });

  const handleOnchangeSelectedOption = (option: Option | null) => {
    setSelectedOption(
      option !== null
        ? option
        : {
            value: 'all',
            label: 'All Transactions',
          }
    );
  };

  const wsTransactionsEvent = () => {
    alchemy.ws.on(
      {
        method: AlchemySubscription.PENDING_TRANSACTIONS,
        fromAddress: account,
      },
      (tx: TransactionEventPending) => {
        const txData = {
          id: tx.hash,
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: ethers.formatEther(BigInt(tx.value).toString()),
          fee: calcFee(tx?.gasPrice, tx?.gas),
          totalCostUsd: '0.00',
          asset: tx.input !== '0x' ? 'Token' : 'ETH',
          confirmations: 'Pending',
          timestamp: Date.now(),
          type: tx.from === account ? 'Send' : 'Receive',
          status: 'Pending',
          message: ' ',
        };

        setPending([...pending, txData]);
      }
    );

    alchemy.ws.on(
      {
        method: AlchemySubscription.MINED_TRANSACTIONS,
        addresses: [
          {
            from: account,
          },
        ],
        includeRemoved: true,
        hashesOnly: false,
      },
      (tx: TransactionEventMinted) => {
        const removeMinedTransaction = pending.filter(
          (transaction: TransactionType) =>
            transaction.hash !== tx.transaction.hash
        );

        setPending([...removeMinedTransaction]);
        updateHistoryTransactions();
      }
    );
  };

  const sumOrSub = (transactionType: string): string => {
    switch (transactionType) {
      case 'Send':
        return '-';
      case 'Receive':
        return '+';
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

  const convertTimestamp = (timestamp: number): string => {
    const date = moment.unix(timestamp);
    const dateTransaction = date.startOf('seconds').fromNow();

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

  const setIconStatusDetails = (status: string): string => {
    if (status.toLowerCase() === 'error') {
      return TxError;
    } else {
      return TxConfirm;
    }
  };

  const calcFee = (
    gasPriceHex: string | null,
    gasUsedHex: string | null
  ): string => {
    if (gasPriceHex === null || gasUsedHex === null) return '0';

    const gasPrice = ethers.parseUnits(BigInt(gasPriceHex).toString(), 'wei');
    const gasUsed = ethers.parseUnits(BigInt(gasUsedHex).toString(), 'wei');

    const total = parseFloat(ethers.formatEther(gasPrice * gasUsed)).toFixed(8);

    return total.toString();
  };

  const totalCostTx = (
    qty: number,
    fee: number,
    etherPrice: number,
    tokenPrice: number
  ): string => {
    const feeUsd = fee * etherPrice;
    const qtyUsd = tokenPrice > 0 ? qty * tokenPrice : qty * etherPrice;

    const totalUsd = (feeUsd + qtyUsd).toFixed(2);

    return totalUsd.toString();
  };

  const updateHistoryTransactions = async () => {
    Promise.all([
      getTransactions(account, 'Send'),
      getTransactions(account, 'Receive'),
    ]).then((txs: any) => {
      const sendTransactions = txs[0];
      const receiveTransactions = txs[1];

      const allTransactions: TransactionType[] = [
        ...sendTransactions,
        ...receiveTransactions,
      ];

      for (let i = 0; i < pending.length; i++) {
        const transaction: TransactionType = pending[i];

        const txIsPending = allTransactions.filter(
          (tx: TransactionType) => transaction.hash === tx.hash
        );

        if (txIsPending.length > 0) {
          const removeMinedTransaction = pending.filter(
            (transaction: TransactionType) =>
              transaction.hash !== txIsPending[0].hash
          );

          setPending([...removeMinedTransaction]);
        }
      }

      const transactionsHistory = allTransactions.sort(function (a, b) {
        if (a.timestamp < b.timestamp) {
          return 1;
        }
        if (a.timestamp > b.timestamp) {
          return -1;
        }

        return 0;
      });

      const assets = [
        ...new Set(transactionsHistory.map((tx: TransactionType) => tx.asset)),
      ];

      Promise.all([
        getInfoTransactions(transactionsHistory),
        getPriceCoins(assets),
        getBlockActual(),
      ]).then((info) => {
        const informationTxs = info[0];
        const prices = info[1];
        const actualBlock = info[2];

        const fullInfoTxs: TransactionType[] = [];

        for (let i = 0; i < transactionsHistory.length; i++) {
          const tx = transactionsHistory[i];

          const indexTxInfo = informationTxs.findIndex(
            (txInfo: any) => txInfo?.transactionHash === tx.hash
          );

          if (indexTxInfo >= 0) {
            const txInfo = informationTxs[indexTxInfo];
            tx.status = txInfo?.status === 0 ? 'error' : 'completed';
            if (tx.status === 'error') {
              tx.message = 'Check the block explorer for more details.';
            }

            tx.fee = calcFee(
              txInfo?.effectiveGasPrice
                ? txInfo?.effectiveGasPrice.toString()
                : '0x0',
              txInfo?.gasUsed ? txInfo?.gasUsed.toString() : '0x0'
            );

            const indexPriceEther = prices.findIndex(
              (price) => price.coin === 'ETH'
            );

            let tokenPrice = 0;

            if (tx.asset !== 'ETH') {
              const indexPriceToken = prices.findIndex(
                (price) => price.coin === tx.asset
              );

              indexPriceToken >= 0
                ? (tokenPrice = prices[indexPriceToken].price)
                : 0.0;
            }

            const priceEther = prices[indexPriceEther].price;

            tx.totalCostUsd = totalCostTx(
              parseFloat(tx.value),
              parseFloat(tx.fee),
              priceEther,
              tokenPrice
            );

            const blockNumberTransaction: number = parseInt(
              txInfo?.blockNumber ? txInfo?.blockNumber.toString() : '0',
              10
            );
            const confirmations = actualBlock - blockNumberTransaction;

            tx.confirmations = confirmations.toString();

            fullInfoTxs.push(tx);
          }
        }

        setTransactions(fullInfoTxs);
        wsTransactionsEvent();
      });
    });
  };

  useEffect(() => {
    switch (selectedOption.value) {
      case 'receive':
        setTransactionFilter([
          ...transactions.filter(
            (tx) => tx.type === 'Receive' && tx.status !== 'error'
          ),
        ]);
        break;
      case 'send':
        setTransactionFilter([
          ...transactions.filter(
            (tx) => tx.type === 'Send' && tx.status !== 'error'
          ),
        ]);
        break;
      case 'error':
        setTransactionFilter([
          ...transactions.filter((tx) => tx.status === 'error'),
        ]);
        break;
      default:
        setTransactionFilter([]);
        break;
    }
  }, [selectedOption]);

  useEffect(() => {
    if (account === '') {
      navigate('/');
    } else {
      updateHistoryTransactions();
    }
  }, [account]);

  useEffect(() => {
    if (account === '') {
      requestAccounts();
    }
  }, []);

  const TransactionsByFilter = (props: TransactionsByFilterProps) => {
    return (
      <Transaction
        key={props.transactionInfo.id}
        selected={transactionSelected.id === props.transactionInfo.id}
        onClick={() => setTransactionSelected(props.transactionInfo)}
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
              props.transactionInfo.id,
              props.transactionInfo.type,
              props.transactionInfo.status
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
                  props.transactionInfo.id,
                  props.transactionInfo.status
                ),
              }}
            >
              {`${props.transactionInfo.type} ${props.transactionInfo.asset}`}
            </p>
            <p
              style={{
                fontSize: '10px',
                color: setColorTextTransaction(
                  props.transactionInfo.id,
                  props.transactionInfo.status
                ),
              }}
            >
              {props.transactionInfo.status === 'completed'
                ? convertTimestamp(props.transactionInfo.timestamp)
                : `Transaction error: ${props.transactionInfo.message}`}
            </p>
          </div>
        </div>
        <p
          style={{
            fontSize: '12px',
            fontWeight: '700',
            color: setColorTextTransaction(
              props.transactionInfo.id,
              props.transactionInfo.status
            ),
            marginRight: '20px',
          }}
        >
          {`${sumOrSub(props.transactionInfo.type)} 
            ${props.transactionInfo.value} 
            ${props.transactionInfo.asset}`}
        </p>
      </Transaction>
    );
  };

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
                    onChange={handleOnchangeSelectedOption}
                    styles={{
                      control: (baseStyles) => ({
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
                  {pending.map((transaction: TransactionType) => (
                    <li key={transaction.id}>
                      <Transaction
                        key={transaction.id}
                        selected={transaction.id === transactionSelected.id}
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
                            {transaction.value}
                          </p>
                        </div>
                      </Transaction>
                    </li>
                  ))}
                </ListTransactionsPending>
              </PendingTransactions>
              <CompletedTransactions>
                <h2>Completed</h2>
                <ListTransactionsComplete>
                  {selectedOption.value !== 'all'
                    ? transactionFilter.map((transaction: TransactionType) => (
                        <TransactionsByFilter
                          key={transaction.id}
                          transactionInfo={transaction}
                        />
                      ))
                    : transactions.map((transaction: TransactionType) => (
                        <TransactionsByFilter
                          key={transaction.id}
                          transactionInfo={transaction}
                        />
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
                      src={setIconStatusDetails(transactionSelected.status)}
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
                      href={`https://sepolia.etherscan.io/tx/${transactionSelected.hash}`}
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
                    <b>Total Cost in Dollar (fee + value)</b>
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
