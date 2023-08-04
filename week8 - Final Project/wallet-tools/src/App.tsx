import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Receive from './pages/Receive';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Receive />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
