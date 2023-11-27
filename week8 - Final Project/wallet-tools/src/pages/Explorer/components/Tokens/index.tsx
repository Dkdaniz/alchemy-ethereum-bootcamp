import { useEffect, useState } from 'react';

import { Box, Image, Heading, Text } from '@chakra-ui/react';
import { ListTokens } from './style';

interface Token {
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

interface Tokens {
  tokens: Token[];
  selected: string;
  removeSpams: boolean;
}

export default function Tokens(props: Tokens) {
  const [tokens, setTokens] = useState<Token[]>([]);

  useEffect(() => {
    let newTokenFilter = [];
    if (props.selected === 'ERC20') {
      newTokenFilter = props.tokens.filter(
        (token: Token) => token.type === props.selected
      );
    } else {
      if (props.removeSpams === false) {
        newTokenFilter = props.tokens.filter(
          (token: Token) =>
            token.type === props.selected && token.isSpam === false
        );
      } else {
        newTokenFilter = props.tokens.filter(
          (token: Token) =>
            token.type === props.selected && token.isSpam === true
        );
      }
    }
    setTokens(newTokenFilter);
  }, [props.selected, props.removeSpams]);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '',
        }}
      >
        <ListTokens>
          {tokens &&
            tokens.map((token: Token, index: number) => (
              <li key={index}>
                <Box
                  key={index}
                  display='flex'
                  flexDirection='row'
                  bg='#FFFFFF'
                  w='100%'
                  p={6}
                  borderRadius={24}
                  marginTop={6}
                >
                  <Box>
                    <Image
                      borderRadius={24}
                      maxW={{ base: '100%', sm: '60px' }}
                      src={token.imgSrc[0]}
                      fallbackSrc={token.imgSrc[1]}
                      alt={token.name}
                    />
                  </Box>
                  <Box marginLeft={10}>
                    <Heading size='md'>
                      {props.selected === 'ERC20' ? token.name : token.title}
                    </Heading>

                    {props.selected === 'ERC20' ? (
                      <Box display='flex' flexDirection='column'>
                        <Text marginTop={2} fontSize='lg' as='b'>{`${
                          token.balance
                        } ${token.symbol !== null ? token.symbol : ''}`}</Text>
                      </Box>
                    ) : (
                      ''
                    )}

                    {props.selected !== 'ERC20' ? (
                      <Box display='flex' flexDirection='column'>
                        <Text
                          marginTop={2}
                          fontSize='sm'
                          textColor='#5A5252'
                        >{`${token.description}`}</Text>
                        {props.selected === 'ERC1155' ? (
                          <Text
                            marginTop={2}
                            fontSize='lg'
                            as='b'
                          >{`${token.balance}`}</Text>
                        ) : (
                          ''
                        )}
                      </Box>
                    ) : (
                      ''
                    )}
                  </Box>
                </Box>
              </li>
            ))}
        </ListTokens>
      </div>
    </>
  );
}
