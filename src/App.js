import React, {useEffect, useState} from 'react'

import { Navbar } from "./Components/Navbar";

import "./App.css";
import Loader from "./Components/Loader/Loader";

function App() {

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() =>{
      const DataFetch = () =>{
          setTimeout(() =>{
              setIsLoading(false)
          }, 4000)
      }

      DataFetch()
  }, [])

  return isLoading ? (<Loader/>) : (<h1>Este es el club europeo</h1>)
}

export default App;
