import { ReactNode } from "react";

type MenuFrameProps = {
    children: ReactNode,
    title: string | ReactNode,
    offset?: string
    maxWidth?: string
}

const MenuFrame = ({ children, title, offset = '0px 0px', maxWidth='max-w-56' }: MenuFrameProps) => {
    return (
        <div 
        className="dropdown" 
        data-dropdown="true" 
        data-dropdown-trigger="click" 
        data-dropdown-offset={offset}
        >
            {typeof title === 'string' ? (
                <button className="dropdown-toggle btn btn-icon-xs">
                    <span className="font-sans text-md">{title}</span>
                    <i className="ki-outline ki-down dropdown-open:hidden">
                    </i>
                    <i className="ki-outline ki-up hidden dropdown-open:block">
                    </i>
                </button>
            ) : (
                <span className="dropdown-toggle">{title}</span>
            )}
    <div className={`dropdown-content w-full bg-gray-100 ${maxWidth} menuFrame`} style={{position: 'absolute', transform: 'translateZ(0)'}}>
        {children}
    </div>
        </div >
    )
}

export default MenuFrame;