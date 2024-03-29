import React from 'react'
import ReactDOM from 'react-dom'
import Topbar from "./components/topbar/Topbar";
import Single from "./pages/single/Single";
import Home from "./pages/home/Home"
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Search from "./pages/search/Search";
import DeleteAcc from './pages/delete/DeleteAcc';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const {user} = useContext(Context);
  return (
    <Router>
    <Topbar/>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/register" element={user ? <Home/> : <Register/>}/>
    <Route path="/login" element={user ? <Home/> : <Login/>}/>
    <Route path="/write" element={user ? <Write/> : <Register/>}/>
    <Route path="/settings" element={user ? <Settings/> : <Register/> }/>
    <Route path="/post/:postId" element={<Single/>}/>
    <Route path="/about" element={<About/>}/>
    <Route path="/contact" element={<Contact/>} />
    <Route path="/search" element={<Search/>} />
    <Route path="/deleteAcc" element={user ? <DeleteAcc/> : <Register/>} />

    </Routes>
    </Router>
    
  );
}

export default App;
