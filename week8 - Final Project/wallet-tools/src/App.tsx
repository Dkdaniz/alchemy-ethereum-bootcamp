import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import Receive from './pages/Receive';
import Send from './pages/Send';
import Save from './pages/Save';
import History from './pages/History';
import Disperse from './pages/Disperse';

import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Receive />} />
          <Route path='/receive' element={<Receive />} />
          <Route path='/send' element={<Send />} />
          <Route path='/save' element={<Save />} />
          <Route path='/history' element={<History />} />
          <Route path='/disperse' element={<Disperse />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
