import { useEffect, useState } from 'react';

import {
  Box,
  Image,
  Heading,
  Text,
} from '@chakra-ui/react';


export default function Tokens(props) {
    const [tokens, setTokens] = useState([])


    useEffect(() => {
        let newTokenFilter = props.tokens.filter(token => token.type === props.selected);
        setTokens(newTokenFilter);
    },[props.selected, props.removeSpams])

    return (
        <>
            {tokens && tokens.map((token, index) => (
                <Box key={index} display="flex" flexDirection="row" bg="#FFFFFF" w='100%' p={6} borderRadius={24} marginTop={42}>
                    <Box >
                        <Image
                        borderRadius={24}
                        objectFit='fit'
                        maxW={{ base: '100%', sm: '92px' }}
                        src={token.imgSrc[0]}
                        fallbackSrc={token.imgSrc[1]}
                        alt={token.name}
                        />
                    </Box>
                    <Box marginLeft={10}>
                        <Heading size='md'>{props.selected === "ERC20" ? token.name : token.title}</Heading>

                        {props.selected === "ERC20" ? 
                            <Box  display="flex" flexDirection="column">
                                <Text marginTop={8} fontSize='2xl'as='b'>{`${token.balance} ${token.symbol !== null ? token.symbol : ''}`}</Text>
                            </Box>
                            : ''
                        }
                    </Box>
                </Box>
            ))}
            
        </>
    );
}