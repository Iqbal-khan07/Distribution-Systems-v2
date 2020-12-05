import React, {createContext, useCallback, useState} from "react";
import HomeIcon from "@material-ui/icons/Home";
import StoreIcon from '@material-ui/icons/Store';
import ListAltIcon from '@material-ui/icons/ListAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import StorageIcon from '@material-ui/icons/Storage';
import {ORDER_FULFILLER, ORDER_TAKER, SUPER_USER} from "../constants/ROLES";


export const UserContext = createContext();

const makeLinks = (role) => {
    return function () {
        return {
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
                "text": role === SUPER_USER ? 'Inventory Manager': 'Inventory',
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
    }
}


const access = {
    [SUPER_USER]: [0, 1, 2, 3, 4],
    [ORDER_TAKER]: [0, 1, 2, 3],
    [ORDER_FULFILLER]: [0, 1, 2, 3]
}

const getLinksBasedOnUserType = (userType) => {
    const accessList = access[userType];
    const linkOptions = makeLinks(userType);
    const links = []
    for(let i=0; i<accessList.length; i++){
        links.push(linkOptions()[accessList[i]])
    }
    return links;
}


// {
//         id: 1,
//         email: undefined,
//         name: 'Zoraiz',
//         role: ORDER_FULFILLER,
//         imageUrl: undefined,
//         links: getLinksBasedOnUserType(ORDER_FULFILLER)
//     }


const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(undefined)

    const login = useCallback((id, image_url, fullName, sys_user_role) => {
        saveUserToLocalStorage(id, image_url, fullName, sys_user_role)
        setUser({
            id: id,
            email: undefined,
            name: fullName,
            role: sys_user_role,
            imageUrl: image_url,
            links: getLinksBasedOnUserType(sys_user_role)
        })
    }, [])

    const logout = useCallback(() => {
        resetUser()
        cleanUserFromLocalStorage()
    }, [])

    const resetUser = () => {
        setUser(undefined)
    }

    const saveUserToLocalStorage = useCallback((id, image_url, fullName, sys_user_role) => {
        localStorage.setItem('user', JSON.stringify({
            id: id,
            name: fullName,
            role: sys_user_role,
            imageUrl: image_url,
        }));
    },[])

    const getUserFromLocalStorage = () => {
        return JSON.parse(localStorage.getItem('user'));
    }

    const cleanUserFromLocalStorage = () => {
        localStorage.removeItem('user');
    }

    return (
        <UserContext.Provider value={{
            user, login, logout, getUserFromLocalStorage
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider