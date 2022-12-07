import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './presentation/pages/Home/Home';
import Meditation from './presentation/pages/Meditation/Meditation';

function App() {
  return (
    <div className="App">
      <BrowserRouter basename='/ai-meditation'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/meditate' element={<Meditation/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
