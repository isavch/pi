import React from 'react';
import { render } from 'react-dom';
import App from './app'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import persistState from 'redux-localstorage'
import thunk from 'redux-thunk';
import reducers from './ducks'

const initState = {
    user: {},
    temperature: {},
    motion: null,
    photo: {
        buffer: [],
        isStarted: false,
        blob: ''
    }
};
const enhancer = composeWithDevTools(
    applyMiddleware(thunk),
    persistState()
);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
        console.log('SW registered: ', registration);
        }).catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
        });
    });
}

render(
    <Provider store={createStore(reducers, initState, enhancer)}>
        <App />
    </Provider>, 
    document.querySelector('#app')
);