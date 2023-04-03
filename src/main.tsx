import './index.css'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
// https://www.freecodecamp.org/news/git-reverting-to-previous-commit-how-to-revert-to-last-commit/
