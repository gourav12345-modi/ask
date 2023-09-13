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
import NavbarWithSearch from './components/Navbar';
import CreateQuestion from './pages/CreateQuestion';
import { getQuestions } from './actions/question.actions';
import EditQuestion from './pages/EditQuestion';
import ViewQuestion from './pages/ViewQuestion';
import SearchQuestion from './pages/SearchQuestion'

function App() {

  return (
    <div className="App">
      <Router>
        <NavbarWithSearch />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateQuestion />} />
          <Route path="/edit" element={<EditQuestion />} />
          <Route path="/view" element={<ViewQuestion />} />
          <Route path="/search" element={<SearchQuestion />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
