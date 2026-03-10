import { useState, useEffect } from 'react'
import apiClient from './api/axios';
function App() {

  const [message, setMessage] = useState("Invonit");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await apiClient(`/`);
        setMessage(res.data.message);    
       }catch(error) {
        setMessage("error");
        console.log(error);
       }
    }
    fetchMessage();
  }, []);

  return (
    <>
      <h1 className='text-sky-500 text-3xl font-bold '>{message}</h1>
    </>
  )
}

export default App
