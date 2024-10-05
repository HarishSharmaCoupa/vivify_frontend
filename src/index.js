import React from "react";
import  ReactDOM  from "react-dom";
import {BrowserRouter as Router} from 'react-router-dom'
import {createRoot} from 'react-dom/client'

import App from './App'
import './index.css'


const domNode = document.getElementById('root')
const root = createRoot(domNode);

root.render( 
    <Router>
        <App />
    </Router>)