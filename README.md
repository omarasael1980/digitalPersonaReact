React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

@vitejs/plugin-react uses Babel for Fast Refresh
@vitejs/plugin-react-swc uses SWC for Fast Refresh
The connection logic is implemented in Pb2.jsx. Visually, only buttons are displayed that call each part of the process. It's designed for understanding how to implement it later. It requires importing WebSdk in index.html. Check the configuration in tsconfig.json.

==========================HOW TO INSTALL ========================

Download or clone
npm install
npm run dev || It will pop up an error in node_modules/@digitalpersona/devices/dist/es5/devices/websdk/channel.js:3:7: You must enter that path and comment the WebSdk import on line 3.
npm run dev
+++++++++++++++++ WHAT YOU WILL FIND +++++++++++++++++++++++++++++

In the browser console, you will observe what each button does. Keep in mind that the intention is to understand the WebSdk process. First, the devices are listed, then the first device in the array is displayed ("usually, you have one connected"), then the device is initiated for reading. At this point, it starts listening if the reader detects fingerprints and logs each read. Capture converts the fingerprint's base64 into an image, and finally, the device is stopped. Obviously, in a real system, these processes are hidden, but it's necessary to see the function of each one. If you want to improve something, go ahead. Contributions are welcome.

+++++++++++++++ Clarification +++++++++++++++++++++++++++++++++++++

The WebSdk has 4 ways to obtain the fingerprint; check the documentation.
There might be a simpler way to do it; honestly, I didn't find one.
Here, only fingerprint reading using @digitalpersona/devices is implemented. I understand that enrollment, comparison, and other functions are included in other libraries; check the official documentation: https://github.com/topics/digitalpersona
