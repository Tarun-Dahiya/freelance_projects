import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import StartPage from './components/startPage/StartPage.tsx';
import NotFoundPage from './components/notFoundPage/NotFoundPage.tsx';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <NotFoundPage />,
      children: [
        {
          index: true,
          element: <StartPage />,
        },
      ],
    },
  ],
  {
    basename: "/",
  }
);

ReactDOM.createRoot(document.getElementById('app')!).render(
  
  <React.StrictMode>
    <RouterProvider router={router}  />
  </React.StrictMode>,
);