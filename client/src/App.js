import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './components/dashboard';
import MessageTracing from './components/messageTracing';
import Login from './components/login/Login';


function App() {
  return (
    <div className="App">
       <BrowserRouter>
        <Routes>

          <Route  exact path='/' element={<Login />}></Route>
          <Route   path='/login' element={<Login />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/messageTracing' element={<MessageTracing />}></Route>         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
