import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Budgeted from "./Budgeted";
import { api } from "../utils/api";

function App() {
  const [wage, setWage] = useState({});

  const getWage = async () => {
    try {
        const response = await api.getWage();
        setWage(response);
    } catch(error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getWage();
  },[]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Budgeted wage={wage}/>}/>
      </Routes>
    </div>
  )
}

export default App;
