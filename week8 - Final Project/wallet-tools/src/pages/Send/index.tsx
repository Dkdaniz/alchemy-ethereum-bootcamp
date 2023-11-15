import { useState } from 'react';
import Select from 'react-select';
import Sidebar from '../../components/Sidebar';

import WalletIcon from '../../assets/wallet.svg';
import EthereumIcon from '../../assets/ethereum.svg';
import FeeIcon from '../../assets/fee.svg';

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
} from './style';

function Receive() {
  const [selectedAssetOption, setSelectedAssetOption] = useState({
    value: 'ethereum',
    label: 'Ethereum',
  });

  const [selectedWalletOption, setSelectedWalletOption] = useState({
    value: 'custom',
    label: 'Custom Wallet',
  });

  const walletAssets = [
    { value: 'ethereum', label: 'Ethereum' },
    { value: 'custom', label: 'Custom Token' },
  ];

  const walletSave = [
    { value: 'custom', label: 'Custom Wallet' },
    { value: 'joao', label: 'Joao' },
  ];

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
              <div style={{ marginRight: '50px' }}>
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
              <div style={{ marginRight: '50px' }}>
                <Select
                  options={walletSave}
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
                <button>Add Recipient</button>
              </div>
            </ButtonGroup>
          </Body>
        </Section>
      </Container>
    </>
  );
}

export default Receive;
