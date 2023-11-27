import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import Home from './pages/Home';
import Receive from './pages/Receive';
import Send from './pages/Send';
import Save from './pages/Save';
import History from './pages/History';
import Disperse from './pages/Disperse';
import Explorer from './pages/Explorer';

import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/receive' element={<Receive />} />
          <Route path='/send' element={<Send />} />
          <Route path='/save' element={<Save />} />
          <Route path='/history' element={<History />} />
          <Route path='/disperse' element={<Disperse />} />
          <Route path='/explorer' element={<Explorer />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
