import { Switch, Button, Text, Box } from '@chakra-ui/react';

interface Token {
  name: string;
  callback: any;
}

interface TapOptions {
  tokens: Token[];
  selected: string;
  onchangeChecked: any;
  isChecked: boolean;
}

export default function TabOptions(props: TapOptions) {
  const isSelected = (selected: string, name: string) => {
    return selected === name;
  };

  return (
    <>
      <Box bg='#FFFFFF' w='100%' p={6} borderRadius={24} marginTop={42}>
        <Box>
          <Text as='b' fontSize='lg'>
            Tokens
          </Text>
        </Box>
        <Box
          display='flex'
          flexDirection='row'
          justifyContent={'space-between'}
        >
          <Box>
            {props.tokens &&
              props.tokens.map((token: Token) => (
                <Button
                  key={token.name}
                  size='sm'
                  bg={
                    isSelected(props.selected, token.name) ? 'black' : '#FFFFFF'
                  }
                  textColor={
                    isSelected(props.selected, token.name) ? 'white' : '#5E5D66'
                  }
                  variant='outline'
                  marginTop={2}
                  marginRight={2}
                  onClick={token.callback}
                >
                  {token.name}
                </Button>
              ))}
          </Box>

          <Box display='flex' flexDirection='row'>
            <Text marginTop={3} marginRight={2} fontSize='sm'>
              Remove Spams
            </Text>
            <Switch
              marginTop={3}
              colorScheme='teal'
              id='isChecked'
              onChange={props.onchangeChecked}
              isChecked={props.isChecked}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
