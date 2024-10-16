import './App.css';
import AdminPanel from './components/AdminPanel';
import ChatBot from './components/ChatBot';
import Login from './components/Login';
import Register from './components/Register';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SavedChats from './components/SavedChats';
import Chat from './components/Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/chat" element={<ChatBot />}></Route>
        <Route exact path="/admin" element={<AdminPanel />}></Route>
        <Route exact path="/savedChats" element={<SavedChats />}></Route>
        <Route path="/fullchat" element={<Chat />}></Route>
        {/* nested routing */}
      </Routes>
    </Router>
  );
}

export default App;
