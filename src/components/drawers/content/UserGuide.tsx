import DrawerFrame from '../DrawerFrame';


const UserGuide = ({drawerId}:{drawerId:string}) => {
    return (
        <DrawerFrame title={'AppName User Guide'} drawerId={drawerId}>
        <p>[insert user guide / documentation here]</p>
        </DrawerFrame>
    );
    }
    export default UserGuide;