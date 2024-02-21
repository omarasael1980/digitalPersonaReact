import { Component } from 'react';
import {
  FingerprintReader,
  SampleFormat
 
} from "@digitalpersona/devices";

import { BrowserRouter as Router } from 'react-router-dom';

class Pb2 extends Component {
    constructor(props) {
      super(props);
      this.state = {
        title: 'demo-fingerprint-reader',
        ListaFingerPrint: [],
        InfoFingerprintReader: null,
        ListaSamplesFingerPrints: null,
        currentImageFinger: null,
        reader: new FingerprintReader()
      };
    }

  componentDidMount() {
    const { reader } = this.state;
    // Asociar eventos con métodos
    reader.on("DeviceConnected", this.onDeviceConnected);
    reader.on("DeviceDisconnected", this.onDeviceDisconnected);
    reader.on("SamplesAcquired", this.onSamplesAcquired);
    reader.on("AcquisitionStarted", this.onAcquisitionStarted);
    reader.on("AcquisitionStopped", this.onAcquisitionStopped);
  }

  componentWillUnmount() {
    const { reader } = this.state;
    // Eliminar asociación de eventos
    reader.off("DeviceConnected", this.onDeviceConnected);
    reader.off("DeviceDisconnected", this.onDeviceDisconnected);
    reader.off("SamplesAcquired", this.onSamplesAcquired);
    reader.off("AcquisitionStarted", this.onAcquisitionStarted);
    reader.off("AcquisitionStopped", this.onAcquisitionStopped);
  }

  // Handlers de eventos
  onDeviceConnected = (ev) => {
    console.log("Connected ", ev);
  };

  onDeviceDisconnected = (ev) => {
    console.log("Disconnected ",ev);
  };

  onSamplesAcquired = (ev) => {
    console.log("In the event: SamplesAcquired");
    console.log(ev);
    this.setState({ ListaSamplesFingerPrints: ev });
  };

  onAcquisitionStarted = (ev) => {
    console.log("In the event: AcquisitionStarted ");
    console.log(ev);
  };

  onAcquisitionStopped = (ev) => {
    console.log("In the event: AcquisitionStopped ");
    console.log(ev);
  };

  // Métodos para interactuar con el lector de huellas
  fn_ListarDispositivos = () => {
    const { reader } = this.state;
    reader.enumerateDevices()
      .then(devices => this.setState({ ListaFingerPrint: devices }))
      .catch(error => console.log(error));
  };

  fn_DeviceInfo = () => {
    const { ListaFingerPrint } = this.state;
    const dispositivo = ListaFingerPrint[0];
    if (dispositivo) {
      const InfoFingerprintReader = JSON.stringify(dispositivo).replace(/[[\]"]/g, '');
      console.log( InfoFingerprintReader);
      this.setState({ InfoFingerprintReader });
    }
  };

  fn_startCapture = () => {
    const { reader, InfoFingerprintReader } = this.state;
    //reader.startAcquisition(SampleFormat.PngImage, InfoFingerprintReader) regresa base64
    reader.startAcquisition(SampleFormat.PngImage, InfoFingerprintReader)
    
      .then(response => {
        console.log("Starting capture");
        console.log(response);
      })
      .catch(error => console.log(error));
  };

  fn_stopCapture = () => {
    const { reader, ListaFingerPrint } = this.state;
    reader.stopAcquisition(ListaFingerPrint[0])
      .then(response => {
        console.log("Stopping capture");
        console.log(response);
      })
      .catch(error => console.log(error));
  };




  fn_CaptureImage = () => {
    const { ListaSamplesFingerPrints } = this.state;

    if (ListaSamplesFingerPrints && ListaSamplesFingerPrints.samples.length > 0) {
      let base64 = ListaSamplesFingerPrints.samples[0]; //para png
     //let base64 = ListaSamplesFingerPrints.samples[0].Data;
      console.log("VER ", ListaSamplesFingerPrints.samples[0]);
      //console.log("TIPO  ", typeof(base64))
      base64 = base64.replace(/_/g, '/');
      base64 = base64.replace(/-/g, '+');
      console.log("Base limpiada  ",base64);
      this.setState({ currentImageFinger: base64 });
      console.log("Captured image");
    } else {
      console.log("Fingerprint not captured");
    }
  };

  render() {
    
    const { title, currentImageFinger } = this.state;
    return (
      <Router>
        <div className="app">
          <h1>{title}</h1>
          <button onClick={this.fn_ListarDispositivos}>Listar Dispositivos</button>
          <button onClick={this.fn_DeviceInfo}>Info Dispositivo</button>
          <button onClick={this.fn_startCapture}>Iniciar Captura</button>
          <button onClick={this.fn_stopCapture}>Detener Captura</button>
          <button onClick={this.fn_CaptureImage}>Capturar Imagen</button>
          
        </div>
        <div>
       
            {/* Imprimir la huella si existe captura */}
            {currentImageFinger && (
                <img src={`data:image/png;base64,${currentImageFinger}`} alt="Huella dactilar" />
          )}
        </div>
      </Router>
    );
  }
}

export default Pb2;
