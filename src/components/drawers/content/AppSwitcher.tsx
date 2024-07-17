import DrawerFrame from "../DrawerFrame"

const AppSwitcher = ({drawerId}:{drawerId:string}) => {
    return (
        <DrawerFrame title={'App Switcher'} drawerId={drawerId} direction="drawer-start">
            <p>[content goes here for app switcher]</p>
        </DrawerFrame>
    )
}
export default AppSwitcher;
