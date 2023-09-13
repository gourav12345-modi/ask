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
import { useDispatch, useSelector } from 'react-redux';
import { SET_TOKEN } from './constants';
import NavbarWithSearch from './components/Navbar';
import CreateQuestion from './pages/CreateQuestion';
import { getQuestions } from './actions/question.actions';

function App() {

  const dispatch = useDispatch()

  const { token } = useSelector((state) => state.userData)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token)
      dispatch({ type: SET_TOKEN, payload: token })
  }, [])

  useEffect(() => {
      dispatch(getQuestions())
  }, [token])

  return (
    <div className="App">
      <Router>
        <NavbarWithSearch />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateQuestion />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
