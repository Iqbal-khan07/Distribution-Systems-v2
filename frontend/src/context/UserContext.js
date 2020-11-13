import React, {createContext, useState} from "react";
import HomeIcon from "@material-ui/icons/Home";
import StoreIcon from '@material-ui/icons/Store';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import StorageIcon from '@material-ui/icons/Storage';

export const UserContext = createContext();

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState({
        email: undefined,
        name: "Zoraiz Naeem",
        role: undefined,
        imageUrl: undefined,
        links: [
        {
            "icon": <HomeIcon style={{fontSize: 30}} />,
            "text": 'Dashboard',
            "to": '/dashboard'
        }, {
            "icon": <StoreIcon style={{fontSize: 30}} />,
            "text": 'Shop Tracker',
            "to": '/shoptracker'
        }, {
            "icon": <ListAltIcon style={{fontSize: 30}} />,
            "text": 'Orders',
            "to": '/orders'
        },{
            "icon": <StorageIcon style={{fontSize: 30}} />,
            "text": 'Inventory Manager',
            "to": '/inventory'
        }, {
            "icon": <PeopleAltIcon style={{fontSize: 30}} />,
            "text": 'Employers',
            "to": '/employers'
        }, {
            "icon": <SettingsIcon style={{fontSize: 30}} />,
            "text": 'Settings',
            "to": '/settings'
        }

    ]

    })

    const setName = (name) => {
        setUser({name: name, ...user})
    }

    const setDisplayId = (displayId) => {
        setUser({displayId: displayId, ...user})
    }

    const setImageUrl = (imageUrl) => {
        setUser({imageUrl: imageUrl, ...user})
    }

    const setUserEmail = (email) => {
        setUser({email: email, ...user})
    }

    const setUserObject = (user) => {
        setUser(user)
    }

    return (
        <UserContext.Provider value={{user, setName, setDisplayId, setImageUrl, setUserObject, setUserEmail}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider