import Chart from 'react-apexcharts';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import moment from 'moment';
import Select from 'react-select';

import { AlchemySubscription } from 'alchemy-sdk';

import {
  alchemy,
  getTransactions,
  getInfoTransactions,
  getBlockActual,
} from '../../tools/alchemy';

import useLocalStorage from '../../hooks/useLocalStorage';
import { useMetamaskStore } from '../../store/metamask';
import { getPriceCoins, getPriceChart } from '../../tools/coingecko';

import Sidebar from '../../components/Sidebar';

import { Container, Section, Transaction, InputBlock } from './style';

import ReceiveBlue from '../../assets/receive_blue.svg';
import ReceiveWhite from '../../assets/receive_white.svg';
import ReceiveRed from '../../assets/receive_red.svg';
import SendBlue from '../../assets/send_blue.svg';
import SendWhite from '../../assets/send_white.svg';
import SendRed from '../../assets/send_red.svg';

interface Series {
  name: string;
  data: number[];
}

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

const options = [
  { value: 'all', label: 'All Transactions' },
  { value: 'receive', label: 'Receive' },
  { value: 'send', label: 'Send' },
  { value: 'error', label: 'Error' },
];

function Home() {
  const [pending, setPending] = useLocalStorage(
    '@WalletTools:transaction:pending',
    []
  );

  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [transactionFilter, setTransactionFilter] = useState<TransactionType[]>(
    []
  );

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

  const { account, requestAccounts } = useMetamaskStore();

  const [selectedOption, setSelectedOption] = useState({
    value: 'all',
    label: 'All Transactions',
  });

  const [seriesChart, setSeriesChart] = useState<Series[]>([
    {
      name: 'ethereum',
      data: [0],
    },
  ]);

  const [optionsChart, setOptionsChart] = useState<any>({
    chart: {
      height: 350,
      type: 'area',
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
      categories: ['2018-09-19T00:00:00.000Z'],
    },
    yaxis: {
      show: false,
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  });

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

  const setColorTextTransaction = (id: string, status: string): string => {
    if (status.toLowerCase() === 'error') return '#ED6860';
    if (transactionSelected.id === id) {
      return '#0177FB';
    } else {
      return '#323336';
    }
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

            tx.fee = calcFee(txInfo?.effectiveGasPrice, txInfo?.gasUsed);

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
              txInfo?.blockNumber,
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

  useEffect(() => {
    getPriceChart('ethereum').then((prices) => {
      const dates = prices.map((price: any) => {
        return price[0];
      });

      const priceUsd = prices.map((price: any) => {
        return price[1];
      });

      setSeriesChart([{ name: 'ethereum', data: priceUsd }]);
      setOptionsChart({
        chart: {
          height: 350,
          type: 'area',
          toolbar: {
            show: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'datetime',
          categories: dates,
        },
        yaxis: {
          show: false,
        },
        tooltip: {
          x: {
            show: true,
            format: 'MM/yy HH:mm',
          },
        },
      });
    });
  }, []);

  useEffect(() => {
    if (account === '') {
      requestAccounts();
    } else {
      updateHistoryTransactions();
    }
  }, [account]);

  return (
    <>
      <Container>
        <Sidebar />
        <Section>
          <div
            style={{
              height: 450,
              marginTop: 30,
              background: '#fff',
              borderRadius: '12px',
            }}
          >
            <div
              style={{
                marginTop: 30,
                background: '#fff',
                borderRadius: '12px',
              }}
            >
              <Chart
                options={optionsChart}
                series={seriesChart}
                type='area'
                height={450}
                width={'100%'}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: 'calc(100% - 450px)',
              marginTop: 60,
              background: '#fff',
              borderRadius: '12px',
            }}
          >
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
            <div>
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
            </div>
          </div>
        </Section>
      </Container>
    </>
  );
}

export default Home;
