import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from '@chakra-ui/react';

import { ethers, isAddress } from 'ethers';

import { useEffect, useState, ChangeEvent } from 'react';
import Select from 'react-select';
import { AlchemySubscription } from 'alchemy-sdk';

import Sidebar from '../../components/Sidebar';

import WalletIcon from '../../assets/wallet.svg';
import EthereumIcon from '../../assets/ethereum.svg';
import FeeIcon from '../../assets/fee.svg';
import BillingIcon from '../../assets/billing.svg';
import PendingIcon from '../../assets/tx_pending_white.svg';

import { alchemy } from '../../tools/alchemy';

import { useMetamaskStore } from '../../store/metamask';
import useLocalStorage from '../../hooks/useLocalStorage';

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
  fee: string;
  totalCostUsd: string;
  asset: string;
  confirmations: string;
  timestamp: number;
  type: string;
  status: string;
  message: string;
}

interface Wallet {
  name: string;
  address: string;
}

interface TransactionEventMinted {
  removed: boolean;
  transaction: TransactionEventPending;
}

import {
  Container,
  Section,
  Headline,
  Body,
  InputBlock,
  InputGroup,
  IconInput,
  LineVertical,
  Line,
  ButtonGroup,
  Input,
  ButtonModal,
  IconDetails,
  Icon,
  TopicInfo,
} from './style';
import { toast } from 'react-toastify';

function Send() {
  const [wallets] = useLocalStorage('@WalletTools:wallets', []);
  const [pending, setPending] = useLocalStorage(
    '@WalletTools:transaction:pending',
    []
  );

  const [recipient, setRecipient] = useState<string>('');
  const [contractAddress, setContractAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [gasPrice, setGasPrice] = useState<string>('');
  const [pendingTransaction, setPendingTransaction] = useState<TransactionType>(
    {
      id: '',
      hash: '',
      from: '',
      to: '',
      value: 0.0,
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

  const [savedWallets, setSavedWallets] = useState([
    { value: 'custom', label: 'Custom Wallet' },
  ]);

  const [selectedAssetOption, setSelectedAssetOption] = useState({
    value: 'ethereum',
    label: 'Ethereum',
  });

  const [selectedWalletOption, setSelectedWalletOption] = useState({
    value: 'custom',
    label: 'Custom Wallet',
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { account, requestAccounts, sendEther } = useMetamaskStore();

  const walletAssets = [
    { value: 'ethereum', label: 'Ethereum' },
    { value: 'custom', label: 'Custom Token' },
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'recipient':
        setRecipient(e.target.value);
        break;
      case 'amount':
        setAmount(e.target.value);
        break;
      case 'gasPrice':
        setGasPrice(e.target.value);
        break;
      case 'contractAddress':
        setContractAddress(e.target.value);
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
    if(contractAddress !== ''){
      return parseFloat(amount) + parseFloat(fee) 
    }else{
       return parseFloat(fee);
    }
  }

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

  const send = async () => {
    if (isAddress(recipient) === false)
      return toast.error('This wallet is invalid');
    if (isAddress(account) === false)
      return toast.error('This wallet is invalid');
    if (parseFloat(amount) === 0) return toast.error('Amount is invalid');
    if (parseFloat(gasPrice) === 0) return toast.error('Amount is invalid');

    if (contractAddress === '') {
      const transaction = await sendEther(account, recipient, amount, gasPrice);

      const txData = {
        id: transaction.hash,
        hash: transaction.hash,
        from: transaction.from,
        to: transaction.to,
        value: parseFloat(
          ethers.parseEther(BigInt(transaction.value).toString()).toString()
        ),
        fee: calcFee(
          BigInt(transaction?.gasPrice).toString(),
          BigInt(transaction?.gasLimit).toString()
        ),
        totalCostUsd: '0.00',
        asset: transaction.data !== '0x' ? 'Token' : 'ETH',
        confirmations: 'Pending',
        timestamp: Date.now(),
        type: transaction.from === account ? 'Send' : 'Receive',
        status: 'Pending',
        message: ' ',
      };

      setPending([...pending, txData]);
    } else {
      if (isAddress(contractAddress) === false)
        return toast.error('This contract address is invalid');
    }
  };

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
    if (selectedAssetOption.value === 'ethereum') {
      setContractAddress('');
    } else {
      setContractAddress(selectedAssetOption.value);
    }
  }, [selectedAssetOption]);

  useEffect(() => {
   
    if (pendingTransaction.hash !== '') {
      onOpen();
    }
  }, [pendingTransaction]);

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
          <Headline>
            <h1>Send Assets</h1>
          </Headline>

          <Body>
            <InputBlock>
              <div>
                <Select
                  options={walletAssets}
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
              <p>Select the recipient and amount</p>
              <div />
            </Line>
            <InputBlock>
              <div>
                <Select
                  options={savedWallets}
                  defaultValue={selectedWalletOption}
                  onChange={setSelectedWalletOption}
                  styles={{
                    control: (baseStyles, state) => ({
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
            </InputBlock>
            <InputBlock>
              <InputGroup key='input-amount'>
                <IconInput>
                  <img src={EthereumIcon} alt='Amount' />
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
                  <input readOnly={true} type='text' value={'ETH'} />
                </Input>
              </InputGroup>
              <InputGroup key='input-wallet'>
                <IconInput>
                  <img src={FeeIcon} alt='Fee' />
                  <p>Fee</p>
                </IconInput>
                <LineVertical>
                  <div />
                </LineVertical>
                <Input>
                  <input
                    name='gasPrice'
                    type='number'
                    onChange={handleChange}
                    value={gasPrice}
                  />
                  <input readOnly={true} type='text' value={'Gwei'} />
                </Input>
              </InputGroup>
            </InputBlock>
            <ButtonGroup>
              <div>
                <button onClick={() => send()}>Send</button>
              </div>
            </ButtonGroup>
          </Body>
        </Section>
      </Container>
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
                href={`https://etherscan.io/tx/${pendingTransaction.hash}`}
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
                  href={`https://etherscan.io/tx/${`0xd9d62b2036b2607a259885378462a885c812558b7819b0f90119cd46bf84837d`}`}
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
                <p>13 Apr 2023</p>
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
                <p>
                  {pendingTransaction.value}  ${contractAddress !== '' ? 'Token' : 'ETH'}`}
                </p>
              </TopicInfo>
              <TopicInfo>
                <p>Fee</p>
                <p>
                  {`${parseFloat(
                    pendingTransaction.fee
                  )} ETH`}
                </p>
              </TopicInfo>
            </div>
            <div style={{ marginTop: '70px' }}>
              <TopicInfo>
                <p>Total Cost</p>
                <p>{`${totalCost(
                  pendingTransaction.value,
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
    </>
  );
}

export default Send;
