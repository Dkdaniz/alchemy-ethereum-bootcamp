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
        let newTokenFilter = []
        if(props.selected === "ERC20"){
            newTokenFilter = props.tokens.filter(token => token.type === props.selected);
        }else{
            if(props.removeSpams === true){
                newTokenFilter = props.tokens.filter(token => token.type === props.selected && token.isSpam === false);
            }else{
                newTokenFilter = props.tokens.filter(token => token.type === props.selected && token.isSpam === true);
            }
        }
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

                        {props.selected !== "ERC20" ? 
                            <Box  display="flex" flexDirection="column">
                                <Text marginTop={2} fontSize='sm' textColor="#5A5252">{`${token.description}`}</Text> 
                                {props.selected === "ERC1155" ? <Text marginTop={2} fontSize='3xl'as='b'>{`${token.balance}`}</Text> : ''} 
                            </Box>
                            : ''
                        }
                    </Box>
                </Box>
            ))}
            
        </>
    );
}