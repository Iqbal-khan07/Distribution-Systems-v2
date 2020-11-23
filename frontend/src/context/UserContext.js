import React, {createContext, useState} from "react";
import HomeIcon from "@material-ui/icons/Home";
import StoreIcon from '@material-ui/icons/Store';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import StorageIcon from '@material-ui/icons/Storage';
import {ORDER_TAKER, ORDER_FULFILLER, SUPER_USER} from "../constants/ROLES";

export const UserContext = createContext();

const LINKS = {
    0: {
        "icon": <HomeIcon style={{fontSize: 30}} />,
        "text": 'Dashboard',
        "to": '/dashboard'
    },
    1: {
        "icon": <StoreIcon style={{fontSize: 30}} />,
        "text": 'Shop Tracker',
        "to": '/shoptracker'
    },
    2: {
        "icon": <ListAltIcon style={{fontSize: 30}} />,
        "text": 'Orders',
        "to": '/orders'
    },
    3: {
        "icon": <StorageIcon style={{fontSize: 30}} />,
        "text": 'Inventory Manager',
        "to": '/inventory'
    },
    4: {
        "icon": <PeopleAltIcon style={{fontSize: 30}} />,
        "text": 'Employers',
        "to": '/employers'
    },
    5: {
        "icon": <SettingsIcon style={{fontSize: 30}} />,
        "text": 'Settings',
        "to": '/settings'
    }
}

const access = {
    [SUPER_USER]: [0, 1, 2, 3, 4, 5],
    [ORDER_TAKER]: [0, 1, 2, 5],
    [ORDER_FULFILLER]: [0, 1, 2, 5]
}

const getLinksBasedOnUserType = (userType) => {
    const accessList = access[userType];
    const links = []
    for(let i=0; i<accessList.length; i++){
        links.push(LINKS[accessList[i]])
    }
    return links;
}

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState({
        id: undefined,
        email: undefined,
        name: undefined,
        role: undefined,
        imageUrl: undefined,
        links: []
    })

    const setName = (name) => {
        setUser((u) => {
            const prev = {...u}
            prev['name'] = name
            return prev
        })
    }

    const resetUser = () => {
        setUser((u) => {
            return {
                id: undefined,
                email: undefined,
                name: undefined,
                role: undefined,
                imageUrl: undefined,
                links: []
            }
        })

    }

    const setId = (id) => {
        setUser((u) => {
            const prev = {...u}
            prev['id'] = id
            return prev
        })
    }

    const setImageUrl = (imageUrl) => {
        setUser((u) => {
            const prev = {...u}
            prev['imageUrl'] = imageUrl
            return prev
        })
    }

    const setUserEmail = (email) => {
        setUser((u) => {
            const prev = {...u}
            prev['email'] = email
            return prev
        })
    }

    const setRole = (role) => {
        setUser((u) => {
            const prev = {...u}
            prev['role'] = role
            prev['links'] = getLinksBasedOnUserType(role)
            return prev
        })
    }


    return (
        <UserContext.Provider value={{user, setName, setImageUrl, setRole, setUserEmail, setId, resetUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider