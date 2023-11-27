import { Text } from '@chakra-ui/react';

interface Header {
  value: string;
}

export default function Header(props: Header) {
  return (
    <>
      <Text as='h1' fontSize='4xl'>
        {props.value}
      </Text>
    </>
  );
}
