import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { legacy_createStore as createStore } from 'redux';
import reducer from './Redux/rootReducer.js';

const store = createStore(reducer);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </Provider >
)
