import DrawerFrame from "../DrawerFrame"

const AppSwitcher = ({drawerId}:{drawerId:string}) => {
    return (
        <DrawerFrame title={'Settings'} drawerId={drawerId}>
            <p>[content goes here for settings page]</p>
        </DrawerFrame>
    )
}
export default AppSwitcher;
