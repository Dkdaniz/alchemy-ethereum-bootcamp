import { useState, useEffect, ChangeEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import Select from 'react-select';
import { ethers, isAddress } from 'ethers';
import { toast } from 'react-toastify';
import { AlchemySubscription } from 'alchemy-sdk';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';

import useLocalStorage from '../../hooks/useLocalStorage';
import { useMetamaskStore } from '../../store/metamask';
import { alchemy } from '../../tools/alchemy';

import Sidebar from '../../components/Sidebar';

import EthereumIcon from '../../assets/ethereum.svg';
import WalletIcon from '../../assets/wallet.svg';
import UserIcon from '../../assets/user.svg';
import DeleteIcon from '../../assets/delete.svg';
import SearchIcon from '../../assets/search.svg';
import EditIcon from '../../assets/edit.svg';
import BillingIcon from '../../assets/billing.svg';
import PendingIcon from '../../assets/tx_pending_white.svg';

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
  TopicInfo,
  Icon,
  IconDetails,
  ButtonModal,
  ButtonSendGroup,
} from './style';
import { Button } from 'antd';

const options = [
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'custom', label: 'Custom Token' },
];

interface Option {
  value: string;
  label: string;
}

interface Wallet {
  name: string;
  address: string;
}

interface TransactionDisperseType {
  recipient: string;
  amount: string;
  asset: string;
}

interface ListTransactionsDisperseTypes {
  transaction: TransactionDisperseType;
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
  value: string;
  tokenValue: string;
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

export default function Disperse() {
  const [wallets] = useLocalStorage('@WalletTools:wallets', []);
  const [pending, setPending] = useLocalStorage(
    '@WalletTools:transaction:pending',
    []
  );

  const [pendingTransaction, setPendingTransaction] = useState<TransactionType>(
    {
      id: '',
      hash: '',
      from: '',
      to: '',
      value: '0.0',
      tokenValue: '0.0',
      fee: '',
      totalCostUsd: '',
      asset: '',
      confirmations: '',
      timestamp: 0.0,
      type: '',
      status: '',
      message: '',
    }
  );

  const [transactionsDisperse, setTransactionsDisperse] = useState<
    TransactionDisperseType[]
  >([]);

  const [searchTransactionsFilter, setSearchTransactionsFilter] = useState<
    TransactionDisperseType[]
  >([]);

  const [typeNotification, setTypeNotification] = useState<string>('');

  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [gasPrice, setGasPrice] = useState<string>('');
  const [asset, setAsset] = useState<string>('');
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [contractAddress, setContractAddress] = useState<string>('');

  const cancelRef = useRef(null);

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    account,
    requestAccounts,
    callTokenSymbol,
    disperseSendEther,
    disperseSendToken,
  } = useMetamaskStore();

  const [savedWallets, setSavedWallets] = useState([
    { value: 'custom', label: 'Custom Wallet' },
  ]);

  const [selectedAssetOption, setSelectedAssetOption] = useState<Option>({
    value: 'ethereum',
    label: 'Ethereum',
  });

