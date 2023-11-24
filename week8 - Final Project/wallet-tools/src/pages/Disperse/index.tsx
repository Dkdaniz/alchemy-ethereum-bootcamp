import { useState, useEffect, ChangeEvent } from 'react';
import moment from 'moment';
import Select from 'react-select';
import { ethers, isAddress } from 'ethers';
import { toast } from 'react-toastify';
import { AlchemySubscription } from 'alchemy-sdk';

import useLocalStorage from '../../hooks/useLocalStorage';
import { useMetamaskStore } from '../../store/metamask';
import { alchemy } from '../../tools/alchemy';

import Sidebar from '../../components/Sidebar';

import EthereumIcon from '../../assets/ethereum.svg';
import WalletIcon from '../../assets/wallet.svg';
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
  Line,
  Input,
} from './style';

const options = [
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'custom', label: 'Custom Token' },
];

interface transactionType {
  recipient: string;
  amount: number;
  asset: string;
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

interface TransactionType {
  id: string;
  hash: string;
  from: string;
  to: string;
  value: number;
  tokenValue: number;
  fee: string;
  totalCostUsd: string;
  asset: string;
  confirmations: string;
  timestamp: number;
  type: string;
  status: string;
  message: string;
}

interface TransactionEventMinted {
  removed: boolean;
  transaction: TransactionEventPending;
}

const DISPERSE_CONTRACT = '0xD152f549545093347A162Dce210e7293f1452150';

export default function Disperse() {
  const [pending, setPending] = useLocalStorage(
    '@WalletTools:transaction:pending',
    []
  );

  const [transactions, setTransactions] = useState<transactionType[]>([]);

  const [gasPrice, setGasPrice] = useState<string>('');
  const [asset, setAsset] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [contractAddress, setContractAddress] = useState<string>('');

  const { account, requestAccounts, callTokenSymbol } = useMetamaskStore();

  const [selectedAssetOption, setSelectedAssetOption] = useState({
    value: 'ethereum',
    label: 'Ethereum',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'recipient':
        setRecipient(e.target.value);
        break;
      case 'amount':
        setAmount(e.target.value);
        break;
      case 'contractAddress':
        setContractAddress(e.target.value);
        break;
      case 'gasPrice':
        setGasPrice(e.target.value);
        break;
      default:
        break;
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

  const totalCost = (amount: string, fee: string): number => {
    if (contractAddress !== '') {
      return parseFloat(amount) + parseFloat(fee);
    } else {
      return parseFloat(fee);
    }
  };

  const send = async () => {
    if (parseFloat(amount) === 0) return toast.error('Amount is invalid');
    if (parseFloat(gasPrice) === 0) return toast.error('Amount is invalid');
  };

  const wsTransactionsEvent = () => {
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
            transaction.hash !== tx.transaction.blockHash
        );

        setPending([...removeMinedTransaction]);
      }
    );
  };

  const getSymbolToken = async () => {
    setAsset('loading...');

    const symbol = await callTokenSymbol(contractAddress);

    if (symbol === 'Token') {
      setContractAddress('');
      return toast.error('Contract is not ERC20 standard');
    } else {
      setAsset(symbol.toUpperCase());
    }
  };

  const addRecipients = () => {
    if (isAddress(recipient) === false)
      return toast.error('This wallet is invalid');

    if (parseFloat(amount) > 0) return toast.error('this amount is invalid');

    setTransactions([
      ...transactions,
      {
        recipient: '',
        amount: parseFloat(amount),
        asset: '',
      },
    ]);
  };

  const deleteRecipients = () => {};

  const updateRecipients = () => {};

  useEffect(() => {
    if (selectedAssetOption.value === 'ethereum') {
      setContractAddress('');
      setAsset('ETH');
    }
  }, [selectedAssetOption]);

  useEffect(() => {
    if (contractAddress !== '' && isAddress(account) === true) {
      getSymbolToken();
    }
  }, [contractAddress]);

  useEffect(() => {
    if (!account) {
      requestAccounts();
    } else {
      wsTransactionsEvent();
    }
  }, []);

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
                    defaultValue={selectedAssetOption}
                    onChange={setSelectedAssetOption}
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

                {selectedAssetOption.value === 'custom' ? (
                  <InputGroup key='input-wallet'>
                    <IconInput>
                      <img src={WalletIcon} alt='Wallet' />
                      <p>Contract Address</p>
                    </IconInput>
                    <LineVertical>
                      <div />
                    </LineVertical>
                    <input
                      name='contractAddress'
                      type='text'
                      onChange={handleChange}
                      value={contractAddress}
                    />
                  </InputGroup>
                ) : (
                  ''
                )}
              </InputBlock>
              <Line>
                <div />
                <p>Insert address and amount</p>
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
                    name='recipients'
                    type='text'
                    onChange={handleChange}
                    value={recipient}
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
                  <Input>
                    <input
                      name='amount'
                      type='number'
                      onChange={handleChange}
                      value={amount}
                    />
                    <input readOnly={true} type='text' value={asset} />
                  </Input>
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
                {transactions.map((transaction: transactionType) => (
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
                            <p>{transaction.recipient}</p>
                            <p>{`${transaction.amount} ${transaction.asset}`}</p>
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
