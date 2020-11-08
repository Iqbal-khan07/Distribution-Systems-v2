import React, {createContext, useState} from "react";

export const UserContext = createContext();

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState({
        email: undefined,
        name: undefined,
        role: undefined,
        imageUrl: undefined,
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