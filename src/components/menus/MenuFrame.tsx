import { ReactNode } from "react";

const MenuFrame = ({ children } : { children: ReactNode }) => {
    return (
        <div className="dropdown" data-dropdown="true" data-dropdown-trigger="click" data-dropdown-offset="-10px, 15px">
            <button className="dropdown-toggle btn btn-icon-xs">
                {/* if we have an icon we should show that here instead of the title */}
                <span className="font-sans text-md">Menu-1</span> {/* should pass title as prop */}
                <i className="ki-outline ki-down dropdown-open:hidden">
                </i>
                <i className="ki-outline ki-up hidden dropdown-open:block">
                </i>
            </button>
            <div className="dropdown-content w-full max-w-56">
                {children}
            </div>
        </div>
    )
}

export default MenuFrame;