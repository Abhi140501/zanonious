import './App.css';
import Main from './components/Main';
import Starting from './components/Starting';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <Routes>
      <Route exact path='/' element={<Starting />} />
      <Route path='/home' element={<Main />} />
    </Routes>
    </Router>
  );
}

export default App;
