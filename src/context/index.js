import React, { createContext, useContext } from 'react';
import AuthStore from '../store/AuthStore';
import EventStore from '../store/EventStore';
import GeneralNotifStore from '../store/GeneralNotifStore';
import WorkSchedulesStore from '../store/WorkSchedulesStore';

const AuthContext = createContext();

function AuthProvider(props){
    const authStore = new AuthStore();
    const workSchedulesStore = new WorkSchedulesStore();
    const eventStore = new EventStore()
    const generalNotifStore = new GeneralNotifStore()
    const value={authStore, workSchedulesStore,eventStore,generalNotifStore}
    return <AuthContext.Provider {...props} value={value}></AuthContext.Provider>
}
export {AuthContext,AuthProvider}

