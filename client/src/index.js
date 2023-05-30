import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.js'
import { BrowserRouter as Router } from "react-router-dom";
import LoginPage from './LoginPage';
import App from './App';
const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Router>
    <Canvas className='canva'
    style={{ height: '450px' }}
        camera={ {
            fov: 45,
            near: 0.1,
            far: 2000,
            position: [ -3, 1.5, 4 ]
        } }
    >
        <Experience />
    </Canvas>
    <App/>
    </Router>
)