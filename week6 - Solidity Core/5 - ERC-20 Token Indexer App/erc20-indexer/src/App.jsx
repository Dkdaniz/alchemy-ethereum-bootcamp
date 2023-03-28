
import { Alchemy, Network, Utils } from 'alchemy-sdk';
import Header from './components/Header/index';
import Search from './components/Search/index';
import TabOptions from './components/TabOptions/index';
import Tokens from './components/Tokens/index';

import { useEffect, useState } from 'react';


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

  async function getTokens() {
    const config = {
      apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
      network: Network.ETH_MAINNET,
    };

    const alchemy = new Alchemy(config);
    const tokensERC20 = alchemy.core.getTokenBalances("0xshah.eth");
    const nfts = alchemy.nft.getNftsForOwner("0xshah.eth", {});

    const userTokensTemp = []
    const typesTokenTemp = []

    Promise.all([tokensERC20, nfts]).then(allTokensAndNfts => {
      if(allTokensAndNfts[1].ownedNfts.length > 0){
        const tokensNFT = allTokensAndNfts[1].ownedNfts;
        for (let i = 0; i < tokensNFT.length; i++) {
          const {contract, tokenId, tokenType, spamInfo, balance, tokenUri} = tokensNFT[i];

            userTokensTemp.push({
              name: contract.name, 
              title: `${contract.name} #${tokenId}`,
              description: contract?.openSea?.description,
              tokenId: tokenId,
              contractAddress: contract.address,
              balance: balance,
              isSpam: spamInfo?.isSpam,
              type: tokenType,
              imgSrc: [tokenUri?.gateway ||  tokenUri?.raw, contract?.openSea?.imageUrl]
            })

            typesTokenTemp.push({name: tokenType, callback: () => {console.log(tokenType)}});
        }
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
              symbol: tokenDetail.symbol, 
              decimals: tokenDetail.decimals,  
              contractAddress: tokenContract.contractAddress,
              balance: tokenContract.tokenBalance,
              type: "ERC20"
            })

            typesTokenTemp.push({name: "ERC20", callback: () => {console.log("ERC20")}});
          }        

          const unique = [...new Map(typesTokenTemp.map((m) => [m.name, m])).values()];
          setTypeTokens(unique)
        })
      }

      setUserTokens(userTokensTemp)
    })
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
        <Search />
        <TabOptions tokens={typeTokens} selected={typeSelected}/>
      </Container>
    </>
  );
}

export default App;
