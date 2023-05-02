import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import WordleHeader from './Components/WordleHeader/WordleHeader';
import Game from './Components/Game/Game';
import Leaderboard from './Components/Leaderboard/Leaderboard';

const router = createBrowserRouter([
  {
    path: "/",
    element: <div id="App"><WordleHeader /> <Game /></div>,
  },
  {
    path: "/leaderboard",
    element:  <div id="App"><WordleHeader /> <Leaderboard /></div>,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
