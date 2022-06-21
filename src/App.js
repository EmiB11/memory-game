import { BrowserRouter,Routes, Route } from 'react-router-dom';
import Home from './components/home'
import GameStart from './components/GameStart';
import './App.css';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/game' element= {<GameStart />} /> 
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
