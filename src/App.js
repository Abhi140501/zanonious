import './App.css';
import Main from './components/Main';
import Starting from './components/Starting';
import Dashboard from './components/Dashboard';
import Password from './components/Password';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
      <Route exact path='/' element={<Starting />} />
      <Route path='/home' element={<Main />} />
      <Route path='/2fa' element={<Main page="2fa"/>} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path="/password" element={<Password />} />
    </Routes>
    </Router>
  );
}

export default App;
