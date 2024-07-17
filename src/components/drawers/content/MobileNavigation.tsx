import DrawerFrame from "../DrawerFrame"

const AppSwitcher = ({drawerId}:{drawerId:string}) => {
    return (
        <DrawerFrame title={'Links'} drawerId={drawerId}>
            <p>[content goes here for mobile navigation]</p>
        </DrawerFrame>
    )
}
export default AppSwitcher;
