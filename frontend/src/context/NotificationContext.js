import React, {createContext, useState} from "react";
export const NotificationContext = createContext();

const NotificationContextProvider = ({children}) => {
    const [notification, setNotification] = useState(undefined)

    const setANotification = (message, type) => {
        setNotification({
            message: message,
            type: type
        })
    }

    const clearNotification = () => {
        setNotification(undefined)
    }

    return (
        <NotificationContext.Provider value={{notification, setANotification, clearNotification}}>
            {children}
        </NotificationContext.Provider>
    )
}

export default NotificationContextProvider