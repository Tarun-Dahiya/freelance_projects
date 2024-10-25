import { useState, useEffect, ReactNode } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSquarePollVertical, faSliders, faSquareQuestion, faSunCloud, faMoonCloud, faCircleChevronDown, faSquareEllipsis } from "@fortawesome/pro-duotone-svg-icons";
import { faGlobe } from '@fortawesome/pro-regular-svg-icons'
import { getDrawer } from "./drawers/drawerInfo"; // update drawerInfo to add additional drawers
import { getUser } from "../lib/actions";
import ThemeSelector from "./menus/content/ThemeSelector";
import PrimaryLinkContent from "./menus/content/PrimaryLinkContent";
import SecondaryLinkContent from "./menus/content/SecondaryLinkContent";
import UserGuide from "./drawers/content/UserGuide";
import AppSwitcher from "./drawers/content/AppSwitcher";
import Settings from "./drawers/content/Settings";
import MobileNavigation from "./drawers/content/MobileNavigation";

import UserSettings from "./drawers/content/UserSettings";

const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(localStorage.getItem('theme') === 'dark')
    const [themeIcon, setThemeIcon] = useState<ReactNode | null>(null)
    const [avatar, setAvatar] = useState<string>("/webservices/metronic9/media/avatars/blank.png")
    const menuOffset: string = "0px, 20px"
    const iconMenuOffset: string = "0px, 25px"
    const isDevelopment = window.location.href.split('/').slice(0, 3).join('/').includes('development')
    const bgColor = isDevelopment ? 'bg-red-700' : 'bg-blue-800'

    const handleThemeChange = (value: string) => {
        value === 'dark' ? localStorage.setItem('theme', 'light') : localStorage.setItem('theme', 'dark')
        if (value === 'dark') {
            setIsDarkMode(true)
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else if (value === 'light') {
            setIsDarkMode(false)
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        } else if (value === 'system') {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                setIsDarkMode(true)
                document.documentElement.classList.add('dark')
                localStorage.setItem('theme', 'dark')
            } else {
                setIsDarkMode(false)
                document.documentElement.classList.remove('dark')
                localStorage.setItem('theme', 'light')
            }
        }
    }

    useEffect(() => {
        isDarkMode
            ? setThemeIcon(<FontAwesomeIcon icon={faMoonCloud} size='lg' />)
            : setThemeIcon(<FontAwesomeIcon icon={faSunCloud} size='lg' />)
    }, [isDarkMode])


    useEffect(() => {
        const updateAvatar = async () => {
            const user = await getUser();
            if (user.AVATAR) {
                setAvatar(user.AVATAR);
            }
        };
        updateAvatar();
    }, []);


    return (
        <>
            {/* navbar */}
            <nav className={`h-16 ${bgColor} text-white pe-4 border-slate-300 border-b-2 dark:border-slate-800`}>
                <div className="w-full flex items-center justify-between">
                    <div className="hidden md:flex ">
                        {/* left-side navigations */}
                        <ul className="flex h-16 border-slate-300 dark:border-slate-800 border-b-2">
                            <li
                                data-drawer-toggle={getDrawer('App Switcher')!.drawerToggle}
                                className="bg-gray-300 text-gray-700 flex items-center hover:text-gray-900 cursor-pointer px-4"
                            >
                                <FontAwesomeIcon icon={faCircleChevronDown} size='xl' />
                            </li>
                            <li className="bg-white text-black flex items-center ps-5 pe-9 cursor-pointer hover:text-blue-400">
                                <Link to='/'>
                                    <FontAwesomeIcon icon={faGlobe} size='xl' className='text-sky-500 pe-2' />
                                    <span>App Name</span>
                                </Link>
                            </li>
                            <li className="text-white flex items-center ps-4 cursor-pointer hover:text-blue-300 ">
                                <PrimaryLinkContent title={'Menu-1'} offset={menuOffset} />
                            </li>
                            <li className="text-white flex items-center cursor-pointer hover:text-blue-300 ">
                                <SecondaryLinkContent title={'Menu-2'} offset={menuOffset} />
                            </li>
                        </ul>
                    </div>
                    <div className="flex ps-5">
                        {/* right-side navigations */}
                        <ul className="h-16 flex gap-4">
                            {isDevelopment && (
                                <li aria-label="devBadge" className="flex items-center ">
                                    <span className="badge badge-outline badge-warning text-xs px-2 py-1">Development</span>
                                </li>
                            )}
                            <li aria-label="search" className="flex items-center hover:text-blue-300 cursor-pointer">
                                <Link to='/savedSearch'><FontAwesomeIcon icon={faSearch} size='lg' /></Link>
                            </li>
                            <li aria-label="reports" className="flex items-center hover:text-blue-300 cursor-pointer">
                                <Link to='/reports'><FontAwesomeIcon icon={faSquarePollVertical} size='lg' /></Link>
                            </li>
                            <li
                                data-drawer-toggle={getDrawer('Settings')!.drawerToggle}
                                aria-label="settings"
                                className="flex items-center hover:text-blue-300 cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faSliders} size='lg' />
                            </li>
                            <li
                                data-drawer-toggle={getDrawer('User Guide')!.drawerToggle}
                                aria-label="help"
                                className="flex items-center hover:text-blue-300 cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faSquareQuestion} size='lg' />
                            </li>
                            <li
                                aria-label="theme"
                                className="flex items-center hover:text-blue-300 cursor-pointer"
                            >
                                <ThemeSelector title={themeIcon} offset={iconMenuOffset} handleThemeChange={handleThemeChange} maxWidth={'max-w-48'} />
                            </li>
                            <li
                                data-drawer-toggle={getDrawer('User Settings')!.drawerToggle}
                                aria-label="userSettings"
                                className="flex items-center hover:text-blue-300 cursor-pointer"
                            >
                                <img src={avatar} alt="profile" className="h-10 w-10 rounded-lg" />
                            </li>
                            <li
                                data-drawer-toggle={getDrawer('Mobile Navigation')!.drawerToggle}
                                className="flex items-center hover:text-blue-300 cursor-pointer md:hidden"
                            >
                                <FontAwesomeIcon icon={faSquareEllipsis} size='2x' className='text-white' />
                            </li>
                        </ul>

                    </div>
                </div>
            </nav >
            {/* Drawers */}
            <AppSwitcher drawerId={getDrawer('App Switcher')!.id} />
            <Settings drawerId={getDrawer('Settings')!.id} />
            <MobileNavigation drawerId={getDrawer('Mobile Navigation')!.id} />
            <UserGuide drawerId={getDrawer('User Guide')!.id} />
            <UserSettings drawerId={getDrawer('User Settings')!.id}  setAvatar={setAvatar}/>
            
        </>
    )
}

export default Navbar
