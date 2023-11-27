import '@fontsource/encode-sans-expanded/300.css';
import '@fontsource/encode-sans-expanded/400.css';
import '@fontsource/encode-sans-expanded/500.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { ChakraProvider } from '@chakra-ui/react';

import theme from './theme/index';

import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
