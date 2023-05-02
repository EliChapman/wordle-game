import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
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
