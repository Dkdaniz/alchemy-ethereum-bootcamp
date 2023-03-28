import { Text } from '@chakra-ui/react'

export default function Header(props) {
    return (
        <>
            <Text as='h1' fontSize='4xl' marginTop={50}>{props.value}</Text>
        </>
    );
}