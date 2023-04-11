
import { useEffect, useState } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import { ethers } from 'ethers';


import Header from './components/Header/index';
import Search from './components/Search/index';
import TabOptions from './components/TabOptions/index';
import Tokens from './components/Tokens/index';

import tokenImg from './assets/token.png'

import {
  useToast,
  Container
} from '@chakra-ui/react';

const ethereum = window.ethereum;

function App() {
  const toast = useToast();

  const [userAddress, setUserAddress] = useState('');
  const [userTokens, setUserTokens] = useState([]);
  const [typeTokens, setTypeTokens] = useState([]);
  const [typeSelected, setTypeSelected] = useState('');
  const [searchAddress, setSearchAddress] = useState('');
  const [isCallAlchemy, setIsCallAlchemy] = useState(false);
  const [removeSpams, setRemoveSpams] = useState(false);

  const getAddress = async () => {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setUserAddress(account);
    } catch (error) {
      console.log({error})
      const {code} = error;
        if(code === 4001){
          toast({
          title: 'Error Connect Account',
          description: error.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
    }
  }

  const orderListTypeTokens = (typeTokensRaw) => {
    const orderList = typeTokensRaw.sort((a, b) => {
      if (a.name.length < b.name.length) {
        return -1;
      } else if (a.name.length > b.name.length) {
        return 1;
      }else{
        return 0;
      } 
    })

    return orderList;
  }

  async function getTokens() {
    if(isCallAlchemy === true) return;
    
    const config = {
      apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
      network: Network.ETH_MAINNET,
    };

    const alchemy = new Alchemy(config);
    const tokensERC20 = alchemy.core.getTokenBalances(userAddress);
    const nfts = alchemy.nft.getNftsForOwner(userAddress, {});

    const userTokensTemp = []
    const typesTokenTemp = []

    const tokenProcessed = [false, false];

    Promise.all([tokensERC20, nfts]).then(allTokensAndNfts => {
      if(allTokensAndNfts[1].ownedNfts.length > 0){
        const tokensNFT = allTokensAndNfts[1].ownedNfts;
        for (let i = 0; i < tokensNFT.length; i++) {
            const {contract, tokenId, media, tokenType, spamInfo, balance} = tokensNFT[i];
            
            let img = '';
            if(media.length > 0 && media[0].gateway !== ""){
              img = media[0].gateway;
            }

            let description = '';
            if(contract?.openSea?.description){
              if(contract?.openSea?.description.length > 200) {
                description = `${contract?.openSea?.description.substring(0, 200)}...`
              }else{
                description = contract?.openSea?.description
              }
            }

            userTokensTemp.push({
              name: contract.name, 
              title: `${contract.name} ${tokenId !== ''&& tokenId.toString().length > 6 ? '' : `#${tokenId}`}`,
              description: description,
              tokenId: tokenId,
              contractAddress: contract.address,
              balance: balance,
              isSpam: spamInfo?.isSpam,
              type: tokenType,
              imgSrc: [img, tokenImg ]
            })

            typesTokenTemp.push({name: tokenType, callback: () => {setTypeSelected(tokenType)}});
        }

        if(tokenProcessed[0] && tokenProcessed[1]) setIsCallAlchemy(false)
      }
      
      if(allTokensAndNfts[0].tokenBalances.length > 0){
        const tokenDataPromises = [];
        const tokensERC20 = allTokensAndNfts[0];

        for (let i = 0; i < tokensERC20.tokenBalances.length; i++) {
          const tokenData = alchemy.core.getTokenMetadata(
            tokensERC20.tokenBalances[i].contractAddress
          );
          tokenDataPromises.push(tokenData);
        }
    
    
        Promise.all(tokenDataPromises).then(allTokensDetailUser => {
          for (let i = 0; i < allTokensDetailUser.length; i++) {
            const tokenDetail = allTokensDetailUser[i];
            const tokenContract = tokensERC20.tokenBalances[i]

            userTokensTemp.push({
              name: tokenDetail.name, 
              symbol: tokenDetail.symbol !== null ? tokenDetail.symbol : ' ', 
              decimals: tokenDetail.decimals,  
              contractAddress: tokenContract.contractAddress,
              balance: ethers.formatUnits(parseInt(tokenContract.tokenBalance, tokenDetail.decimals).toString()),
              imgSrc: [tokenDetail.logo, tokenImg],
              type: "ERC20"
            })

            typesTokenTemp.push({name: "ERC20", callback: () => {setTypeSelected("ERC20")}});
          }        

          const unique = orderListTypeTokens([...new Map(typesTokenTemp.map((m) => [m.name, m])).values()])
          setTypeTokens(unique);
          
          setTypeSelected(unique.length > 0 ? unique[0].name : '')
          if(tokenProcessed[0] && tokenProcessed[1]) setIsCallAlchemy(false)
        })
      }

      setUserTokens(userTokensTemp)
      
    })
  }

  const handleOnKeyDown = (e) => {
    if(e.key === "Enter"){
      const isAddressValid = ethers.isAddress(searchAddress);
      if(searchAddress.includes('0x') === true && isAddressValid === false && searchAddress.includes('.eth') === false) {
        return toast({
          title: 'Error',
          description: "Address Invalid",
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }

      if(searchAddress === ''){
        getAddress();
      }else{
        setUserAddress(searchAddress);
      }
    }
  }

  const handleOnChange = (e) => {
    setSearchAddress(e.target.value)
  }

  const handleRemoveSpams = () => {
    setRemoveSpams(!removeSpams)
  }

  useEffect(() => {
    if (typeof ethereum === 'undefined') {
      console.log('MetaMask no is installed!');
    }else{
      getAddress();
    }
  }, [])

  useEffect(() => {
    if(userAddress !== '') getTokens();
  },[userAddress])

  return (
    <>
      <Container maxW='5xl' centerContent>
        <Header value={"Token Indexer"}/>
        <Search value={searchAddress} onkeydown={handleOnKeyDown} onchange={handleOnChange} />
        <TabOptions tokens={typeTokens} selected={typeSelected} isChecked={removeSpams} onchangeChecked={handleRemoveSpams}/>
        <Tokens tokens={userTokens} selected={typeSelected} removeSpams={removeSpams}/>
      </Container>
    </>
  );
}

export default App;
