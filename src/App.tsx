import { useEffect, useState } from "react"
import KTComponent from './metronic/core/index.ts';
import Navbar from './components/Navbar'
import { Outlet } from "react-router";
import { User } from "./lib/types.ts";
import AppContext from "./components/AppContext.tsx";
import axios from "axios";

export default function App() {
  const [user, setUser] = useState<User>(new User())

  let authToken = ''
  if (localStorage.getItem('token')) {
    authToken = localStorage.getItem('token')!
  }
  const baseURL = document.URL.split('/').slice(0, 3).join('/')

  useEffect(() => {
    // get user details; if user cannot be retrieved or does not meet qualifications, redirect to login screen.
    const getUser = async () => {
      try {
        const response = await axios.get(`${baseURL}/Webservices/admin2/api/common.cfc?method=getUser`)
        setUser(response.data[0])
        const internal = response.data[0].USERLOCALE.toLowerCase() === 'internal'
        if (!internal) { window.location.href = `${baseURL}/Webservices/auth/login` }
        localStorage.removeItem('datatable_1')
      } catch (err) {
        console.log(err)
        window.location.href = `${baseURL}/Webservices/auth/login`
      }
    }
    if (!baseURL.includes('localhost')) {
      getUser()
    }
  }, [])

  useEffect(() => {
    KTComponent.init()
    document.title = 'Metronic Starter'
  }, [])

  return (
    <AppContext.Provider value={
      {
        apiData: {
          baseURL,
          authToken
        },
        userData: user,
      }
    }>
      <div className="flex flex-col h-screen w-screen bg-gray-300 text-gray-950 dark:text-gray-50">
        <Navbar />
        <div className="h-screen flex flex-col">
          <div className='m-2 md:mx-4'>
            <Outlet />
          </div>
        </div>
      </div>
    </AppContext.Provider>
  )
}


