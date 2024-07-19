import { ReactNode } from "react";
import MenuFrame from "../MenuFrame";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSunCloud, faMoonCloud, faLaptopMobile } from '@fortawesome/pro-duotone-svg-icons';

const ThemeSelector = ({ title, offset, handleThemeChange, maxWidth = 'max-w-56' }: { title: string | ReactNode, offset?: string, handleThemeChange: (value: string) => void, maxWidth?: string }) => {
    return (
        <MenuFrame title={title} offset={offset} maxWidth={maxWidth}>
            <div className={`menu menu-default flex flex-col border rounded-lg w-full ${maxWidth} py-2`} data-menu="true">
                <div className="menu-item">
                    <a className="menu-link" href="#" onClick={() => handleThemeChange('light')}>
                        <span className="menu-icon">
                            <FontAwesomeIcon icon={faSunCloud} className="text-yellow-500 dark:text-yellow-100" size='lg' />
                        </span>
                        <span className="menu-title">
                            Light Mode!
                        </span>
                    </a>
                </div>

                <div className="menu-item">
                    <a className="menu-link" href="#" onClick={() => handleThemeChange('dark')} >
                        <span className="menu-icon">
                            <FontAwesomeIcon icon={faMoonCloud} className='text-purple-800 dark:text-purple-100' size='lg' />
                        </span>
                        <span className="menu-title">
                            Dark Mode
                        </span>
                    </a>
                </div>
                <div className="menu-item" data-menu-item-toggle="accordion" data-menu-item-trigger="click">
                    <a className="menu-link" href="#" onClick={() => handleThemeChange('system')}>
                        <span className="menu-icon">
                            <FontAwesomeIcon icon={faLaptopMobile} className='text-blue-800 dark:text-blue-100' size='lg' />
                        </span>
                        <span className="menu-title">
                            System
                        </span>
                    </a>

                </div>
            </div>
        </MenuFrame>
    )
}

export default ThemeSelector;