  const [selectedWalletOption, setSelectedWalletOption] = useState<Option>({
    value: 'custom',
    label: 'Custom Wallet',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'search':
        setSearch(e.target.value);
        break;
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

  const handleShowWallet = (transaction: TransactionDisperseType) => {
    const { recipient, amount, asset } = transaction;

    setRecipient(recipient);
    setAmount(amount);
    setAsset(asset);

    setIsUpdate(true);
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
    if (transactionsDisperse.length === 0)
      return toast.error('Disperse needs at least one recipient');

    const recipients = [];
    const values = [];

    for (let i = 0; i < transactionsDisperse.length; i++) {
      const tx = transactionsDisperse[i];

      if (isAddress(tx.recipient) === true && parseFloat(tx.amount) > 0) {
        recipients.push(tx.recipient);
        values.push(tx.amount);
      }
    }

    if (contractAddress === '' && selectedAssetOption.value === 'ethereum') {
      try {
        const transaction = await disperseSendEther(
          account,
          recipients,
          values,
          gasPrice
        );

        const txData = {
          id: transaction.hash,
          hash: transaction.hash ? transaction.hash : '',
          from: transaction.from ? transaction.from : '',
          to: transaction.to ? transaction.to : '',
          value: ethers
            .formatEther(BigInt(transaction.value).toString())
            .toString(),
          tokenValue: '0.0',
          fee: calcFee(
            BigInt(transaction?.gasPrice).toString(),
            BigInt(transaction?.gasLimit).toString()
          ),
          totalCostUsd: '0.00',
          asset: 'ETH',
          confirmations: 'Pending',
          timestamp: Date.now(),
          type: transaction.from === account ? 'Send' : 'Receive',
          status: 'Pending',
          message: ' ',
        };

        setPending([...pending, txData]);
        setPendingTransaction(txData);
        setTransactionsDisperse([]);
        setTypeNotification('');
      } catch (err: any) {
        toast.error(err.message);
      }
    } else {
      if (isAddress(contractAddress) === false)
        return toast.error('This contract address is invalid');

      try {
        const { transaction, tokenValue } = await disperseSendToken(
          account,
          contractAddress,
          recipients,
          values,
          gasPrice
        );

        const txData = {
          id: transaction.hash,
          hash: transaction.hash ? transaction.hash : '',
          from: transaction.from ? transaction.from : '',
          to: transaction.to ? transaction.to : '',
          value: ethers
            .formatEther(BigInt(transaction.value).toString())
            .toString(),
          tokenValue: tokenValue,
          fee: calcFee(
            BigInt(transaction?.gasPrice).toString(),
            BigInt(transaction?.gasLimit).toString()
          ),
          totalCostUsd: '0.00',
          asset: asset,
          confirmations: 'Pending',
          timestamp: Date.now(),
          type: transaction.from === account ? 'Send' : 'Receive',
          status: 'Pending',
          message: ' ',
        };

        setPending([...pending, txData]);
        setPendingTransaction(txData);
        setTransactionsDisperse([]);
        setTypeNotification('');
      } catch (err: any) {
        toast.error(err.message);
      }
    }
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
    if (isAddress(recipient) === false) {
      return toast.error('This wallet is invalid');
    }

    if (amount === '' || parseFloat(amount) <= 0) {
      return toast.error('this amount is invalid');
    }

    const indexTransactionDisperse = transactionsDisperse.findIndex(
      (tx: TransactionDisperseType) => tx.recipient === recipient
    );

    if (indexTransactionDisperse >= 0) {
      if (selectedWalletOption.value === 'custom') {
        setRecipient('');
      }

      return toast.error('This recipient is already registered');
    }

    const newTransaction: TransactionDisperseType = {
      recipient: recipient,
      amount: parseFloat(amount).toString(),
      asset: asset,
    };

    setTransactionsDisperse([...transactionsDisperse, newTransaction]);
    setAmount('');

    if (selectedWalletOption.value === 'custom') {
      setRecipient('');
    }
  };

  const deleteRecipients = (address: string) => {
    const removeTransactionDisperse = transactionsDisperse.filter(
      (tx: TransactionDisperseType) => tx.recipient !== address
    );

    setTransactionsDisperse(removeTransactionDisperse);
  };

  const updateRecipients = (address: string) => {
    const newTransactionsDisperse = [...transactionsDisperse];
    const indexTransactionDisperse = newTransactionsDisperse.findIndex(
      (tx: TransactionDisperseType) => tx.recipient === address
    );

    if (indexTransactionDisperse >= 0) {
      newTransactionsDisperse[indexTransactionDisperse].amount = amount;

      setAmount('');

      if (selectedWalletOption.value === 'custom') {
        setRecipient('');
      }

      setTransactionsDisperse(newTransactionsDisperse);
    }

    setIsUpdate(false);
  };

  const handleOnchangeSelectedWallet = (option: Option | null) => {
    setSelectedWalletOption(
      option !== null
        ? option
        : {
            value: 'custom',
            label: 'Custom Wallet',
          }
    );
  };

  const handleOnchangeSelectionAsset = (option: Option | null) => {
    if (transactionsDisperse.length === 0) {
      setSelectedAssetOption(
        option !== null
          ? option
          : {
              value: 'ethereum',
              label: 'Ethereum',
            }
      );
    } else {
      setTypeNotification('Alert');
    }
  };

  const searchTransactionsDisperse = (value: string) => {
    if (value === '') {
      setSearchTransactionsFilter([]);
    } else {
      const filterTransaction = transactionsDisperse.filter(
        (tx: TransactionDisperseType) =>
          tx.recipient.includes(value) ||
          tx.recipient.toLocaleLowerCase().includes(value) ||
          tx.asset.includes(value) ||
          tx.asset.toLocaleLowerCase().includes(value) ||
          tx.amount.includes(value) ||
          tx.amount.toLocaleLowerCase().includes(value)
      );

      setSearchTransactionsFilter(filterTransaction);
    }
  };

  useEffect(() => {
    if (pendingTransaction.hash !== '') {
      setTypeNotification('Modal');
    }
  }, [pendingTransaction]);

  useEffect(() => {
    searchTransactionsDisperse(search);
  }, [search]);

  useEffect(() => {
    if (typeNotification !== '') {
      onOpen();
    }
  }, [typeNotification]);

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
    const walletOptions = wallets.map((wallet: Wallet) => {
      return {
        label: wallet.name,
        value: wallet.address,
      };
    });
    setSavedWallets([
      { value: 'custom', label: 'Custom Wallet' },
      ...walletOptions,
    ]);
  }, [wallets]);

