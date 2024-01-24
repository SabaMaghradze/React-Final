import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistedStore, store } from './redux';
import { PersistGate } from 'redux-persist/integration/react';
import './assets/locales/i18n';
import { Footer } from './components/footer';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <Provider store={store} >
            <PersistGate persistor={persistedStore}>
                <App />
                <Footer/>
            </PersistGate>
        </Provider>
    </BrowserRouter>
);

