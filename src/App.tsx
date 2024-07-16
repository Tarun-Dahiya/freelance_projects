import { useEffect } from "react"
import KTComponent from './metronic/core/index.ts';
import KTLayout from './metronic/app/layouts/demo1.js';


export default function App() {

  useEffect(() => {
    KTComponent.init()
    KTLayout.init()
  }, [])

  return (
    <div className="flex flex-col h-screen w-screen">
      {/* navbar */}
      <nav className="h-16 bg-blue-800 text-white pe-4 sticky top-0 border-slate-300 border-b-2"> 
        <div className="w-full flex items-center justify-between">
          <div className="hidden md:flex ">
            <ul className="flex h-16 border-slate-300 border-b-2">
              <li className="bg-white flex items-center px-5"> 🖼️ </li>
              <li className="bg-white text-black flex items-center px-5">App Name</li>
              <li className="bg-green-700 text-white flex items-center px-5">Menu-1</li>
              <li className="bg-sky-300 text-black flex items-center px-5">Menu-2</li>
            </ul>
          </div>
          <div className="flex">
            <ul className="h-16 flex gap-2">
              <li className="flex items-center">🔎</li>
              <li className="flex items-center">📈</li>
              <li className="flex items-center">⚙️</li>
              <li className="flex items-center">❓</li>
              <li className="flex items-center">💡</li>
              <li className="flex items-center">💇‍♂️</li>
            </ul>
          </div>
        </div>
      </nav>
      {/* home page */}
      <div className="h-screen flex flex-col items-center bg-gray-300">
        <div className="bg-white rounded-md my-5 w-[97%] p-5 shadow-md">
          <form>
            <h1>search form:</h1>
            <input className="p-1 rounded-sm m-2" type="text" placeholder="search" />
            <button className="btn-primary px-4 py-1 rounded-md">🔍</button>
          </form>
        </div>
        <div className="bg-white rounded-md my-5 w-[97%] p-5 shadow-md">
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>email</th>
                <th>phone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>john doe</td>
                <td>jdoe@google.com</td>
                <td>123-456-7890</td>
              </tr>
              <tr>
                <td>john doe</td>
                <td>jdoe@google.com</td>
                <td>123-456-7890</td>
              </tr>
              <tr>
                <td>john doe</td>
                <td>jdoe@google.com</td>
                <td>123-456-7890</td>
              </tr>
              <tr>
                <td>john doe</td>
                <td>jdoe@google.com</td>
                <td>123-456-7890</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}


