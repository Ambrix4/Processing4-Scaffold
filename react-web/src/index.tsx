import React from 'react';
import ReactDOM from 'react-dom/client';
import Background from './component/Background/Background';
import NavBar from './component/NavBar/NavBar';
import reportWebVitals from './reportWebVitals';
import "./index.css"


const Agp = function () {
  return (
    <div style={{overflow:'hidden'}}>
      <React.StrictMode >
        <NavBar />
        <Background />
      </React.StrictMode>
    </div>
  )
}
// const view = Agp('pywebview')
const element = document.getElementById('root')
const root = ReactDOM.createRoot(element as HTMLElement);
root.render(<Agp />);

reportWebVitals();
