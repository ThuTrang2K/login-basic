import React, { createContext, useContext } from 'react';
import AuthStore from '../store/AuthStore';

const AuthContext = createContext();

function AuthProvider(props){
    const authStore = new AuthStore();
    const user =JSON.parse( window.localStorage.getItem("user"));
    const value={authStore,user}
    return <AuthContext.Provider {...props} value={value}></AuthContext.Provider>
}
export {AuthContext,AuthProvider}

