import {BrowserRouter, Routes, Route} from 'react-router-dom'

// Pages and components
import Home from './pages/home'
import Signup from './pages/signup';
import Dashboard from './pages/dashboard'
import Settings from './pages/settings';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route
              path = '/'
              element={<Home/>}
            />
            <Route
              path = '/signup'
              element={<Signup/>}
            />
            <Route
              path = '/dashboard'
              element={<Dashboard/>}
            />
            <Route
              path = '/settings'
              element={<Settings/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