  useEffect(() => {
    if (selectedWalletOption.value === 'custom') {
      setRecipient('');
    } else {
      setRecipient(selectedWalletOption.value);
    }
  }, [selectedWalletOption]);

  useEffect(() => {
    if (!account) {
      navigate('/');
    } else {
      wsTransactionsEvent();
    }
  }, [account]);

  useEffect(() => {
    if (!account) {
      requestAccounts();
    }
  }, []);

  const ListTransactionsDisperse = (props: ListTransactionsDisperseTypes) => {
    return (
      <li key={props.transaction.recipient} style={{ listStyleType: 'none' }}>
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
                <p>{props.transaction.recipient}</p>
                <p>{`${props.transaction.amount} ${props.transaction.asset}`}</p>
              </Account>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '10px 0 10px 0px',
              }}
            >
              <ButtonUser>
                <button onClick={() => handleShowWallet(props.transaction)}>
                  <img src={EditIcon} alt='Update' />
                </button>
              </ButtonUser>

              <ButtonUser>
                <button
                  onClick={() => deleteRecipients(props.transaction.recipient)}
                >
                  <img src={DeleteIcon} alt='Delete' />
                </button>
              </ButtonUser>
            </div>
          </User>
        </UserBlock>
      </li>
    );
  };

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
                    onChange={handleOnchangeSelectionAsset}
                    styles={{
                      control: (baseStyles) => ({
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
                <div style={{ marginRight: '50px' }}>
                  <Select
                    options={savedWallets}
                    defaultValue={selectedWalletOption}
                    onChange={handleOnchangeSelectedWallet}
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        height: '70px',
                        border: '3px solid #eae9ea',
                        borderRadius: '12px',
                        paddingLeft: '20px',
                        marginTop: '20px',
                      }),
                    }}
                  />
                </div>

                {selectedWalletOption.value === 'custom' ? (
                  <InputGroup key='input-wallet'>
                    <IconInput>
                      <img src={WalletIcon} alt='Wallet' />
                      <p>Wallet</p>
                    </IconInput>
                    <LineVertical>
                      <div />
                    </LineVertical>
                    <input
                      name='recipient'
                      onChange={handleChange}
                      type='text'
                      value={recipient}
                    />
                  </InputGroup>
                ) : (
                  ''
                )}

                <InputGroup key='input-amount'>
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
                  <button
                    onClick={() =>
                      isUpdate === false
                        ? addRecipients()
                        : updateRecipients(recipient)
                    }
                  >
                    {isUpdate === false ? 'Add Recipient' : 'Update Recipient'}
                  </button>
                </div>
              </ButtonGroup>
            </Register>
            <Recipient>
              <h2>Recipients</h2>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <Search>
                  <input
                    name='search'
                    type='text'
                    onChange={handleChange}
                    placeholder='Search'
                  />
                  <img src={SearchIcon} alt='Search' />
                </Search>
                <ButtonSendGroup>
                  <div>
                    <button onClick={() => send()}>Send</button>
                  </div>
                </ButtonSendGroup>
              </div>

              <ListUsers>
                {searchTransactionsFilter.length > 0
                  ? searchTransactionsFilter.map(
                      (tx: TransactionDisperseType) => (
                        <ListTransactionsDisperse
                          key={tx.recipient}
                          transaction={tx}
                        />
                      )
                    )
                  : transactionsDisperse.map((tx: TransactionDisperseType) => (
                      <ListTransactionsDisperse
                        key={tx.recipient}
                        transaction={tx}
                      />
                    ))}
              </ListUsers>
            </Recipient>
          </Body>
        </Section>
        {typeNotification === 'Alert' ? (
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered={true}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                  Action not permitted
                </AlertDialogHeader>

                <AlertDialogBody>
                  You should only send transactions of the same type, to change
                  delete all recipients or complete the operation.
                </AlertDialogBody>

                <AlertDialogFooter>
                  <Button ref={cancelRef} color='red' onClick={onClose}>
                    Ok
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        ) : (
          <Modal isCentered size={'2xl'} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyItems: 'center',
                width: '400px',
                height: '892px',
                borderRadius: '32px',
                background: 'rgba(216,216,219,0.65)',
                boxShadow: '0px 2px 48px 0px rgba(0, 0, 0, 0.04)',
                backdropFilter: 'blur(5.4px)',
                WebkitBackdropFilter: 'blur(1.4px)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '40px',
                  width: '335px',
                  height: '800px',
                  background: `url(${BillingIcon})`,
                  padding: '20px',
                }}
              >
                <IconDetails>
                  <Icon>
                    <img src={PendingIcon} width={40} alt='icon' />
                  </Icon>
                  <p>Pending Transaction</p>
                  <a
                    href={`https://sepolia.etherscan.io/tx/${pendingTransaction.hash}`}
                    target='_blank'
                  >
                    {`${pendingTransaction.hash.substring(
                      0,
                      13
                    )}...${pendingTransaction.hash.slice(
                      pendingTransaction.hash.length - 13
                    )}`}
                  </a>
                </IconDetails>
                <div style={{ marginTop: '50px' }}>
                  <TopicInfo>
                    <p>Hash</p>
                    <a
                      href={`https://sepolia.etherscan.io/tx/${pendingTransaction.hash}`}
                      target='_blank'
                    >
                      {`${pendingTransaction.hash.substring(
                        0,
                        13
                      )}...${pendingTransaction.hash.slice(
                        pendingTransaction.hash.length - 13
                      )}`}
                    </a>
                  </TopicInfo>
                </div>
                <div style={{ marginTop: '33px' }}>
                  <TopicInfo>
                    <p>Date</p>
                    <p>{moment().format('ll')}</p>
                  </TopicInfo>
                  <TopicInfo>
                    <p>From</p>
                    <p>{`${pendingTransaction.from.substring(
                      0,
                      8
                    )}...${pendingTransaction.from.slice(
                      pendingTransaction.from.length - 8
                    )}`}</p>
                  </TopicInfo>
                  <TopicInfo>
                    <p>To</p>
                    <p>{`${pendingTransaction.to.substring(
                      0,
                      8
                    )}...${pendingTransaction.to.slice(
                      pendingTransaction.to.length - 8
                    )}`}</p>
                  </TopicInfo>
                </div>
                <div style={{ marginTop: '40px' }}>
                  <TopicInfo>
                    <p>Amount</p>
                    <p>{`${
                      asset === 'ETH'
                        ? pendingTransaction.value.toString()
                        : pendingTransaction.tokenValue.toString()
                    } ${asset}`}</p>
                  </TopicInfo>
                  <TopicInfo>
                    <p>Fee</p>
                    <p>{`${parseFloat(pendingTransaction.fee)} ETH`}</p>
                  </TopicInfo>
                </div>
                <div style={{ marginTop: '70px' }}>
                  <TopicInfo>
                    <p>Total Cost</p>
                    <p>{`${totalCost(
                      pendingTransaction.value.toString(),
                      pendingTransaction.fee
                    )} ETH`}</p>
                  </TopicInfo>
                </div>
              </div>
              <ButtonModal>
                <div>
                  <button onClick={() => onClose()}>Done</button>
                </div>
              </ButtonModal>
            </ModalContent>
          </Modal>
        )}
      </Container>
    </>
  );
}
