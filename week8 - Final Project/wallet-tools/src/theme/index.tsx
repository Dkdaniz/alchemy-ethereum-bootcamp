import { extendTheme } from '@chakra-ui/react';

const Theme = extendTheme({
  colors: {
    white: '#fdf3f3',
    black: '#323336',
    blue: '#0038FF',
  },
  fonts: {
    heading: `'Encode Sans Expanded', sans-serif`,
    body: `'Encode Sans Expanded', sans-serif`,
  },
});

export default Theme;
