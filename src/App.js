import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Loader from './Components/Loader/Loader';
import Home from './pages/Home/Home'
import About from './pages/Nostoros/Nosotros'
import News from './pages/Noticias/Noticias'
import Asociate from './pages/Asociate/Asociate'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Footer from './Components/Footer/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const DataFetch = () => {
      setTimeout(() => {
        setIsLoading(false);
      }, 4000);
    };

    DataFetch();
  }, []);

  return (
    <Router>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About/>} />
            <Route path="/news" element={<News/>}/>
            <Route path="/asociate" element={<Asociate/>}/>
          </Routes>
          <Footer/>
        </>
      )}
    </Router>
  );
}

export default App;
