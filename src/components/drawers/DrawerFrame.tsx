import { ReactNode } from 'react';

const DrawerFrame = ({children, title, drawerId, direction = 'drawer-end'}:{children:ReactNode, title:string, drawerId:string, direction?: string}) => {
    return (
        <div className={`drawer drawer-start flex flex-col max-w-[90%] w-[300px] bg-gray-300 text-gray-950 dark:text-gray-50 ${direction}`} data-drawer="true" id={drawerId}>
        <div className="flex items-center justify-between p-5 border-b">
            <h3 className="text-base font-semibold text-gray-900">
                {title}
            </h3>
            <button className="btn btn-xs btn-icon btn-light" data-drawer-dismiss="true">
                <i className="ki-outline ki-cross">
                </i>
            </button>
        </div>
        <div className="p-5">
            {children}
        </div>
    </div>
    )
}

export default DrawerFrame;