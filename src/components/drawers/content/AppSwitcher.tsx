import { useState, useEffect } from "react";
import DrawerFrame from "../DrawerFrame"
import { getWebApps, AppList } from "../../../lib/actions"


const AppSwitcher = ({ drawerId }: { drawerId: string }) => {
    const [webApps, setWebApps] = useState<AppList[]>([])
    const [filteredApps, setFilteredApps] = useState<AppList[]>([])
    const BASEURL = window.location.href.split('/').slice(0, 3).join('/')

    const filterWebApps = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchStr = e.target.value.toLowerCase();
        const filtered = webApps.filter(app => app.APPLICATIONNAME.toLowerCase().includes(searchStr))
        return searchStr === '' ? setFilteredApps(webApps) : setFilteredApps(filtered)
    }

    const appsList = filteredApps.map(app => {
        const link: string = app.APPLICATIONURL.includes('http') ? app.APPLICATIONURL : `${BASEURL}${app.APPLICATIONURL}`
        const img: string = app.APPLICATIONIMAGE.includes('http') ? app.APPLICATIONIMAGE : `${BASEURL}${app.APPLICATIONIMAGE}`
        return (
            <li key={app.APPID} className="flex gap-2 items-center hover:bg-slate-300 hover:dark:bg-slate-600 p-2 rounded-md">
                <img src={img} alt={app.APPLICATIONNAME} className="w-12 h-12 rounded-md" />
                <a href={link} className="cursor:pointer">{app.APPLICATIONNAME}</a>
            </li>)
    })


    useEffect(() => {
        const fetchWebApps = async () => {
            const apps = await getWebApps();
            setWebApps(apps)
            setFilteredApps(apps)
        }
        fetchWebApps();
    }, [])

    return (
        <DrawerFrame title={'App Switcher'} drawerId={drawerId} direction="drawer-start" width={'450px'}>
            <input onChange={filterWebApps} className="input" type="text" placeholder="Search" />
            <div className="scrollable-y">
                <ul className="flex flex-col mt-4 overflow-y-auto">
                    {appsList}
                </ul>
            </div>
        </DrawerFrame>
    )
}
export default AppSwitcher;
