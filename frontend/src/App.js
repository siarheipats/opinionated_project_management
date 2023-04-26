import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

// Pages and components
import Home from './pages/Home'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Landing from './pages/Landing';

function App() {
  const { user } = useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route
              path='/'
              element={user ? <Home /> : <Navigate to="/landing" />}
            />
            <Route
              path='/signup'
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path='/login'
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path='/landing'
              element={!user ? <Landing /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
