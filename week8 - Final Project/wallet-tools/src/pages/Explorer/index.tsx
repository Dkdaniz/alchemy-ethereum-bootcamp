import { Container } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-toastify';

import { alchemy } from '../../tools/alchemy';

import { useMetamaskStore } from '../../store/metamask';

import Search from './components/Search/index';
import TabOptions from './components/TabOptions/index';
import Tokens from './components/Tokens/index';

import Sidebar from '../../components/Sidebar';
import tokenImg from '../../assets/token.png';

import { ContainerApp, Section } from './style';

interface UserTokenType {
  name: string;
  symbol?: string;
  decimals?: number;
  title?: string;
  description?: string;
  tokenId?: string;
  contractAddress?: string;
  balance?: string;
  isSpam?: boolean;
  type: string;
  imgSrc: string[];
}

interface TypeTokens {
  name: string;
  callback: any;
}

function Explorer() {
  const { account, requestAccounts } = useMetamaskStore();

  const navigate = useNavigate();

  const [userAddress, setUserAddress] = useState('');
  const [userTokens, setUserTokens] = useState<UserTokenType[]>([]);
  const [typeTokens, setTypeTokens] = useState<TypeTokens[]>([]);
  const [typeSelected, setTypeSelected] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [removeSpams, setRemoveSpams] = useState(false);

  const getTokens = async (userAddress: string, tokenImg: string) => {
    const tokensERC20 = alchemy.core.getTokenBalances(userAddress);
    const nfts = alchemy.nft.getNftsForOwner(userAddress);

    const userTokensTemp: UserTokenType[] = [];
    const typesTokenTemp: TypeTokens[] = [];

    await Promise.all([tokensERC20, nfts]).then((allTokensAndNfts) => {
      if (allTokensAndNfts[1].ownedNfts.length > 0) {
        const tokensNFT = allTokensAndNfts[1].ownedNfts;
        for (let i = 0; i < tokensNFT.length; i++) {
          const { contract, tokenId, image, tokenType, balance } = tokensNFT[i];
          const { isSpam } = contract;

          const img = image.pngUrl ? image.pngUrl : '';

          let description = '';
          if (contract?.openSeaMetadata?.description) {
            if (contract?.openSeaMetadata?.description.length > 200) {
              description = `${contract?.openSeaMetadata?.description.substring(
                0,
                200
              )}...`;
            } else {
              description = contract?.openSeaMetadata?.description;
            }
          }

          const tokenTemp = {
            name: contract.name ? contract.name : 'NFT',
            title: `${contract.name} ${
              tokenId !== '' && tokenId.toString().length > 6
                ? ''
                : `#${tokenId}`
            }`,
            description: description,
            tokenId: tokenId,
            contractAddress: contract.address,
            balance: balance,
            isSpam: isSpam ? isSpam : false,
            type: tokenType,
            imgSrc: [img, tokenImg],
          };

          if (tokenTemp.name === 'NFT') tokenTemp.title = 'NFT';

          userTokensTemp.push(tokenTemp);

          typesTokenTemp.push({
            name: tokenType,
            callback: () => {
              setTypeSelected(tokenType);
            },
          });
        }
      }

      if (allTokensAndNfts[0].tokenBalances.length > 0) {
        const tokenDataPromises = [];
        const tokensERC20 = allTokensAndNfts[0];

        for (let i = 0; i < tokensERC20.tokenBalances.length; i++) {
          const tokenData = alchemy.core.getTokenMetadata(
            tokensERC20.tokenBalances[i].contractAddress
          );
          tokenDataPromises.push(tokenData);
        }

        Promise.all(tokenDataPromises).then((allTokensDetailUser) => {
          for (let i = 0; i < allTokensDetailUser.length; i++) {
            const tokenDetail = allTokensDetailUser[i];
            const tokenContract = tokensERC20.tokenBalances[i];

            const imgSrc: string[] = [];

            if (tokenDetail.logo) imgSrc.push(tokenDetail.logo);
            imgSrc.push(tokenImg);

            let balance = '0.00';
            if (tokenContract.tokenBalance && tokenDetail.decimals) {
              balance = ethers.formatUnits(
                BigInt(tokenContract.tokenBalance),
                tokenDetail.decimals
              );
            }

            userTokensTemp.push({
              name: tokenDetail.name ? tokenDetail.name : 'Token',
              symbol: tokenDetail.symbol !== null ? tokenDetail.symbol : ' ',
              decimals: tokenDetail.decimals ? tokenDetail.decimals : 18,
              contractAddress: tokenContract.contractAddress,
              balance: balance,
              imgSrc: imgSrc,
              type: 'ERC20',
            });

            typesTokenTemp.push({
              name: 'ERC20',
              callback: () => {
                setTypeSelected('ERC20');
              },
            });
          }

          const unique = orderListTypeTokens([
            ...new Map(typesTokenTemp.map((m) => [m.name, m])).values(),
          ]);

          console.log(typesTokenTemp);

          setTypeTokens(unique);
          setTypeSelected(unique.length > 0 ? unique[0].name : '');
        });
      }

      setUserTokens(userTokensTemp);
    });
  };

  const orderListTypeTokens = (typeTokensRaw: any): TypeTokens[] => {
    const orderList = typeTokensRaw.sort((a: any, b: any) => {
      if (a.name.length < b.name.length) {
        return -1;
      } else if (a.name.length > b.name.length) {
        return 1;
      } else {
        return 0;
      }
    });

    return orderList;
  };

  const handleOnKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const isAddressValid = ethers.isAddress(searchAddress);

      if (
        searchAddress.includes('0x') === true &&
        isAddressValid === false &&
        searchAddress.includes('.eth') === false
      ) {
        return toast.error('Address Invalid');
      }

      setUserAddress(searchAddress);
    }
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(e.target.value);
  };

  const handleRemoveSpams = () => {
    setRemoveSpams(!removeSpams);
  };

  useEffect(() => {
    console.log(userTokens);
  }, [userTokens]);

  useEffect(() => {
    if (account === '') {
      navigate('/');
    } else {
      setSearchAddress(account);
      setUserAddress(account);
    }
  }, [account]);

  useEffect(() => {
    if (userAddress !== '') getTokens(userAddress, tokenImg);
  }, [userAddress]);

  useEffect(() => {
    if (account === '') {
      requestAccounts();
    }
  }, []);

  return (
    <>
      <ContainerApp>
        <Sidebar />
        <Section>
          <Container maxW='8xl' centerContent>
            <Search
              value={searchAddress}
              onkeydown={handleOnKeyDown}
              onchange={handleOnChange}
            />
            <TabOptions
              tokens={typeTokens}
              selected={typeSelected}
              isChecked={removeSpams}
              onchangeChecked={handleRemoveSpams}
            />
            <Tokens
              tokens={userTokens}
              selected={typeSelected}
              removeSpams={removeSpams}
            />
          </Container>
        </Section>
      </ContainerApp>
    </>
  );
}

export default Explorer;
