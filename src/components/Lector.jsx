 
 import {useEffect,     useState } from 'react';
 import { 
          FingerprintReader, 
          SampleFormat, 
          SamplesAcquired
             
         } from '@digitalpersona/devices';
   

 function Lector() {
    const [ListaFingerPrint, setListaFingerPrint] = useState(null);
    const [InfoFingerprintReader, setInfoFingerprintReader] = useState(null);
    const [Fp, setFp] = useState([])
    const [currentImageFinger, setCurrentImageFinger] = useState([]);
    const [reader] = useState(new FingerprintReader());
    
    useEffect(() => {
      const handleSamplesAcquired = (event) => {
        console.log("In the event: SamplesAcquired");
        console.log(event);
        setFp(event.samples); // Actualiza el estado con las muestras de huellas adquiridas
      };
  
      // Suscripción al evento SamplesAcquired cuando se monta el componente
      reader.on(SamplesAcquired, handleSamplesAcquired);
  
      // Efecto de limpieza: desuscribirse del evento cuando se desmonta el componente
      return () => {
        reader.off(SamplesAcquired, handleSamplesAcquired);
      };
    }, [reader]);
   
    //revisar si una huella fue detectada 

   
   const fn_ListarDispositivos = () => {
     reader.enumerateDevices()
       .then(devices => {
         setListaFingerPrint(devices);
        fn_DeviceInfo()
       })
       .catch(error => {
         console.log(error);
       });
   }
 
   const fn_DeviceInfo = () => {
     reader.enumerateDevices()
       .then(devices => {
         const dispositivos = devices;
         const infoFingerprintReader = JSON.stringify(dispositivos[0]).replace(/[[\]"]/g, '');
         setInfoFingerprintReader(infoFingerprintReader);
         console.log(InfoFingerprintReader);
         console.log(typeof(InfoFingerprintReader));
       })
       .catch(error => {
         console.log(error);
       });
   }
 
   const fn_startCapture = () => {
    if (InfoFingerprintReader) {
      reader.startAcquisition(SampleFormat.PngImage, InfoFingerprintReader)
        .then(response => {
          console.log("Starting capture");
          console.log(response);
          fn_verCapturados();
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      console.log("No hay información del lector de huellas");
    }
  }
 
 
   const fn_stopCapture = () => {
   
     if (ListaFingerPrint) {
       reader.stopAcquisition(ListaFingerPrint)
         .then(response => {
           console.log("Stopping capture");
           console.log(response);
         })
         .catch(error => {
           console.log(error);
         });
     } else {
       console.log("No hay dispositivos detectados");
     }
   }

   const fn_verCapturados=()=>{
    
      console.log("Estado",Fp)
   }

   const fn_CaptureImage = () => {
  
     console.log("Do you see this?", ListaFingerPrint.samples);
     let base64 = ListaFingerPrint.samples[0];
 
     if (base64) {
       base64 = base64.replace(/_/g, '/');
       base64 = base64.replace(/-/g, '+');
     } else {
       console.log("Fingerprint not captured");
     }
 
     setCurrentImageFinger(base64);
     console.log("Captured image");
     console.log(currentImageFinger);
   }
  return (
    <div>
      <div>
        <button onClick={fn_ListarDispositivos}>Lista FP</button>
      
      </div>
      <div>
        <button onClick={fn_startCapture}>Iniciando Dispositivo</button>
        <button onClick={fn_stopCapture}>Deteniendo Dispositivo</button>
      </div>
      <div>
        <button onClick={fn_CaptureImage}>Capturar</button>
      </div>
      <div>
        <p>Imagen Base</p>
        {currentImageFinger && (
            <img src={`data:image/png;base64,${currentImageFinger}`} alt="Fingerprint" />
          )}
      </div>
    </div>
  );
}

export default Lector;
