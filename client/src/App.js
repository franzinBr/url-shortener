import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import User from './pages/User'
import Home from "./pages/Home";
import Redirect from "./services/Redirect";
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { refresh } from './store/slices/auth';
import NavPerfil from './components/NavPerfil';



function App() {
  
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch();




  React.useEffect(() => {
    let expiresIn;
    let timeout;

    async function refreshToken()
    {
      const refreshed = await dispatch(refresh())
      if(refreshed.success) 
      {
        expiresIn = (refreshed.exp * 1000) - new Date().getTime()
        clearTimeout(timeout)
        timeout = setTimeout(refreshToken, expiresIn)
        return
      }
  
    }
    refreshToken()

    
    return () => clearTimeout(timeout)
  }, [dispatch, auth.logged])


  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <main className="AppMain">
        <NavPerfil />
        <Routes>
          <Route path="/" element={ <Home />}/>
          <Route path="/user/*" element={ <User />}/>
          <Route path="*" element={ <Redirect />}/>
        </Routes>
      </main>
      <Footer />
      </BrowserRouter>
     
    </div>
  );
}

export default App;
