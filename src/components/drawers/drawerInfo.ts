type Drawer = {
    id: string,
    name: string,
    drawerToggle: string
}

const appDrawers: Drawer[] = [
    { id: 'drawer_1', name: 'App Switcher', drawerToggle: '#drawer_1' },
    { id: 'drawer_2', name: 'Settings', drawerToggle: '#drawer_2' },
    { id: 'drawer_3', name: 'Mobile Navigation', drawerToggle: '#drawer_3' },
    { id: 'drawer_4', name: 'User Guide', drawerToggle: '#drawer_4' },
    { id: 'drawer_5', name: 'User Settings', drawerToggle: '#drawer_5' }
]

export const getDrawer = (name: string) => {
    return appDrawers.find((drawer: Drawer) => drawer.name === name);
}