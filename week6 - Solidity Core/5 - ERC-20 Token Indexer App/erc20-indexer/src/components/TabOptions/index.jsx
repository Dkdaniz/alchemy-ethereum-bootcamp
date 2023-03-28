import { Container, Button, Text, Box } from '@chakra-ui/react'
import { useEffect } from 'react';

export default function TabOptions(props) {

    return (
        <>
            <Box bg="#FFFFFF" w='100%' p={6} borderRadius={24} marginTop={42}>
                <Box >
                    <Text as='b' fontSize='lg'>Tokens</Text>
                </Box>
                <Box >
                    {props.tokens && props.tokens.map(
                        token => (<Button 
                            key={token.name} 
                            size='sm' 
                            bg={"black"} 
                            textColor="white" 
                            variant={props.selected === token.name ? 'solid': 'ghost'} marginTop={2} marginRight={2}
                            onClick={token.callback}>{token.name}
                        </Button>))
                    }
                </Box>
            </Box>
        </>
    );
}