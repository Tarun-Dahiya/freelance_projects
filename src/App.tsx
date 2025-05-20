import { useEffect, useState } from "react"
import KTComponent from './metronic/core/index.ts';
import Navbar from './components/Navbar'
import { Outlet } from "react-router";
import { User } from "./lib/types.ts";
import AppContext from "./components/AppContext.tsx";
import { useAxios } from "./lib/hooks.ts";
import { withAuthenticator } from '@aws-amplify/ui-react';

function App() {
  const [user, setUser] = useState<User>(new User())

  const baseURL = document.URL.split('/').slice(0, 3).join('/')

  const { request: getUser, data } = useAxios<User[]>('/metronic9/api/common.cfc?method=getUser', false)

  useEffect(() => {
    if (!baseURL.includes('localhost')) {
      getUser()
    }
    KTComponent.init()
    document.title = 'Asset Scheduling'
  }, [])

  useEffect(() => {
    if (data) {
      setUser(data[0])
      sessionStorage.setItem('user', JSON.stringify(data[0]))
      const internal = data[0].USERLOCALE.toLowerCase() === 'internal'
      if (!internal) { window.location.href = `${baseURL}/auth/login` }
      localStorage.removeItem('datatable_1')
    }
  }, [data])

  return (
    <AppContext.Provider value={
      {
        userData: user
      }
    }>
      <div className="flex flex-col min-h-screen w-screen bg-gray-300 text-gray-950 dark:text-gray-50">
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

export default withAuthenticator(App)


