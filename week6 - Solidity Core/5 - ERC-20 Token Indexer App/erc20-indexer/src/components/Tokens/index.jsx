import {
  Card,
  Image,
  Stack,
  CardBody,
  Heading,
  Text,
} from '@chakra-ui/react';

export default function Tokens(props) {
    return (
        <>
            {props.tokens && props.tokens.map(token => (
                <Card
                    direction={{ base: 'column', sm: 'row' }}
                    overflow='hidden'
                    variant='outline'
                    >
                    <Image
                        objectFit='cover'
                        maxW={{ base: '100%', sm: '200px' }}
                        src={token.icon}
                        alt={token.name}
                    />

                    <Stack>
                        <CardBody>
                            <Heading size='md'>{token.name}</Heading>
                            {token.type === "ERC20"? <Text fontSize='3xl'as='b'>{token.balance}</Text> : <Text fontSize='3xl'as='b'>{token.balance}</Text> }
                        </CardBody>
                    </Stack>
                </Card>
            ))}
            
        </>
    );
}