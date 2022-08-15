import React, { createContext, useContext } from 'react';
import AuthStore from '../store/AuthStore';

const AuthContext = createContext();

function AuthProvider(props){
    const authStore = new AuthStore();
    const value={authStore}
    return <AuthContext.Provider {...props} value={value}></AuthContext.Provider>
}
export {AuthContext,AuthProvider}

