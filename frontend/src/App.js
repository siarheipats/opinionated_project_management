import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages and components
import Home from './pages/Home'
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/signup'
              element={<Signup />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
