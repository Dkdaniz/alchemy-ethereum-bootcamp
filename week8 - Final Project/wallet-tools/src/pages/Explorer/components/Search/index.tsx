import { InputRightElement, InputGroup, Input } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface Search {
  value: string;
  onkeydown: any;
  onchange: any;
}

export default function Search(props: Search) {
  return (
    <>
      <InputGroup size='lg'>
        <Input
          onKeyDown={(e) => props.onkeydown(e)}
          onChange={(e) => props.onchange(e)}
          placeholder='Search'
          borderRadius={24}
          marginTop={10}
          background={'#FFFFFF'}
          borderColor={'transparent'}
          value={props.value}
        />
        <InputRightElement children={<SearchIcon />} marginTop={10} />
      </InputGroup>
    </>
  );
}
