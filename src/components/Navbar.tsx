import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSquarePollVertical, faSliders, faSquareQuestion, faSunCloud, faMoonCloud, faCircleChevronDown, faSquareEllipsis } from "@fortawesome/pro-duotone-svg-icons";
import { faGlobe, faChevronDown } from '@fortawesome/pro-regular-svg-icons'
import AppSwitcher from "./drawers/content/AppSwitcher";
import Settings from "./drawers/content/Settings";
import MobileNavigation from "./drawers/content/MobileNavigation";
import { getDrawer } from "./drawers/drawerInfo"; // update drawerInfo to add additional drawers
import ThemeSelector from "./menus/content/ThemeSelector";
import PrimaryLinkContent from "./menus/content/PrimaryLinkContent";
import SecondaryLinkContent from "./menus/content/SecondaryLinkContent";

const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

    const toggleTheme = () => {
        localStorage.getItem('theme') === 'dark' ? localStorage.setItem('theme', 'light') : localStorage.setItem('theme', 'dark')
        if (localStorage.getItem('theme') === 'dark') {
            setIsDarkMode(true)
            document.documentElement.classList.add('dark')
        } else {
            setIsDarkMode(false)
            document.documentElement.classList.remove('dark')
        }
    }

    useEffect(() => {
        toggleTheme()
    }, [])

    return (
        <>
            {/* navbar */}
            <nav className="h-16 bg-blue-800 text-white pe-4 sticky top-0 border-slate-300 border-b-2 dark:border-slate-800">
                <div className="w-full flex items-center justify-between">
                    <div className="hidden md:flex ">
                        <ul className="flex h-16 border-slate-300 dark:border-slate-800 border-b-2">
                            <li
                                data-drawer-toggle={getDrawer('App Switcher')!.drawerToggle}
                                className="bg-gray-300 text-gray-700 flex items-center hover:text-gray-900 cursor-pointer px-4"
                            >
                                <FontAwesomeIcon icon={faCircleChevronDown} size='xl' />
                            </li>
                            <li className="bg-white text-black flex items-center ps-5 pe-9 cursor-pointer hover:text-blue-400">
                                <FontAwesomeIcon icon={faGlobe} size='xl' className='text-sky-500 pe-2' />
                                <span>App Name</span>
                            </li>
                            <li className="text-white flex items-center px-5 cursor-pointer">
                                <PrimaryLinkContent title={'Menu-1'}/>
                            </li>
                            <li className="text-white flex items-center cursor-pointer hover:text-sky-200">
                                <SecondaryLinkContent title={'Menu-2'}/>
                            </li>
                        </ul>
                    </div>
                    <div className="flex ps-5">
                        <ul className="h-16 flex gap-4">

                            <li aria-label="search" className="flex items-center hover:text-blue-300 cursor-pointer">
                                <Link to='/'><FontAwesomeIcon icon={faSearch} size='lg' /></Link>
                            </li>

                            <li aria-label="reports" className="flex items-center hover:text-blue-300 cursor-pointer"><FontAwesomeIcon icon={faSquarePollVertical} size='lg' /></li>
                            <li
                                data-drawer-toggle={getDrawer('Settings')!.drawerToggle}
                                aria-label="settings"
                                className="flex items-center hover:text-blue-300 cursor-pointer"
                            >
                                <FontAwesomeIcon icon={faSliders} size='lg' />
                            </li>
                            <li aria-label="help" className="flex items-center hover:text-blue-300 cursor-pointer"><FontAwesomeIcon icon={faSquareQuestion} size='lg' /></li>
                            <li aria-label="theme" onClick={toggleTheme} className="flex items-center hover:text-blue-300 cursor-pointer">
                                {(!isDarkMode)
                                    ? <FontAwesomeIcon icon={faSunCloud} size='lg' />
                                    : <FontAwesomeIcon icon={faMoonCloud} size='lg' />
                                }
                                <ThemeSelector />
                            </li>
                            <li className="flex items-center hover:text-blue-300 cursor-pointer">
                                <img src="/media/avatars/300-1.png" alt="profile" className="h-10 w-10 rounded-lg" />
                            </li>
                            <li className="flex items-center hover:text-blue-300 cursor-pointer md:hidden">
                                <FontAwesomeIcon icon={faSquareEllipsis} size='2x' className='text-white' />
                            </li>
                        </ul>

                    </div>
                </div>
            </nav >
            {/* Drawers */}
            <AppSwitcher drawerId={getDrawer('App Switcher')!.id} />
            <Settings drawerId={getDrawer('Settings')!.id} />
            <MobileNavigation drawerId={getDrawer('Settings')!.id} />
        </>
    )
}

export default Navbar
