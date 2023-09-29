import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Receive from './pages/Receive';
import Save from './pages/Save';
import Disperse from './pages/Disperse';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Receive />} />
          <Route path='/receive' element={<Receive />} />
          <Route path='/save' element={<Save />} />
          <Route path='/disperse' element={<Disperse />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
