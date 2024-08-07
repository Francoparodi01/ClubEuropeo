import React, { useEffect, useState } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Loader from './Components/Loader/Loader';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import HeroSection from './Components/HeroSection/HeroSection';

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
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Navbar />
          <HeroSection />
        </>
      )}
    </>
  );
}

export default App;
