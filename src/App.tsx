import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import NotFound from './pages/Notfound';
import Alert from './components/Alert';
import CU, { TYPECU } from './pages/CU';
// import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div className="containers">
      <Alert />
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/create' element={<CU type={TYPECU.CREATE}/>}/>
        <Route path='/edit/:id' element={<CU type={TYPECU.EDIT}/>}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </div>
  );
}

export default App;
