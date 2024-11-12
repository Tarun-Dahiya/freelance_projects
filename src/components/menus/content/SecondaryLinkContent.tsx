import { Link } from "react-router-dom"
import MenuFrame from "../MenuFrame"

const SecondaryLinkContent = ({title, offset}:{title:string, offset?:string}) => {
    return (
        <MenuFrame offset={offset} title={title}>
            <div className="bg-gray-100 menu menu-default flex flex-col border rounded-lg w-full max-w-56 py-2" data-menu="true">
                <div className="menu-item">
                    <Link to='/addEvent'>
                        <a className="menu-link" href="#">
                            <span className="menu-icon">
                                <i className="ki-outline ki-setting-4"></i>
                            </span>
                            <span className="menu-title">
                                Add Event
                            </span>
                        </a>
                    </Link>
                </div>
                <div className="menu-item">
                    <Link to='/editAsset'>
                        <a className="menu-link" href="#">
                            <span className="menu-icon">
                                <i className="ki-outline ki-users"></i>
                            </span>
                            <span className="menu-title">
                                Edit Asset
                            </span>
                        </a>
                    </Link>
                </div>
            </div>
        </MenuFrame>
    )
}

export default SecondaryLinkContent;