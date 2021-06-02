import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Header from "./components/Header";
import Footer from "./components/Footer";
import User from './pages/User'
import Home from "./pages/Home";
import Redirect from "./services/Redirect";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header />
      <main className="AppMain">
        <Routes>
          <Route path="/" element={ <Home />}/>
          <Route path="/user" element={ <User />}/>
          <Route path="*" element={ <Redirect />}/>
        </Routes>
      </main>
      <Footer />
      </BrowserRouter>
     
    </div>
  );
}

export default App;
