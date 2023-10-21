import React from 'react';
// import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from './App';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import './pagin.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';

/* -----------bo sung thay doi------------ */
import { store } from './_store';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
// setup fake backend
import { fakeBackend } from './_helpers';
fakeBackend();
const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
/*-----------code cu------- */

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );
// reportWebVitals();
/*-----------code cu------- */