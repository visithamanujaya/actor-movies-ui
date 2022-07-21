import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import store from './app/store'
import { Provider } from 'react-redux';
import CreateActor from "./components/CreateActor";
import CreateMovie from "./components/CreateMovie";
import ActorDetails from "./components/ActorDetails";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<App />} />
                  <Route path="actor" element={<ActorDetails/>} />
                  <Route path="add-actor" element={<CreateActor />} />
                  <Route path="add-movie" element={<CreateMovie />} />
              </Routes>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
