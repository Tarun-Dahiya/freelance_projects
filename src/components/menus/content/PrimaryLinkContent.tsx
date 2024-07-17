import MenuFrame from "../MenuFrame";

const PrimaryLinkContent = ({title}:{title:string}) => {
    return (
        <MenuFrame>
            <div className="bg-gray-100 menu menu-default flex flex-col border rounded-lg w-full max-w-56 py-2" data-menu="true">
                <div className="menu-item">
                    <a className="menu-link" href="#">
                        <span className="menu-icon">
                            <i className="ki-outline ki-badge">
                            </i>
                        </span>
                        <span className="menu-title">
                          {title}
                        </span>
                    </a>
                </div>
                <div className="menu-item" data-menu-item-toggle="accordion" data-menu-item-trigger="click">
                    <a className="menu-link" href="#">
                        <span className="menu-icon">
                            <i className="ki-outline ki-profile-circle">
                            </i>
                        </span>
                        <span className="menu-title">
                            Submenu 1
                        </span>
                        <span className="menu-arrow">
                            <i className="ki-outline ki-down menu-item-show:hidden">
                            </i>
                            <i className="ki-outline ki-up hidden menu-item-show:block">
                            </i>
                        </span>
                    </a>
                    <div className="menu-accordion">
                        <div className="menu-item">
                            <a className="menu-link" href="#">
                                <span className="menu-icon">
                                    <i className="ki-outline ki-badge">
                                    </i>
                                </span>
                                <span className="menu-title">
                                    Submenu item 1
                                </span>
                            </a>
                        </div>
                        <div className="menu-item">
                            <a className="menu-link" href="#">
                                <span className="menu-icon">
                                    <i className="ki-outline ki-badge">
                                    </i>
                                </span>
                                <span className="menu-title">
                                    Submenu item 2
                                </span>
                            </a>
                        </div>
                        <div className="menu-item">
                            <a className="menu-link" href="#">
                                <span className="menu-icon">
                                    <i className="ki-outline ki-badge">
                                    </i>
                                </span>
                                <span className="menu-title">
                                    Submenu item 3
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="menu-item">
                    <a className="menu-link" href="#">
                        <span className="menu-icon">
                            <i className="ki-outline ki-setting-2">
                            </i>
                        </span>
                        <span className="menu-title">
                            Menu item 2
                        </span>
                    </a>
                </div>
                <div className="menu-item" data-menu-item-toggle="accordion" data-menu-item-trigger="click">
                    <a className="menu-link" href="#">
                        <span className="menu-icon">
                            <i className="ki-outline ki-message-programming">
                            </i>
                        </span>
                        <span className="menu-title">
                            Submenu 2
                        </span>
                        <span className="menu-arrow">
                            <i className="ki-outline ki-down menu-item-show:hidden">
                            </i>
                            <i className="ki-outline ki-up hidden menu-item-show:block">
                            </i>
                        </span>
                    </a>
                    <div className="menu-accordion">
                        <div className="menu-item">
                            <a className="menu-link" href="#">
                                <span className="menu-icon">
                                    <i className="ki-outline ki-badge">
                                    </i>
                                </span>
                                <span className="menu-title">
                                    Submenu item 1
                                </span>
                            </a>
                        </div>
                        <div className="menu-item">
                            <a className="menu-link" href="#">
                                <span className="menu-icon">
                                    <i className="ki-outline ki-badge">
                                    </i>
                                </span>
                                <span className="menu-title">
                                    Submenu item 2
                                </span>
                            </a>
                        </div>
                        <div className="menu-item">
                            <a className="menu-link" href="#">
                                <span className="menu-icon">
                                    <i className="ki-outline ki-badge">
                                    </i>
                                </span>
                                <span className="menu-title">
                                    Submenu item 3
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </MenuFrame>
    )
}

export default PrimaryLinkContent;