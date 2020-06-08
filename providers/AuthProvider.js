import React, { useContext, useState } from 'react'

import Realm from 'realm'
import { getRealmApp } from '../getRealmApp'

const app = getRealmApp()

const AuthContext = React.createContext(null)


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)


    const logIn = async (email, password) => {
        const creds = Realm.Credentials.emailPassword(email, password)
        const newUser = await app.logIn(creds)
        setUser(newUser)
    }

    const logOut = () => {
        if (user == null) {
            return
        }
        user.logOut()
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                logIn,
                logOut,
                user,
            }}>
            {children}
        </AuthContext.Provider>
    )
}


const useAuth = () => {
    const auth = useContext(AuthContext)
    if (auth == null) {
        throw new Error('useAuth() called outside of a AuthProvider?')
    }
    return auth
}

export { AuthProvider, useAuth }
