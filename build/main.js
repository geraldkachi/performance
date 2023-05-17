import { jsx as _jsx } from "react/jsx-runtime";
import './index.css';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(BrowserRouter, { children: _jsx(App, {}) }) }));
