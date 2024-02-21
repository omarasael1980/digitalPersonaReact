 

import  { useState } from 'react';
 
//import Lector from './components/Lector'
import Pb2 from './components/Pb2';
import './App.css'
import axios from 'axios';


function App() {
  const [texto, setTexto] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.get('http://10.3.200.219:83/WCF_HUELLAS_PRUEBAS/Service1.svc', {
        params: {
          texto: texto
        }
      });
      setRespuesta(response.data);  
      console.log(respuesta)
    } catch (error) {
      console.error('Error al llamar al servicio:', error);
      
    }
  };
  return (
    <>
    <h1>Leyendo Huella</h1>
  
    <Pb2/>
    
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Introduce el texto"
        />
        <button type="submit">Enviar</button>
      </form>
      {respuesta && <div>Respuesta del servicio: {respuesta}</div>}
    </div>
    </>
  )
}

export default App
