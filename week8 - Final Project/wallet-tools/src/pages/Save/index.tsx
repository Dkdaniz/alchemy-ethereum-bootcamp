import { useState, ChangeEvent, useEffect } from 'react';
import { isAddress } from 'ethers';

import useLocalStorage from '../../hooks/useLocalStorage';

import Sidebar from '../../components/Sidebar';
import EthereumIcon from '../../assets/ethereum.svg';
import WalletIcon from '../../assets/wallet.svg';
import NoteIcon from '../../assets/note.svg';
import UserIcon from '../../assets/user.svg';
import DeleteIcon from '../../assets/delete.svg';
import SearchIcon from '../../assets/search.svg';
import EditIcon from '../../assets/edit.svg';

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
} from './style';

import { toast } from 'react-toastify';

interface IWallet {
  name: string;
  address: string;
  notes: string;
}

interface IPropWalletComponent {
  wallet: IWallet;
}

export default function Save() {
  const [wallets, setWallets] = useLocalStorage('@WalletTools:wallets', []);
  const [searchWalletFilter, setSearchWalletFilter] = useState<IWallet[]>([]);
  const [address, setAddress] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [isUpdate, setIsUpdate] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'wallet':
        setAddress(e.target.value);
        break;
      case 'notes':
        setNotes(e.target.value);
        break;
      case 'search':
        setSearch(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleUpdate = (walletIndex: number) => {
    const oldWallets = [...wallets];

    oldWallets[walletIndex].name = name;
    oldWallets[walletIndex].address = address;
    oldWallets[walletIndex].notes = notes;

    setWallets(oldWallets);
    setIsUpdate(false);
  };

  const handleCreate = (walletIndex: number) => {
    if (walletIndex !== -1) {
      setAddress('');
      setName('');
      setNotes('');

      return toast.error('This wallet is already registered');
    }

    setWallets([...wallets, { name, address, notes }]);
  };

  const handleCreateOrUpdateWallets = () => {
    if (name === '') return toast.error('Name was not provided');
    if (address === '') return toast.error('address was not provided');

    if (isAddress(address) === false)
      return toast.error('This wallet is invalid');

    const searchIndexAddress = wallets.findIndex(
      (wallet: IWallet) => wallet.address === address
    );

    if (isUpdate === true) {
      handleUpdate(searchIndexAddress);
    } else {
      handleCreate(searchIndexAddress);
    }

    setAddress('');
    setName('');
    setNotes('');
  };

  const handleDeleteWallet = (address: string) => {
    const newWallets = wallets.filter(
      (wallet: IWallet) => wallet.address !== address
    );

    setWallets(newWallets);

    setAddress('');
    setName('');
    setNotes('');
  };

  const handleShowWallet = (wallet: IWallet) => {
    const { name, address, notes } = wallet;

    setAddress(address);
    setName(name);
    setNotes(notes);

    setIsUpdate(true);
  };

  const searchWallets = (value: string) => {
    const filterWallets = wallets.filter(
      (wallet: IWallet) =>
        wallet.address.includes(value) ||
        wallet.address.toLocaleLowerCase().includes(value) ||
        wallet.name.includes(value) ||
        wallet.name.toLocaleLowerCase().includes(value) ||
        wallet.notes.includes(value) ||
        wallet.notes.toLocaleLowerCase().includes(value)
    );

    setSearchWalletFilter(filterWallets);
  };

  useEffect(() => {
    searchWallets(search);
  }, [search]);

  const WalletComponent = (props: IPropWalletComponent) => {
    return (
      <li key={props.wallet.address} style={{ listStyleType: 'none' }}>
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
                <p>{props.wallet.name}</p>
                <p>{props.wallet.address}</p>
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
                <button onClick={() => handleShowWallet(props.wallet)}>
                  <img src={EditIcon} alt='Update' />
                </button>
              </ButtonUser>
              <ButtonUser>
                <button
                  onClick={() => handleDeleteWallet(props.wallet.address)}
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
              <h1>Save</h1>
            </Title>
            <LineHorizontal>
              <div />
            </LineHorizontal>
          </Header>
          <Body>
            <Register>
              <h2>Register</h2>
              <InputBlock>
                <InputGroup key='input-name'>
                  <IconInput>
                    <img src={EthereumIcon} alt='Ethereum' />
                    <p>Name</p>
                  </IconInput>

                  <LineVertical>
                    <div />
                  </LineVertical>
                  <input
                    name='name'
                    type='text'
                    value={name}
                    placeholder='Gavin Wood'
                    onChange={handleChange}
                  />
                </InputGroup>
                <InputGroup key='input-wallet'>
                  <IconInput>
                    <img src={WalletIcon} alt='Wallet' />
                    <p>Wallet</p>
                  </IconInput>
                  <LineVertical>
                    <div />
                  </LineVertical>
                  <input
                    name='wallet'
                    type='text'
                    placeholder='0x...123'
                    value={address}
                    onChange={handleChange}
                  />
                </InputGroup>
                <InputGroup key='input-note'>
                  <IconInput>
                    <img src={NoteIcon} alt='Note' />
                    <p>Notes</p>
                  </IconInput>

                  <LineVertical>
                    <div />
                  </LineVertical>
                  <input
                    name='notes'
                    type='text'
                    placeholder='This is wallet of my friend'
                    value={notes}
                    onChange={handleChange}
                  />
                </InputGroup>
              </InputBlock>
              <ButtonGroup>
                <div>
                  <button onClick={() => handleCreateOrUpdateWallets()}>
                    {isUpdate === false ? 'Add Recipient' : 'Update Recipient'}
                  </button>
                </div>
              </ButtonGroup>
            </Register>
            <Recipient>
              <h2>Wallets</h2>
              <Search>
                <input
                  name='search'
                  type='text'
                  placeholder='Search'
                  value={search}
                  onChange={handleChange}
                />
                <img src={SearchIcon} alt='Search' />
              </Search>
              <ListUsers>
                {search !== '' &&
                  searchWalletFilter.map((wallet: IWallet) => (
                    <WalletComponent wallet={wallet} />
                  ))}

                {search === '' &&
                  wallets.map((wallet: IWallet) => (
                    <WalletComponent key={wallet.address} wallet={wallet} />
                  ))}
              </ListUsers>
            </Recipient>
          </Body>
        </Section>
      </Container>
    </>
  );
}
