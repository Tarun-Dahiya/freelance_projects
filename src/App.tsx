import { useEffect } from "react"
import KTComponent from './metronic/core/index.ts';
// import KTLayout from './metronic/app/layouts/demo1.js';

import Navbar from './components/Navbar'
import { Outlet } from "react-router";


export default function App() {
  useEffect(() => {
    KTComponent.init()
    // KTLayout.init()
    document.title = 'Metronic Starter'
  }, [])

  return (
    <div className="flex flex-col h-screen w-screen">
      <Navbar />
      <Outlet />
    </div>
  )
}


