import { useEffect } from "react"
import KTComponent from './metronic/core/index.ts';
import KTLayout from './metronic/app/layouts/demo1.js';


export default function App() {

  useEffect(() => {
    KTComponent.init()
    KTLayout.init()
  },[])

  return (
    <>
    <div className="h-16 bg-blue-800 min-w-[100vw] text-white flex items-center justify-center">
      <h1 className="text-2xl font-bold">Hello, World!</h1>
    </div>
    <div className="h-screen flex flex-col items-center justify-center bg-gray-200">
      <h1 className="text-2xl font-bold">Hello, World!</h1>
      <p className="text-lg">Welcome to your new React app.</p>
    </div>
    </>
  )
}


