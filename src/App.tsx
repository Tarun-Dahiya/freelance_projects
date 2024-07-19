import { useEffect } from "react"
import KTComponent from './metronic/core/index.ts';


import Navbar from './components/Navbar'
import { Outlet } from "react-router";


export default function App() {
  useEffect(() => {
    KTComponent.init()
    document.title = 'Metronic Starter'
  }, [])

  return (
    <div className="flex flex-col h-screen w-screen bg-gray-300 text-gray-950 dark:text-gray-50">
      <Navbar />
    <div className="h-screen flex flex-col">
        <div className='m-2 md:mx-4'>
        <Outlet />
        </div>
    </div>
    </div>
  )
}


