import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { useDispatch } from 'react-redux';
import { SET_TOKEN } from './constants';
import NavbarWithSearch from './components/Navbar';

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
      const token = localStorage.getItem("token")
      if(token)
      dispatch({ type: SET_TOKEN, payload: token })
  }, [])

  return (
    <div className="App">
     <Router>
    <NavbarWithSearch />
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
     </Router>
    </div>
  );
}

export default App;
