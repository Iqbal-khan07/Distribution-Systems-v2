import React, {createContext, useState} from "react";
import HomeIcon from "@material-ui/icons/Home";

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
            "to": '/shoptracker'
        },
        {
            "icon": <HomeIcon style={{fontSize: 30}} />,
            "text": 'Dashboard',
            "to": '/shoptracke'
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