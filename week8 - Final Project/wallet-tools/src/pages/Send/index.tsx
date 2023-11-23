import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import Sidebar from '../../components/Sidebar';

import useLocalStorage from '../../hooks/useLocalStorage';

import WalletIcon from '../../assets/wallet.svg';
import EthereumIcon from '../../assets/ethereum.svg';
import FeeIcon from '../../assets/fee.svg';
import BillingIcon from '../../assets/billing.svg';

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
} from './style';

interface Wallet {
  name: string;
  address: string;
}

function Send() {
  const [wallets] = useLocalStorage('@WalletTools:wallets', []);
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

  const walletAssets = [
    { value: 'ethereum', label: 'Ethereum' },
    { value: 'custom', label: 'Custom Token' },
  ];

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
                    type='text'
                    value={'0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f'}
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
                  <input type='text' value={`${125.51}`} />
                  <input type='text' value={'USDT'} />
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
                  <input type='text' value={`${21}`} />
                  <input type='text' value={'Gwei'} />
                </Input>
              </InputGroup>
            </InputBlock>
            <ButtonGroup>
              <div>
                <button onClick={() => onOpen()}>Send</button>
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
            width: '450px',
            height: '892px',
            borderRadius: '32px',
            background: '#D8D8DB',
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
            <div>
              <img src={FeeIcon}></img>
              <h2>Transfer Success</h2>
              <p>0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f</p>
            </div>
            <div>
              <p>Hash</p>
              <p>0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f</p>
            </div>
            <div>
              <div>
                <p>Date</p>
                <p>13 Apr 2023</p>
              </div>
              <div>
                <p>From</p>
                <p>0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f</p>
              </div>
              <div>
                <p>To</p>
                <p>0xfe8eaba05b2fd1b750471870274ea91bcfd9ff3f</p>
              </div>
            </div>
            <div>
              <div>
                <p>Amount</p>
                <p>1.54 ETH</p>
              </div>
              <div>
                <p>Fee</p>
                <p>0.01 ETH</p>
              </div>
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
